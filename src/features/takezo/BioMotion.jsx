import { useLayoutEffect, useRef } from "react";
import TakezoPortrait from "./TakezoPortrait";
import "./bioMotion.css";

export default function BioMotion({ host, model, expanded, reduced, language }) {
  const stage = useRef(null);
  useLayoutEffect(() => {
    const panel = host.current;
    const layer = stage.current;
    if (!panel || !layer) return;
    const measure = () => {
      const { width, height } = panel.getBoundingClientRect();
      const available = Math.max(160, height - 115);
      const landscape = width / Math.max(height, 1) > 1.25;
      layer.dataset.shape = landscape ? "landscape" : available < 440 ? "compact" : "portrait";
      layer.dataset.short = available < 320 ? "true" : "false";
      layer.style.setProperty("--bio-name-size", `${Math.min(76, width * .155, available * (landscape ? .25 : .15))}px`);
      layer.style.setProperty("--bio-portrait-size", `${Math.min(138, width * .32, available * .24)}px`);
      layer.style.setProperty("--bio-ribbon-size", `${Math.max(14, Math.min(27, width * .058, available * .052))}px`);
      layer.style.setProperty("--bio-detail-size", `${Math.max(10, Math.min(13, width * .031, available * .028))}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    measure();
    return () => observer.disconnect();
  }, [host, expanded]);

  const urdu = language === "urdu";
  return (
    <section ref={stage} className="tz-bio" data-open={expanded} aria-hidden={!expanded} aria-label="About Takezo">
      <div className="tz-bio-name" lang={urdu ? "ur" : "en"}>
        <div className="tz-bio-alias-row">
          <h2 className="tz-bio-alias" dir={urdu ? "rtl" : undefined}>{urdu ? "تاکیزو" : model.alias}</h2>
          <span className="tz-bio-aka">AKA <i aria-hidden="true" /></span>
        </div>
        <div className="tz-bio-real-row">
          <span className="tz-bio-first">{urdu ? "محمد" : model.firstName}</span>
          <span className="tz-bio-last">{urdu ? "عزیر" : model.lastName}</span>
        </div>
      </div>
      <div className="tz-bio-portrait-group">
        <div className="tz-bio-portrait-window">
          <TakezoPortrait reduced={reduced} />
          <span className="tz-bio-registration" aria-hidden="true">01 / SELF</span>
        </div>
        <span className="tz-bio-status"><i aria-hidden="true" />OPEN FOR WORK</span>
      </div>
      <ol className="tz-bio-ribbons" aria-label="My practice and perspective">
        {model.ribbons.map((ribbon, index) => (
          <li key={ribbon.label} className="tz-bio-ribbon" style={{ "--bio-order": index, "--bio-side": index % 2 ? -1 : 1 }}>
            <span className="tz-bio-ribbon-index" aria-hidden="true">0{index + 1}</span>
            <div><strong>{ribbon.label}</strong><p>{ribbon.detail}</p></div>
            <span className="tz-bio-ribbon-mark" aria-hidden="true">{ribbon.mark}</span>
          </li>
        ))}
      </ol>
      <p className="tz-bio-motto"><span aria-hidden="true">↗</span>{model.motto}</p>
    </section>
  );
}
