import { useEffect, useRef, useState } from "react";
import { useVideoSource } from "../../shared/performance/videoSources";
import { observePanelActivity } from "./panelActivity";

const SEEK_INTERVAL_MS = 50;

function TechnicalVideo({ path, index, register, playing }) {
  const source = useVideoSource(path);
  const element = useRef(null);
  useEffect(() => {
    const video = element.current;
    if (!video || !playing || !source.src) return undefined;
    video.play().catch(source.onPlaybackError);
    return () => video.pause();
  }, [playing, source]);
  return source.failed ? null : <video
    ref={(node) => { element.current = node; register(index, node); }}
    className={`tz-technical-motion-video tz-technical-motion-video-${index + 1}`}
    src={source.src} preload="metadata" muted playsInline loop onError={source.onError}
  />;
}

export default function TechnicalMotion({ host, sources, reduced, expanded }) {
  const stage = useRef(null);
  const videos = useRef([]);
  const [touchPlaying, setTouchPlaying] = useState(false);

  useEffect(() => {
    const panel = host.current;
    const layer = stage.current;
    if (!panel || !layer || !sources?.length) return;

    let frame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let active = false;
    let lastSeek = -SEEK_INTERVAL_MS;
    const videoNodes = videos.current.slice();

    const paint = (now) => {
      const distanceX = targetX - pointerX;
      const distanceY = targetY - pointerY;
      pointerX = Math.abs(distanceX) < 0.001 ? targetX : pointerX + distanceX * 0.14;
      pointerY = Math.abs(distanceY) < 0.001 ? targetY : pointerY + distanceY * 0.14;
      const position = Math.max(0, Math.min(1, pointerX * 0.8 + (1 - pointerY) * 0.2));
      layer.style.setProperty("--technical-parallax-x", `${(pointerX - .5) * 28}px`);
      layer.style.setProperty("--technical-parallax-y", `${(pointerY - .5) * 20}px`);

      // Arbitrary video seeks are decoder-heavy. Coalesce pointer frames into
      // at most 20 seeks/sec, while leaving parallax at display refresh rate.
      if (!reduced && !window.matchMedia("(pointer: coarse)").matches && now - lastSeek >= SEEK_INTERVAL_MS) {
        lastSeek = now;
        videoNodes.forEach((video, index) => {
          if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
          const offset = index * 0.08;
          const time = ((position + offset) % 1) * Math.max(0, video.duration - 0.04);
          const timeDistance = Math.abs(video.currentTime - time);
          if (!video.seeking && timeDistance > 0.018) video.currentTime = time;
        });
      }
      frame = Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.002
        ? requestAnimationFrame(paint)
        : 0;
    };

    const wake = () => {
      if (active && !reduced && !frame) frame = requestAnimationFrame(paint);
    };

    const move = (event) => {
      if (!active || reduced || event.pointerType !== "mouse") return;
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
    const stopActivity = observePanelActivity(panel, (next) => {
      active = next;
      layer.dataset.active = String(next);
      setTouchPlaying(next && expanded && !reduced && window.matchMedia("(pointer: coarse)").matches);
      if (next) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      stopActivity();
      panel.removeEventListener("pointermove", move);
      videoNodes.forEach((video) => {
        video?.removeEventListener("loadedmetadata", ready);
        video?.removeEventListener("seeked", ready);
      });
    };
  }, [host, reduced, sources, expanded]);

  return (
    <span ref={stage} className="tz-technical-motion" aria-hidden="true">
      {sources.map((src, index) => <TechnicalVideo key={src} path={src} index={index}
        register={(number, node) => { videos.current[number] = node; }} playing={touchPlaying} />)}
    </span>
  );
}
