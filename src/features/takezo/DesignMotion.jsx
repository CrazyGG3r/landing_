import { useEffect, useRef } from "react";
import { useVideoSource } from "../../shared/performance/videoSources";
import { observePanelActivity } from "./panelActivity";

export default function DesignMotion({ media, expanded, reduced }) {
  const source = useVideoSource(media.video);
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
      if (active) element.play().catch(source.onPlaybackError);
      else element.pause();
    });
  }, [expanded, reduced, source]);

  return (
    <span ref={stage} className="tz-design-motion" aria-hidden="true">
      <img className="tz-design-motion-logo" src={media.logo} alt="" decoding="async" />
      <video
        ref={video}
        className="tz-design-motion-video"
        src={source.src}
        onError={source.onError}
        muted
        playsInline
        preload="metadata"
      />
    </span>
  );
}
