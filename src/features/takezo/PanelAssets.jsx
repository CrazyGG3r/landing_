import { useEffect, useRef } from "react";
import "./panelAssets.css";

export default function PanelAssets({ effect, images, options = {}, reduced, activationSelector = ".tz-panel" }) {
  const layer = useRef(null);
  useEffect(() => {
    const element = layer.current;
    const panel = element.closest(activationSelector);
    if (!panel) return;
    let frame = 0, bounds = null, active = false, x = 0, y = 0, tx = 0, ty = 0, previous = 0;
    const paint = (now) => {
      const blend = 1 - Math.exp(-Math.min(40, now - previous || 16) / 85);
      previous = now;
      x += (tx - x) * blend; y += (ty - y) * blend;
      element.style.setProperty("--asset-px", `${x.toFixed(2)}px`);
      element.style.setProperty("--asset-py", `${y.toFixed(2)}px`);
      frame = Math.abs(tx - x) + Math.abs(ty - y) > .05 ? requestAnimationFrame(paint) : 0;
    };
    const wake = () => { if (!frame && !reduced && !document.hidden) { previous = performance.now(); frame = requestAnimationFrame(paint); } };
    const enter = () => { active = true; bounds = panel.getBoundingClientRect(); element.dataset.active = "true"; };
    const move = (event) => {
      if (reduced || event.pointerType !== "mouse" || !active) return;
      bounds ||= panel.getBoundingClientRect();
      const strength = options.parallax ?? 14;
      tx = ((event.clientX - bounds.left) / bounds.width - .5) * strength * 2;
      ty = ((event.clientY - bounds.top) / bounds.height - .5) * strength * 2;
      wake();
    };
    const leave = () => { active = false; element.dataset.active = "false"; tx = 0; ty = 0; wake(); };
    const blur = (event) => { if (!panel.contains(event.relatedTarget)) leave(); };
    const visibility = () => { if (document.hidden) { leave(); cancelAnimationFrame(frame); frame = 0; } };
    const resize = new ResizeObserver(() => { bounds = null; });
    resize.observe(panel);
    panel.addEventListener("pointerenter", enter);
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave);
    panel.addEventListener("focusin", enter);
    panel.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", visibility);
    if (panel.matches(":hover, :focus-within")) enter();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect();
      panel.removeEventListener("pointerenter", enter); panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave); panel.removeEventListener("focusin", enter); panel.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [activationSelector, options.parallax, reduced]);

  return <div ref={layer} className="tz-asset-motion" data-effect={effect} aria-hidden="true"
    style={{ "--asset-x": `${options.x ?? 73}%`, "--asset-y": `${options.y ?? 55}%`, "--asset-width": `${options.width ?? 48}%`,
      "--asset-duration": `${options.duration ?? .76}s`, "--asset-start-scale": options.startScale ?? 1.8, "--asset-opacity": options.opacity ?? .9 }}>
    <div className="tz-asset-drift">{images.map((image, index) => {
      const item = typeof image === "string" ? { src: image } : image;
      const n = images.length === 1 ? 0 : index / (images.length - 1) * 2 - 1;
      return <img key={`${item.src}-${index}`} src={item.src} alt="" loading="lazy" decoding="async" draggable="false"
        style={{ "--fan-x": `${item.x ?? n * (options.spread ?? (effect === "spreading" ? 34 : 10))}%`,
          "--fan-y": `${item.y ?? Math.abs(n) * 12}%`, "--fan-angle": `${item.rotation ?? n * (options.rotation ?? (effect === "spreading" ? 22 : 8))}deg`,
          "--asset-scale": item.scale ?? options.endScale ?? 1, "--asset-delay": `${index * (options.stagger ?? .055)}s` }} />;
    })}</div>
  </div>;
}
