import { useLayoutEffect, useRef } from "react";
import PanelSurface from "./PanelSurface";
import { surfaceStyle } from "./panelFeatures";

export default function AdaptivePanel({
  card,
  index,
  rect,
  expanded,
  onExpand,
  onOpen,
  artwork,
  features,
}) {
  const Artwork = artwork;
  const panel = useRef(null);
  const titleBox = useRef(null);
  const title = useRef(null);
  const touch = useRef(false);
  const text = card.title.replace(/\s+/g, " ").trim();

  useLayoutEffect(() => {
    const el = panel.current;
    let frame = 0;
    let growthFrame = 0;
    let settleTimer = 0;
    let orientationTimer = 0;
    let pendingVertical = null;
    let reveal = null;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const label = title.current;
    // Keep typography still while the shared tracks move. Only shrink immediately
    // when the available slot requires it; grow once the geometry has settled.
    const grow = (target) => {
      const from = parseFloat(label.style.fontSize) || target;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 240);
        const eased = 1 - Math.pow(1 - progress, 3);
        label.style.fontSize = `${from + (target - from) * eased}px`;
        if (progress < 1) growthFrame = requestAnimationFrame(tick);
      };
      growthFrame = requestAnimationFrame(tick);
    };
    const fit = () => {
      cancelAnimationFrame(growthFrame);
      clearTimeout(settleTimer);
      const width = el.clientWidth;
      const height = el.clientHeight;
      const narrow = width < 190;
      const short = height < 180;
      el.dataset.logoMode = !expanded && features.logo
        ? narrow && short ? "icon" : narrow ? "above" : short ? "left" : "none"
        : "none";
      const desiredVertical = !expanded && width < 180 && height > width * 1.7;
      if (el.dataset.vertical === undefined || reduced.matches) {
        el.dataset.vertical = String(desiredVertical);
      } else if (desiredVertical !== (el.dataset.vertical === "true")) {
        if (pendingVertical !== desiredVertical) {
          clearTimeout(orientationTimer);
          pendingVertical = desiredVertical;
          reveal?.cancel();
          label.style.opacity = "0";
          orientationTimer = window.setTimeout(() => {
            el.dataset.vertical = String(desiredVertical);
            pendingVertical = null;
            fit();
            label.style.opacity = "1";
            reveal = label.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 180,
              easing: "ease-out",
            });
          }, 90);
        }
      } else if (pendingVertical !== null) {
        clearTimeout(orientationTimer);
        pendingVertical = null;
        label.style.opacity = "1";
      }
      const vertical = el.dataset.vertical === "true";
      const full = expanded || (width > 275 && height > 300);
      el.dataset.full = String(full);
      el.dataset.tiny = String(width < 105 || height < 130);
      el.dataset.micro = String(width < 60 || height < 85);
      el.style.setProperty(
        "--panel-pad",
        `${Math.max(7, Math.min(23, width * 0.075, height * 0.075))}px`,
      );
      const box = titleBox.current;
      const previous = parseFloat(label.style.fontSize);
      // Fit against the actual text slot, including during track interpolation.
      let low = 1,
        high = vertical
          ? Math.min(64, width * 0.65)
          : Math.min(60, Math.max(18, width * 0.18));
      for (let i = 0; i < 10; i++) {
        const size = (low + high) / 2;
        label.style.fontSize = `${size}px`;
        if (
          label.scrollWidth <= box.clientWidth &&
          label.scrollHeight <= box.clientHeight
        )
          low = size;
        else high = size;
      }
      const target = Math.floor(low * 10) / 10;
      if (!previous || reduced.matches || target <= previous) {
        label.style.fontSize = `${target}px`;
      } else {
        label.style.fontSize = `${previous}px`;
        // A small dead band prevents fractional sizing noise at rest.
        if (target - previous > 0.75) {
          settleTimer = window.setTimeout(() => grow(target), 110);
        }
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    observer.observe(titleBox.current);
    fit();
    document.fonts.ready.then(() => {
      if (!disposed) schedule();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(growthFrame);
      clearTimeout(settleTimer);
      clearTimeout(orientationTimer);
      reveal?.cancel();
      label.style.opacity = "1";
    };
  }, [expanded, text, features.logo, rect]);

  return (
    <button
      ref={panel}
      type="button"
      className={`tz-panel tz-adaptive tz-${card.color}`}
      data-panel={index}
      data-destination={card.id || undefined}
      data-expanded={expanded}
      aria-expanded={expanded}
      aria-label={`${card.id ? "Explore" : "Expand"} ${text}`}
      style={{
        ...surfaceStyle(features),
        gridColumn: `${rect[0]} / span ${rect[2]}`,
        gridRow: `${rect[1]} / span ${rect[3]}`,
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onExpand(index, e);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" && !expanded) onExpand(index, e);
      }}
      onPointerDown={(e) => {
        touch.current = e.pointerType === "touch";
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) onExpand(index);
      }}
      onBlur={() => onExpand(-1)}
      onClick={(e) => {
        if (touch.current && !expanded) {
          onExpand(index);
          return;
        }
        if (card.id) onOpen(card.id, e.currentTarget);
        else onExpand(touch.current && expanded ? -1 : index);
      }}
    >
      <PanelSurface features={features} />
      <div className="tz-adaptive-content">
        <div className="tz-adaptive-header">
          <span>{card.kicker}</span>
          <span aria-hidden="true">{card.id ? "↗" : expanded ? "−" : "+"}</span>
        </div>
        <div className="tz-title-composition">
          {features.logo && <span className="tz-compact-logo" aria-hidden="true" style={{ maskImage: `url("${features.logo}")` }} />}
          <div className="tz-adaptive-title" ref={titleBox}>
            <h2 ref={title}>{text}</h2>
          </div>
        </div>
        <div className="tz-adaptive-interior">
          {card.art && (
            <div className="tz-adaptive-art">
              <Artwork kind={card.art} />
            </div>
          )}
          <p>{card.description}</p>
        </div>
        <div className="tz-adaptive-footer">
          <span>{card.footer || `${card.kicker} / TAKEZO — BOLTFORGED`}</span>
          <span className="tz-adaptive-size" aria-hidden="true">
            {rect[2]}×{rect[3]}
          </span>
        </div>
      </div>
    </button>
  );
}
