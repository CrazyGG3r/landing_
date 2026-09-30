import { useEffect, useLayoutEffect, useRef } from "react";
import { interestDrive, interestMode, interestRailMetrics } from "./interestMotion";
import "./interestsMotion.css";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function InterestsMotion({ host, items, expanded, reduced, active, onActive }) {
  const field = useRef(null);
  const itemNodes = useRef([]);
  const resetTimer = useRef(0);
  const visitedImages = useRef(new Set());

  useLayoutEffect(() => {
    const panel = host.current;
    const layer = field.current;
    if (!panel || !layer) return;
    let mode = "wide";
    let rail = interestRailMetrics(panel.clientHeight, items.length);
    let offset = 0;
    let drive = 0;
    let frame = 0;
    let previous = 0;
    let pointer = null;

    const resetMagnetism = () => {
      for (const node of itemNodes.current) {
        if (!node) continue;
        node.style.setProperty("--magnet-x", "0px");
        node.style.setProperty("--magnet-y", "0px");
        node.style.setProperty("--magnet", "0");
      }
    };
    const setMagnetism = () => {
      if (!pointer || reduced) return;
      // Read every position before writing styles so a pointer move cannot
      // trigger a layout pass for each icon.
      const positions = itemNodes.current.map((node) => {
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const strength = clamp(1 - distance / 115, 0, 1);
        return { x: dx * strength * .055, y: dy * strength * .055, strength };
      });
      positions.forEach((position, index) => {
        if (!position) return;
        const node = itemNodes.current[index];
        node.style.setProperty("--magnet-x", `${position.x.toFixed(2)}px`);
        node.style.setProperty("--magnet-y", `${position.y.toFixed(2)}px`);
        node.style.setProperty("--magnet", position.strength.toFixed(3));
      });
    };
    const tick = (now) => {
      const elapsed = Math.min(40, now - previous || 16);
      previous = now;
      if (mode === "narrow" && !reduced) {
        offset = clamp(offset + drive * elapsed * .13, rail.minimum, rail.maximum);
        layer.style.setProperty("--rail-offset", `${offset.toFixed(2)}px`);
      }
      setMagnetism();
      const atLimit = offset <= rail.minimum && drive < 0 || offset >= rail.maximum && drive > 0;
      frame = mode === "narrow" && Math.abs(drive) > .001 && !atLimit && expanded && !document.hidden
        ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame && expanded && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      mode = interestMode(width, height);
      panel.dataset.interestMode = mode;
      rail = interestRailMetrics(height, items.length);
      offset = clamp(offset, rail.minimum, rail.maximum);
      layer.style.setProperty("--rail-offset", `${offset.toFixed(2)}px`);
      itemNodes.current.forEach((node, index) => node?.style.setProperty("--rail-base", `${rail.start + rail.spacing * index}px`));
      const heading = panel.querySelector(".tz-adaptive-title h2");
      if (heading) {
        const panelRect = panel.getBoundingClientRect();
        const headingRect = heading.getBoundingClientRect();
        panel.style.setProperty("--interest-copy-top", `${Math.max(64, headingRect.bottom - panelRect.top + 10)}px`);
      }
    };
    const move = (event) => {
      if (event.pointerType !== "mouse" || !expanded) return;
      const bounds = panel.getBoundingClientRect();
      pointer = { x: event.clientX, y: event.clientY };
      drive = mode === "narrow" ? interestDrive((event.clientY - bounds.top) / bounds.height) : 0;
      wake();
    };
    const leave = () => {
      drive = 0;
      pointer = null;
      resetMagnetism();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        drive = 0;
        pointer = null;
        resetMagnetism();
      }
    };
    const resize = new ResizeObserver(measure);
    resize.observe(panel);
    const heading = panel.querySelector(".tz-adaptive-title h2");
    if (heading) resize.observe(heading);
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      delete panel.dataset.interestMode;
      panel.style.removeProperty("--interest-copy-top");
    };
  }, [expanded, host, items.length, reduced]);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const select = (item) => {
    if (!item.image) return;
    clearTimeout(resetTimer.current);
    visitedImages.current.add(item.id);
    onActive(item.id);
  };
  const scheduleReset = () => {
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => onActive(null), 170);
  };

  return (
    <>
      <div className="tz-interest-backgrounds" data-active={expanded} aria-hidden="true">
        {items.filter((item) => item.image).map((item) => (
          <img key={item.id} src={active === item.id || visitedImages.current.has(item.id) ? item.image : undefined}
            alt="" decoding="async" data-visible={active === item.id}
            onLoad={(event) => { event.currentTarget.dataset.ready = "true"; }} />
        ))}
      </div>
      <div ref={field} className="tz-interests-motion" data-active={expanded} data-selection={active || undefined}>
      <div className="tz-interest-field" aria-label="Explore interests" aria-hidden={!expanded}>
        {items.map((item, index) => {
          const interactive = !!item.image;
          const Tag = interactive ? "button" : "span";
          return (
            <Tag
              ref={(node) => { itemNodes.current[index] = node; }}
              key={item.id}
              {...(interactive ? {
                type: "button",
                tabIndex: expanded ? 0 : -1,
                "aria-label": item.title,
                "aria-pressed": active === item.id,
                onPointerEnter: () => select(item),
                onPointerLeave: scheduleReset,
                onFocus: () => select(item),
                onBlur: scheduleReset,
                onClick: (event) => { event.preventDefault(); event.stopPropagation(); select(item); },
              } : { "aria-hidden": "true" })}
              className="tz-interest-item"
              data-interactive={interactive}
              data-selected={active === item.id}
              style={{
                "--interest-x": `${item.x}%`,
                "--interest-y": `${item.y}%`,
                "--interest-depth": `${item.depth}px`,
                "--interest-rotation": `${item.rotation}deg`,
                "--interest-tilt-x": `${(item.y - 50) * .08}deg`,
                "--interest-tilt-y": `${(item.x - 80) * -.08}deg`,
                "--interest-scale": item.scale,
                "--interest-delay": `${index * 54}ms`,
                "--entry-x": `${index % 2 ? 28 : -22}px`,
                "--entry-y": `${18 + index * 3}px`,
              }}
            >
              <img src={item.icon} alt="" draggable="false" decoding="async" loading="eager" />
            </Tag>
          );
        })}
      </div>
      </div>
    </>
  );
}
