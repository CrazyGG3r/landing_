import { useEffect, useRef, useState } from "react";
import "./breakdown.css";

export default function BreakdownPanel({ children, breakdown, onOpen, className, style, ...props }) {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const strips = breakdown.layout === "strips";
  const chunks = strips ? breakdown.strips : [...breakdown.links.slice(0, 4), breakdown.centre || { name: breakdown.caption }, ...breakdown.links.slice(4)];
  useEffect(() => {
    if (!open) return;
    const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside, { passive: true });
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  const renderChunk = (item, index) => {
    const isCentre = !strips && index === 4;
    const dest = item.destination;
    const interactive = !!(item.href || dest);
    const Tag = item.href ? "a" : dest ? "button" : "div";
    return <Tag key={`${item.name}-${index}`} className={`tz-breakdown-chunk ${isCentre ? "tz-breakdown-centre" : ""} ${interactive ? "tz-breakdown-action" : ""}`}
      {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(dest ? { type: "button", onClick: (event) => { event.stopPropagation(); onOpen(dest, event.currentTarget); } } : {})}
      {...(interactive ? { tabIndex: open ? 0 : -1 } : {})}
      aria-label={item.href ? `${item.name} — opens in a new tab` : item.name}
      title={item.name} style={{ "--chunk-delay": `${strips ? index * 28 : (Math.abs(index % 3 - 1) + Math.abs(Math.floor(index / 3) - 1)) * 22}ms` }}
      onPointerEnter={() => { if (strips) setActive(index); }}
      onFocus={() => { if (strips) setActive(index); }}>
      {item.icon && <span className="tz-breakdown-icon" aria-hidden="true"><img src={item.icon} alt="" draggable="false" style={{ "--icon-scale": item.iconScale || 1 }} /></span>}
      {item.arrow && <svg className="tz-breakdown-large-arrow" viewBox="0 0 200 200" aria-hidden="true"><path d="M31 28h144v144h-39V94L52 178l-30-30 84-81H31z" fill="currentColor" /></svg>}
      {(strips || isCentre || item.showLabel) && <span className="tz-breakdown-label" data-text-layer="hovered">{item.name}</span>}
      {interactive && <span className="tz-breakdown-link-arrow" aria-hidden="true">↗</span>}
    </Tag>;
  };
  return <article {...props} ref={root} className={`${className} tz-breakdown ${strips ? "tz-breakdown-strips" : ""}`}
    style={style} tabIndex={0} role="group" aria-label={breakdown.ariaLabel || "Panel options"}
    data-open={open} data-active={active}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={(event) => { if (event.pointerType === "mouse" && !(event.currentTarget.contains(document.activeElement) && document.activeElement.matches(":focus-visible"))) { setOpen(false); setActive(-1); } }}
    onClick={() => setOpen(true)} onFocusCapture={() => setOpen(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) { setOpen(false); setActive(-1); } }}
    onKeyDown={(event) => {
      if (event.key === "Escape") { event.stopPropagation(); root.current.focus(); setOpen(false); setActive(-1); }
      if (event.target === event.currentTarget && ["Enter", " "].includes(event.key)) { event.preventDefault(); setOpen(true); }
    }}>
    <div className="tz-breakdown-grid" aria-hidden={!open} inert={!open ? true : undefined} onPointerLeave={() => setActive(-1)}>
      {chunks.map(renderChunk)}
    </div>
    <div className="tz-breakdown-cover" data-text-layer="unhovered" aria-hidden={open}>{children}</div>
  </article>;
}
