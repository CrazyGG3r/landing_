import { useEffect, useRef, useState } from "react";

const time = (value) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${Math.floor(value % 60).toString().padStart(2, "0")}`;

export default function VideoTimeline({ player, playing, visible, duration }) {
  const root = useRef(null);
  const elapsed = useRef(null);
  const input = useRef(null);
  const draw = useRef(() => {});
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const video = player.current;
    let frame = 0, lastTime = -1, lastLabel = "";
    const videoFrames = typeof video.requestVideoFrameCallback === "function"
      && typeof video.cancelVideoFrameCallback === "function";
    draw.current = () => {
      const position = video.currentTime;
      if (position === lastTime) return;
      lastTime = position;
      const progress = duration > 0 ? Math.max(0, Math.min(1, position / duration)) : 0;
      root.current.style.setProperty("--tz-progress", `${progress * 100}%`);
      root.current.style.setProperty("--tz-progress-shift", `${-progress * 100}%`);
      root.current.style.setProperty("--tz-total-opacity", Math.max(0, Math.min(1, (.96 - progress) / .13)));
      input.current.value = position;
      const label = time(position);
      if (label !== lastLabel) {
        lastLabel = label;
        const [minutes, seconds] = label.split(":");
        elapsed.current.children[0].textContent = minutes;
        elapsed.current.children[1].textContent = seconds;
        input.current.setAttribute("aria-valuetext", `${label} of ${time(duration)}`);
      }
    };
    const cancelFrame = () => {
      if (!frame) return;
      if (videoFrames) video.cancelVideoFrameCallback(frame);
      else cancelAnimationFrame(frame);
      frame = 0;
    };
    const tick = () => {
      frame = 0;
      draw.current();
      if (playing && (visible || focused) && !document.hidden) {
        frame = videoFrames ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
      }
    };
    const sync = () => {
      cancelFrame();
      draw.current();
      // Align progress work with decoded video frames where supported. Native
      // media events still cover seeking and hidden controls.
      if (playing && (visible || focused) && !document.hidden) {
        frame = videoFrames ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
      }
    };
    video.addEventListener("timeupdate", draw.current);
    video.addEventListener("seeked", draw.current);
    document.addEventListener("visibilitychange", sync);
    sync();
    const drawFrame = draw.current;
    return () => {
      cancelFrame();
      video.removeEventListener("timeupdate", drawFrame);
      video.removeEventListener("seeked", drawFrame);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [player, playing, visible, focused, duration]);
  const [minutes, seconds] = time(duration).split(":");
  return <div ref={root} className="tz-video-timeline" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
    <div className="tz-video-time-row">
      <span ref={elapsed} className="tz-time-stack tz-time-elapsed" aria-hidden="true"><span>00</span><span>00</span></span>
      <span className="tz-time-stack tz-time-total" aria-hidden="true"><span>{minutes}</span><span>{seconds}</span></span>
    </div>
    <div className="tz-video-track"><span className="tz-video-track-fill" /></div>
    <input ref={input} aria-label="Seek video" type="range" min="0" max={duration || 1} step="0.01" defaultValue="0"
      onChange={(event) => { player.current.currentTime = Number(event.target.value); draw.current(); }} />
  </div>;
}
