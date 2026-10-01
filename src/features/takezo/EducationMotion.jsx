import { useEffect, useId, useRef, useState } from "react";
import "./educationMotion.css";

export default function EducationMotion({ host, model, expanded, reduced }) {
  const stage = useRef(null);
  const distortion = useRef(null);
  const streak = useRef(null);
  const offset = useRef(null);
  const [wordmarkReady, setWordmarkReady] = useState(false);
  const filterId = `tz-fast-motion-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const panel = host.current;
    const layer = stage.current;
    if (!panel || !layer) return;

    let frame = 0;
    let previousY = null;
    let previousTime = 0;
    let velocity = 0;
    let target = 0;

    const paint = () => {
      velocity += (target - velocity) * .17;
      target *= .78;
      const strength = Math.min(1, Math.abs(velocity) / 1.7);
      const direction = Math.sign(velocity);
      distortion.current?.setAttribute("scale", (strength * 33).toFixed(1));
      streak.current?.setAttribute("stdDeviation", `${(strength * 1.6).toFixed(2)} ${(strength * 15).toFixed(2)}`);
      offset.current?.setAttribute("dy", (direction * strength * 14).toFixed(1));
      layer.dataset.moving = strength > .015 ? "true" : "false";
      layer.style.setProperty("--fast-drift", `${(direction * strength * 11).toFixed(1)}px`);
      frame = Math.abs(velocity) + Math.abs(target) > .015 ? requestAnimationFrame(paint) : 0;
    };
    const move = (event) => {
      if (!expanded || reduced || event.pointerType !== "mouse") return;
      const now = performance.now();
      if (previousY !== null) {
        const elapsed = Math.max(8, now - previousTime);
        target = Math.max(-3, Math.min(3, (event.clientY - previousY) / elapsed * 2.1));
        if (!frame) frame = requestAnimationFrame(paint);
      }
      previousY = event.clientY;
      previousTime = now;
    };
    const settle = () => {
      previousY = null;
      target = 0;
      if (!frame && !reduced) frame = requestAnimationFrame(paint);
    };

    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", settle);
    return () => {
      cancelAnimationFrame(frame);
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", settle);
      delete panel.dataset.bloomboundActive;
    };
  }, [expanded, host, reduced]);

  const setBloombound = (active) => {
    if (host.current) host.current.dataset.bloomboundActive = String(active);
  };

  return (
    <section ref={stage} className="tz-education-motion" data-open={expanded} data-moving="false" aria-hidden={!expanded}>
      <svg className="tz-fast-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-40%" y="-45%" width="180%" height="190%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="2" seed="8" result="grain" />
            <feDisplacementMap ref={distortion} in="SourceGraphic" in2="grain" scale="0" xChannelSelector="R" yChannelSelector="G" result="distorted" />
            <feGaussianBlur ref={streak} in="distorted" stdDeviation="0 0" result="blurred" />
            <feOffset ref={offset} in="blurred" dy="0" result="trail" />
            <feMerge><feMergeNode in="trail" /><feMergeNode in="distorted" /></feMerge>
          </filter>
        </defs>
      </svg>
      <div className="tz-education-dawn" aria-hidden="true">
        <span className="tz-education-dawn-horizon" />
        <span className="tz-education-dawn-light" />
        <span className="tz-education-dawn-rays" />
      </div>
      <div className="tz-fast-mark" aria-hidden="true"><img src={model.logo} alt="" style={{ "--fast-filter": `url(#${filterId})` }} /></div>
      <div className="tz-education-copy">
        <div className="tz-education-academic">
          <span className="tz-education-eyebrow">2022 — 2026 / FAST UNIVERSITY</span>
          <p className="tz-education-degree">Bachelor’s in<br />Software Engineering</p>
        </div>
        <div className="tz-education-project">
          <span className="tz-education-eyebrow">FINAL YEAR PROJECT / 01</span>
          <a className="tz-bloombound-link" href={model.project.url} target="_blank" rel="noopener noreferrer"
            data-wordmark-ready={wordmarkReady}
            tabIndex={expanded ? 0 : -1}
            onPointerEnter={() => setBloombound(true)} onPointerLeave={() => setBloombound(false)}
            onFocus={() => setBloombound(true)} onBlur={() => setBloombound(false)}
            onClick={(event) => event.stopPropagation()}>
            <span className="tz-bloombound-text">{model.project.label}</span>
            <img className="tz-bloombound-wordmark" src={model.projectWordmark} alt="" decoding="async"
              onLoad={(event) => {
                try {
                  const canvas = document.createElement("canvas");
                  canvas.width = 32;
                  canvas.height = 8;
                  const context = canvas.getContext("2d", { willReadFrequently: true });
                  context.drawImage(event.currentTarget, 0, 0, canvas.width, canvas.height);
                  const rgba = context.getImageData(0, 0, canvas.width, canvas.height).data;
                  setWordmarkReady(rgba.some((value, index) => index % 4 === 3 && value < 248));
                } catch { setWordmarkReady(false); }
              }} />
            <span className="tz-bloombound-hint" aria-hidden="true">OPENS ITCH.IO&nbsp; ↗</span>
          </a>
          <p className="tz-education-project-copy">{model.project.caption}</p>
        </div>
      </div>
    </section>
  );
}
