import { useEffect, useRef } from "react";
import { useVideoSource } from "../../shared/performance/videoSources";
import { observePanelActivity } from "./panelActivity";
import "./locationMotion.css";

const PLAY_DELAY = 500;
const LABEL_LEAD_SECONDS = 1.15;

export default function LocationMotion({ host, media, expanded, reduced }) {
  const pakistanSource = useVideoSource(media.pakistan);
  const gpsSource = useVideoSource(media.gps);
  const stage = useRef(null);
  const pakistan = useRef(null);
  const gps = useRef(null);

  useEffect(() => {
    const panel = host.current;
    const layer = stage.current;
    const pakistanVideo = pakistan.current;
    const videos = [pakistanVideo, gps.current].filter(Boolean);
    if (!panel || !layer || !videos.length) return;

    let playTimer = 0;
    let resetTimer = 0;
    let frame = 0;
    let visible = true;
    let x = .5;
    let y = .5;
    let targetX = .5;
    let targetY = .5;

    const pause = () => videos.forEach((video) => video.pause());
    const updateLabel = () => {
      const video = pakistanVideo;
      const nearEnd = video && Number.isFinite(video.duration) && video.duration > 0
        && video.duration - video.currentTime <= LABEL_LEAD_SECONDS;
      layer.dataset.labelVisible = String(Boolean(nearEnd));
    };
    const finishPakistan = () => {
      updateLabel();
      layer.dataset.pakistanEnded = "true";
    };
    const reset = () => {
      layer.dataset.labelVisible = "false";
      layer.dataset.pakistanEnded = "false";
      videos.forEach((video) => {
        try { video.currentTime = 0; } catch { /* metadata is not ready yet */ }
      });
    };
    const paint = () => {
      x += (targetX - x) * .12;
      y += (targetY - y) * .12;
      panel.style.setProperty("--location-x", `${((x - .5) * 2).toFixed(3)}`);
      panel.style.setProperty("--location-y", `${((y - .5) * 2).toFixed(3)}`);
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .002
        ? requestAnimationFrame(paint) : 0;
    };
    const move = (event) => {
      if (!expanded || reduced || event.pointerType !== "mouse") return;
      const bounds = panel.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      targetY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const activate = () => {
      clearTimeout(playTimer);
      clearTimeout(resetTimer);
      layer.dataset.active = "true";
      if (gps.current) gps.current.dataset.active = "true";
      reset();
      if (reduced) return;
      playTimer = window.setTimeout(() => {
        if (!expanded || !visible) return;
        videos.forEach((video, index) => video.play().catch(index === 0 ? pakistanSource.onPlaybackError : gpsSource.onPlaybackError));
      }, PLAY_DELAY);
    };
    const deactivate = () => {
      clearTimeout(playTimer);
      pause();
      layer.dataset.active = "false";
      if (gps.current) gps.current.dataset.active = "false";
      targetX = .5;
      targetY = .5;
      if (!frame && !reduced) frame = requestAnimationFrame(paint);
      resetTimer = window.setTimeout(reset, 720);
    };

    panel.addEventListener("pointermove", move, { passive: true });
    pakistanVideo?.addEventListener("timeupdate", updateLabel);
    pakistanVideo?.addEventListener("ended", finishPakistan);
    const stopActivity = observePanelActivity(panel, (active) => {
      visible = active;
      if (!active) deactivate();
      else if (expanded) activate();
    });
    if (expanded && visible) activate();
    else deactivate();

    return () => {
      clearTimeout(playTimer);
      clearTimeout(resetTimer);
      cancelAnimationFrame(frame);
      pause();
      stopActivity();
      panel.removeEventListener("pointermove", move);
      panel.style.removeProperty("--location-x");
      panel.style.removeProperty("--location-y");
      pakistanVideo?.removeEventListener("timeupdate", updateLabel);
      pakistanVideo?.removeEventListener("ended", finishPakistan);
    };
  }, [expanded, host, reduced, pakistanSource, gpsSource]);

  return (
    <>
      <span ref={stage} className="tz-location-motion" data-active="false" data-pakistan-ended="false" aria-hidden="true">
        <video ref={pakistan} className="tz-location-video tz-location-pakistan"
          src={expanded ? pakistanSource.src : undefined}
          onError={pakistanSource.onError}
          muted playsInline preload="metadata" />
        <span className="tz-location-label">PAKISTAN</span>
      </span>
      <video ref={gps} className="tz-location-video tz-location-gps" data-active="false" aria-hidden="true"
        src={expanded ? gpsSource.src : undefined}
        onError={gpsSource.onError}
        muted playsInline preload="metadata" />
    </>
  );
}
