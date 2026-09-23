import { useLayoutEffect, useRef } from "react";

export default function AdaptivePanel({
  card,
  index,
  rect,
  expanded,
  onExpand,
  onOpen,
  artwork,
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
    let disposed = false;
    const fit = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      const vertical = !expanded && width < 180 && height > width * 1.7;
      const full = expanded || (width > 275 && height > 300);
      el.dataset.vertical = String(vertical);
      el.dataset.full = String(full);
      el.dataset.tiny = String(width < 105 || height < 130);
      el.style.setProperty(
        "--panel-pad",
        `${Math.max(7, Math.min(23, width * 0.075, height * 0.075))}px`,
      );
      const box = titleBox.current;
      const label = title.current;
      // Fit against the actual text slot, including during track interpolation.
      let low = 1,
        high = vertical
          ? Math.min(88, width * 0.65)
          : Math.min(76, Math.max(18, width * 0.22));
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
      label.style.fontSize = `${Math.floor(low * 10) / 10}px`;
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
    };
  }, [expanded, text]);

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
        gridColumn: `${rect[0]} / span ${rect[2]}`,
        gridRow: `${rect[1]} / span ${rect[3]}`,
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onExpand(index);
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
      <div className="tz-adaptive-content">
        <div className="tz-adaptive-header">
          <span>{card.kicker}</span>
          <span aria-hidden="true">{card.id ? "↗" : expanded ? "−" : "+"}</span>
        </div>
        <div className="tz-adaptive-title" ref={titleBox}>
          <h2 ref={title}>{text}</h2>
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
