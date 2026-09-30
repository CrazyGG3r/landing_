import { useEffect, useRef } from "react";
import { compatibleVideoSource } from "../../shared/performance/clientCapabilities";
import { observePanelActivity } from "./panelActivity";

export default function DesignMotion({ media, expanded, reduced }) {
  const stage = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!expanded || reduced) {
      stage.current.dataset.active = "false";
      element.pause();
      try { element.currentTime = 0; } catch { /* metadata may not be ready yet */ }
      return;
    }
    element.currentTime = 0;
    return observePanelActivity(stage.current, (active) => {
      stage.current.dataset.active = String(active);
      if (active) element.play().catch(() => {});
      else element.pause();
    });
  }, [expanded, reduced]);

  return (
    <span ref={stage} className="tz-design-motion" aria-hidden="true">
      <img className="tz-design-motion-logo" src={media.logo} alt="" decoding="async" />
      <video
        ref={video}
        className="tz-design-motion-video"
        src={compatibleVideoSource(media.video)}
        muted
        playsInline
        preload="metadata"
      />
    </span>
  );
}
