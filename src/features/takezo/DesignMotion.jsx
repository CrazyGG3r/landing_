import { useEffect, useRef } from "react";

export default function DesignMotion({ media, expanded, reduced }) {
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!expanded || reduced) {
      element.pause();
      try { element.currentTime = 0; } catch { /* metadata may not be ready yet */ }
      return;
    }
    element.currentTime = 0;
    element.play().catch(() => {});
  }, [expanded, reduced]);

  return (
    <span className="tz-design-motion" aria-hidden="true">
      <img className="tz-design-motion-logo" src={media.logo} alt="" decoding="async" />
      <video
        ref={video}
        className="tz-design-motion-video"
        src={media.video}
        muted
        playsInline
        preload="metadata"
      />
    </span>
  );
}
