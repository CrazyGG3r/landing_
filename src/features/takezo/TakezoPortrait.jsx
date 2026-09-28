import { useEffect, useRef, useState } from "react";

const FORMATION = "/takezo/TakezoPortraitFormation.webm";
const FORMED = "/takezo/TakezoPortraitFormed.svg";

export default function TakezoPortrait({ reduced = false }) {
  const root = useRef(null);
  const video = useRef(null);
  const frame = useRef(0);
  const playbackFrame = useRef(0);
  const active = useRef(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [playing, setPlaying] = useState(false);
  const [formed, setFormed] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      video.current?.pause();
      setPlaying(false);
      setFormed(true);
    }
  }, [reduced]);

  useEffect(() => {
    const element = root.current;
    const panel = element?.closest(".tz-panel");
    if (!element || !panel) return undefined;

    const draw = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.13;
      current.current.y += dy * 0.13;
      element.style.setProperty("--portrait-x", `${current.current.x.toFixed(2)}px`);
      element.style.setProperty("--portrait-y", `${current.current.y.toFixed(2)}px`);
      element.style.setProperty("--portrait-rx", `${(-current.current.y * 0.16).toFixed(2)}deg`);
      element.style.setProperty("--portrait-ry", `${(current.current.x * 0.16).toFixed(2)}deg`);
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) frame.current = requestAnimationFrame(draw);
      else frame.current = 0;
    };
    const animate = () => {
      if (!frame.current) frame.current = requestAnimationFrame(draw);
    };
    const move = (event) => {
      if (reduced || event.pointerType !== "mouse") return;
      const bounds = panel.getBoundingClientRect();
      target.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24;
      target.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
      animate();
    };
    const reset = () => {
      target.current = { x: 0, y: 0 };
      animate();
    };
    const play = () => {
      active.current = true;
      if (reduced || !video.current) {
        setFormed(true);
        return;
      }
      const media = video.current;
      media.currentTime = 0;
      setFormed(false);
      setPlaying(true);
      const watchPlaybackEnd = () => {
        // Pre-reveal just before the WebM's empty terminal frame. The SVG is
        // already decoded, but remains invisible through the actual formation.
        if (media.duration && media.duration - media.currentTime <= 0.09) setFormed(true);
        if (!media.paused && !media.ended) playbackFrame.current = requestAnimationFrame(watchPlaybackEnd);
        else playbackFrame.current = 0;
      };
      if (playbackFrame.current) cancelAnimationFrame(playbackFrame.current);
      media.play().then(() => {
        playbackFrame.current = requestAnimationFrame(watchPlaybackEnd);
      }).catch(() => {
        setPlaying(false);
        setFormed(true);
      });
    };
    const leave = () => {
      active.current = false;
      video.current?.pause();
      if (playbackFrame.current) cancelAnimationFrame(playbackFrame.current);
      playbackFrame.current = 0;
      setPlaying(false);
      setFormed(false);
      reset();
    };
    const focus = (event) => {
      if (event.target === panel) play();
    };
    const blur = (event) => {
      if (!panel.contains(event.relatedTarget)) leave();
    };

    panel.addEventListener("pointerenter", play);
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave);
    panel.addEventListener("focusin", focus);
    panel.addEventListener("focusout", blur);
    return () => {
      panel.removeEventListener("pointerenter", play);
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      panel.removeEventListener("focusin", focus);
      panel.removeEventListener("focusout", blur);
      if (frame.current) cancelAnimationFrame(frame.current);
      if (playbackFrame.current) cancelAnimationFrame(playbackFrame.current);
    };
  }, [reduced]);

  return (
    <span
      ref={root}
      className="tz-art tz-portrait"
      data-playing={playing ? "true" : undefined}
      data-formed={formed ? "true" : undefined}
      aria-hidden="true"
    >
      <img className="tz-portrait-formed" src={FORMED} alt="" draggable="false" />
      <video
        ref={video}
        className="tz-portrait-formation"
        src={FORMATION}
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          setFormed(active.current);
          setPlaying(false);
        }}
        onError={() => {
          setFormed(active.current);
          setPlaying(false);
        }}
      />
    </span>
  );
}
