/**
 * PaperFish.jsx
 * ─────────────────────────────────────────────────────────────────
 * Fish swim in evenly spaced horizontal lanes so they never overlap.
 * Single canvas, all fish drawn in one rAF loop.
 * Images fully preloaded before animation starts.
 *
 * Props:
 *   frameCount  — total frames in sequence           (default 18)
 *   framePath   — public path prefix                 (default '/anims/fish/fish_')
 *   frameExt    — file extension                     (default 'png')
 *   framePad    — zero-pad digits, 3 = fish_001.png  (default 3)
 *   fps         — playback speed                     (default 12)
 *   fishCount   — simultaneous fish / lane count     (default 5)
 *   zIndex      — CSS z-index                        (default 3)
 */

import { useEffect, useRef } from 'react';

const pad = (n, d) => String(n).padStart(d, '0');
const rnd = (a, b) => Math.random() * (b - a) + a;

/**
 * Each fish owns a fixed horizontal lane.
 * laneIndex   — which lane (0 … fishCount-1)
 * laneCount   — total lanes = fishCount
 * vpH         — viewport height
 *
 * Lane centre = top margin + (laneIndex + 0.5) * laneHeight
 * waveAmp is capped to half the lane height so fish never
 * drift into the neighbouring lane.
 */
function makeFish(laneIndex, laneCount, vpW, vpH) {
  const topMargin    = vpH * 0.08;
  const bottomMargin = vpH * 0.08;
  const usableH      = vpH - topMargin - bottomMargin;
  const laneH        = usableH / laneCount;
  const laneCentreY  = topMargin + (laneIndex + 0.5) * laneH;
  const maxWaveAmp   = laneH * 0.38;   // stays inside the lane

  const goRight = Math.random() < 0.5;

  return {
    x:          goRight ? -250 : vpW + 250,
    baseY:      laneCentreY,
    y:          laneCentreY,
    speed:      rnd(0.5, 1.2) * (goRight ? 1 : -1),
    scale:      rnd(0.18, 0.42),
    waveAmp:    rnd(6, maxWaveAmp),
    waveFreq:   rnd(0.0008, 0.002),
    waveOffset: rnd(0, Math.PI * 2),
    opacity:    rnd(0.65, 1.0),
    frameOff:   Math.floor(rnd(0, 1000)),
    // stagger entry: spread fish across time so screen isn't empty at start
    delay:      laneIndex * rnd(400, 900),
    goRight,
    born:       null,
    laneIndex,
  };
}

export default function PaperFish({
  frameCount  = 18,
  framePath   = '/anims/fish/fish_',
  frameExt    = 'png',
  framePad    = 3,
  fps         = 12,
  fishCount   = 5,
  zIndex      = 3,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    canvas.width  = vpW;
    canvas.height = vpH;
    const ctx = canvas.getContext('2d');

    // ── 1. Preload all frames ───────────────────────────────────────
    let loaded = 0;
    const frames = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${framePath}${pad(i, framePad)}.${frameExt}`;
      img.onload  = () => { loaded++; };
      img.onerror = () => { loaded++; console.warn('PaperFish: missing frame', img.src); };
      frames.push(img);
    }

    // ── 2. One fish per lane ────────────────────────────────────────
    const pool = Array.from({ length: fishCount }, (_, i) =>
      makeFish(i, fishCount, vpW, vpH)
    );

    // ── 3. rAF draw loop ────────────────────────────────────────────
    let rafId;

    const loop = (t) => {
      rafId = requestAnimationFrame(loop);
      if (loaded < frameCount) return;   // stall until all images ready

      ctx.clearRect(0, 0, vpW, vpH);

      const msPerFrame = 1000 / fps;
      const totalMs    = frameCount * msPerFrame;

      for (const f of pool) {
        // Entry delay
        if (f.born === null) {
          if (t >= f.delay) f.born = t;
          else continue;
        }

        const elapsed = t - f.born;

        // Which animation frame
        const frameIdx = Math.floor(((elapsed + f.frameOff * 41) % totalMs) / msPerFrame) % frameCount;
        const img = frames[frameIdx];
        if (!img?.complete || !img.naturalWidth) continue;

        // Move
        f.x += f.speed;
        f.y  = f.baseY + Math.sin(elapsed * f.waveFreq + f.waveOffset) * f.waveAmp;

        const w = img.naturalWidth  * f.scale;
        const h = img.naturalHeight * f.scale;

        // Off-screen → respawn in same lane, opposite side
        if ((f.goRight && f.x > vpW + w) || (!f.goRight && f.x < -w)) {
          const fresh   = makeFish(f.laneIndex, fishCount, vpW, vpH);
          fresh.delay   = 0;
          fresh.born    = t;
          Object.assign(f, fresh);
          continue;
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.translate(f.x, f.y);
        if (!f.goRight) ctx.scale(-1, 1);   // face direction of travel
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [frameCount, framePath, frameExt, framePad, fps, fishCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        pointerEvents: 'none',
      }}
    />
  );
}