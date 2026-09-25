import { useEffect, useRef, useState } from "react";
import PanelAssets from "./PanelAssets";
import "./breakdown.css";

export default function BreakdownPanel({ children, breakdown, onOpen, reduced, className, style, ...props }) {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const strips = breakdown.layout === "strips";
  const hoverMode = breakdown.hoverMode;
  const tracks = (axis) => [0, 1, 2].map((track) => {
    if (active < 0 || strips || !hoverMode) return "minmax(0, 1fr)";
    const selected = axis === "column" ? active % 3 : Math.floor(active / 3);
    const weight = hoverMode === "expand"
      ? (track === selected ? 2.08 : .46)
      : (track === selected ? .48 : 1.26);
    return `minmax(0, ${weight}fr)`;
  }).join(" ");
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
    const assetEffect = item.tags?.includes("spreading") ? "spreading" : item.tags?.includes("falling") ? "falling" : null;
    return <Tag key={`${item.name}-${index}`} className={`tz-breakdown-chunk ${isCentre ? "tz-breakdown-centre" : ""} ${interactive ? "tz-breakdown-action" : ""}`}
      data-selected={active === index}
      {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(dest ? { type: "button", onClick: (event) => { event.stopPropagation(); onOpen(dest, event.currentTarget); } } : {})}
      {...(interactive ? { tabIndex: open ? 0 : -1 } : {})}
      aria-label={item.href ? `${item.name} — opens in a new tab` : item.name}
      style={{ "--chunk-delay": `${strips ? index * 28 : (Math.abs(index % 3 - 1) + Math.abs(Math.floor(index / 3) - 1)) * 22}ms` }}
      onPointerEnter={() => setActive(index)}
      onFocus={() => setActive(index)}>
      {assetEffect && <PanelAssets effect={assetEffect} images={item.assetImages || []} options={item.assetMotion} reduced={reduced} activationSelector=".tz-breakdown-chunk" />}
      {item.icon && <span className="tz-breakdown-icon" aria-hidden="true"><img src={item.icon} alt="" draggable="false" style={{ "--icon-scale": item.iconScale || 1 }} /></span>}
      {item.arrow && <svg className="tz-breakdown-large-arrow" viewBox="0 0 200 200" aria-hidden="true"><path d="M31 28h144v144h-39V94L52 178l-30-30 84-81H31z" fill="currentColor" /></svg>}
      {(strips || isCentre || item.showLabel) && <span className="tz-breakdown-label" data-text-layer="hovered">{item.name}</span>}
      {isCentre && hoverMode === "contract" && active !== 4 && chunks[active]?.href &&
        <span key={active} className="tz-breakdown-social-name">{chunks[active].hoverName || chunks[active].name}</span>}
      {interactive && breakdown.showLinkArrows !== false && <span className="tz-breakdown-link-arrow" aria-hidden="true">↗</span>}
    </Tag>;
  };
  const renderHitArea = (item, index) => {
    return <span key={`${item.name}-${index}`} className="tz-breakdown-hit" data-chunk-index={index}
      onClick={item.href || item.destination ? (event) => {
        event.stopPropagation();
        root.current.querySelector(".tz-breakdown-grid").children[index].click();
      } : undefined}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index); }} />;
  };
  return <article {...props} ref={root} className={`${className} tz-breakdown ${strips ? "tz-breakdown-strips" : ""}`}
    style={style} tabIndex={0} role="group" aria-label={breakdown.ariaLabel || "Panel options"}
    data-open={open} data-active={active} data-hover-mode={hoverMode || undefined}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={(event) => { if (event.pointerType === "mouse" && !(event.currentTarget.contains(document.activeElement) && document.activeElement.matches(":focus-visible"))) { setOpen(false); setActive(-1); } }}
    onClick={() => setOpen(true)} onFocusCapture={() => setOpen(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) { setOpen(false); setActive(-1); } }}
    onKeyDown={(event) => {
      if (event.key === "Escape") { event.stopPropagation(); root.current.focus(); setOpen(false); setActive(-1); }
      if (event.target === event.currentTarget && ["Enter", " "].includes(event.key)) { event.preventDefault(); setOpen(true); }
    }}>
    <div className="tz-breakdown-grid" aria-hidden={!open} inert={!open ? true : undefined}
      style={!strips && hoverMode ? { gridTemplateColumns: tracks("column"), gridTemplateRows: tracks("row") } : undefined}
      onPointerLeave={hoverMode === "contract" ? undefined : () => setActive(-1)}>
      {chunks.map(renderChunk)}
    </div>
    {hoverMode === "contract" && <div className="tz-breakdown-hit-grid" aria-hidden="true">{chunks.map(renderHitArea)}</div>}
    <div className="tz-breakdown-cover" data-text-layer="unhovered" aria-hidden={open}>{children}</div>
  </article>;
}
