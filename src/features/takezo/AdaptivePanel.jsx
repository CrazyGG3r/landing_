import { useLayoutEffect, useRef } from "react";
import PanelSurface from "./PanelSurface";
import PanelCopy from "./PanelCopy";
import { surfaceStyle } from "./panelFeatures";

export default function AdaptivePanel({
  card,
  index,
  rect,
  expanded,
  compressed,
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
  const reader = useRef(null);
  const text = card.title.replace(/\s+/g, " ").trim();

  useLayoutEffect(() => {
    const el = panel.current;
    const label = title.current;
    const metricsContext = document.createElement("canvas").getContext("2d");
    const inkMetrics = () => {
      const style = getComputedStyle(label);
      metricsContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = metricsContext.measureText(text);
      const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
      const top = (parseFloat(style.lineHeight) - ascent - descent) / 2 + ascent - metrics.actualBoundingBoxAscent;
      return { top, height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent };
    };
    let frame = 0;
    let disposed = false;
    const fit = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      const narrow = width < 190;
      const short = height < 180;
      const mode = !expanded && features.logo
        ? narrow && short ? "icon" : narrow ? "above" : short ? "left" : "none"
        : "none";
      el.dataset.logoMode = mode;
      el.dataset.vertical = String(!expanded && width < 180 && height > width * 1.7);
      const full = !compressed && width > 200 && height > 200 && (expanded || (width > 275 && height > 300));
      el.dataset.full = String(full);
      const interior = el.querySelector(".tz-adaptive-interior");
      interior.setAttribute("aria-hidden", String(!full));
      interior.inert = !full;
      el.dataset.tiny = String(width < 105 || height < 150);
      el.dataset.micro = String(width < 60 || height < 85);
      // Insets have a real lower bound; the type yields before the padding does.
      el.style.setProperty("--panel-pad", `${Math.max(10, Math.min(23, width * .075, height * .12))}px`);
      const box = titleBox.current;
      if (mode === "left") {
        const available = Math.max(1, box.parentElement.clientHeight - 4);
        el.style.setProperty("--logo-reserve", `${Math.min(64.8, available) + 12}px`);
      }
      const vertical = el.dataset.vertical === "true";
      // Fit immediately to each geometry frame. A second pass lets the logo
      // reserve exactly the fitted title height, including long compact titles.
      for (let pass = 0; pass < (mode === "left" ? 3 : 1); pass++) {
        let low = 1;
        let high = vertical ? Math.min(64, width * .65) : Math.min(60, Math.max(18, width * .18));
        for (let i = 0; i < 12; i++) {
          const size = (low + high) / 2;
          label.style.fontSize = `${size}px`;
          if (label.scrollWidth <= box.clientWidth - 4 && label.scrollHeight <= box.clientHeight - 4) low = size;
          else high = size;
        }
        label.style.fontSize = `${low}px`;
        if (mode === "left") {
          el.style.setProperty("--logo-reserve", `${inkMetrics().height + 12}px`);
        }
      }
      if (mode === "left") {
        const ink = inkMetrics();
        el.style.setProperty("--inline-logo-size", `${ink.height}px`);
        el.style.setProperty("--inline-logo-y", `${box.offsetTop + 2 + ink.top + ink.height / 2}px`);
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
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [expanded, compressed, text, features.logo]);

  return (
    <button
      ref={panel}
      type="button"
      className={`tz-panel tz-adaptive tz-${card.color}`}
      data-panel={index}
      data-destination={card.id || undefined}
      data-expanded={expanded}
      data-compressed={compressed}
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
        if (e.pointerType === "mouse" && expanded) reader.current?.move(e);
      }}
      onKeyDown={(e) => reader.current?.key(e)}
      onPointerLeave={() => reader.current?.stop()}
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
          {features.logo && ["icon", "above", "left"].map((mode) => (
            <span key={mode} className={`tz-compact-logo tz-logo-${mode}`} aria-hidden="true"
              style={{ maskImage: `url("${features.logo}")` }} />
          ))}
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
          <PanelCopy ref={reader} card={card} expanded={expanded} enabled={features.cursorRead} panel={panel} />
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
