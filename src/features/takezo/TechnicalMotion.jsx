import { useEffect, useRef } from "react";

export default function TechnicalMotion({ host, sources, reduced }) {
  const stage = useRef(null);
  const videos = useRef([]);

  useEffect(() => {
    const panel = host.current;
    const layer = stage.current;
    if (!panel || !layer || !sources?.length) return;

    let frame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const videoNodes = videos.current.slice();

    const paint = () => {
      const distanceX = targetX - pointerX;
      const distanceY = targetY - pointerY;
      pointerX = Math.abs(distanceX) < 0.001 ? targetX : pointerX + distanceX * 0.14;
      pointerY = Math.abs(distanceY) < 0.001 ? targetY : pointerY + distanceY * 0.14;
      const position = Math.max(0, Math.min(1, pointerX * 0.8 + (1 - pointerY) * 0.2));
      layer.style.setProperty("--technical-parallax-x", `${(pointerX - .5) * 28}px`);
      layer.style.setProperty("--technical-parallax-y", `${(pointerY - .5) * 20}px`);

      videoNodes.forEach((video, index) => {
        if (reduced || !video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const offset = index * 0.08;
        const time = ((position + offset) % 1) * Math.max(0, video.duration - 0.04);
        const timeDistance = Math.abs(video.currentTime - time);
        if (!video.seeking && timeDistance > 0.018) video.currentTime = time;
      });
      frame = Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.002
        ? requestAnimationFrame(paint)
        : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = panel.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      targetY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      wake();
    };
    const ready = () => wake();

    panel.addEventListener("pointermove", move, { passive: true });
    videoNodes.forEach((video) => {
      video?.addEventListener("loadedmetadata", ready);
      video?.addEventListener("seeked", ready);
    });
    wake();
    return () => {
      cancelAnimationFrame(frame);
      panel.removeEventListener("pointermove", move);
      videoNodes.forEach((video) => {
        video?.removeEventListener("loadedmetadata", ready);
        video?.removeEventListener("seeked", ready);
      });
    };
  }, [host, reduced, sources]);

  return (
    <span ref={stage} className="tz-technical-motion" aria-hidden="true">
      {sources.map((src, index) => (
        <video
          key={src}
          ref={(node) => { videos.current[index] = node; }}
          className={`tz-technical-motion-video tz-technical-motion-video-${index + 1}`}
          src={src}
          preload="auto"
          muted
          playsInline
        />
      ))}
    </span>
  );
}
