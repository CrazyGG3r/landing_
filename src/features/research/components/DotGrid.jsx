import { useRef, useCallback, useEffect, useMemo } from "react";
import { T } from "../constants/designTokens.js";
import { hexToRgb } from "../utils/colorUtils.js";
import { useResizeObserver } from "../hooks/useResizeObserver.js";
import { useMobileDetect } from "../hooks/useMobileDetect.js";

const RIPPLE_SPEED = 4;
const TRAIL_FLOOR = 0.0025;
const TRAIL_DECAY = Math.pow(TRAIL_FLOOR, 1 / 130);
const TRAIL_GAMMA = 1 / 2.2;
const TRAIL_SOFTEN = 1.45;

const TRAIL_LUT = new Float32Array(256);
for (let i = 0; i < 256; i++) TRAIL_LUT[i] = Math.pow(i / 255, TRAIL_GAMMA);

export const DotGrid = ({
  dotSize = T.dotSize,
  gap = T.dotGap,
  baseColor = T.dotBase,
  activeColor = T.dotActive,
  proximity = T.physics.proximity,
  speedTrigger = T.physics.speedTrigger,
  shockRadius = T.physics.shockRadius,
  shockStrength = T.physics.shockStrength,
  maxSpeed = T.physics.maxSpeed,
  resistance = T.physics.damping,
  returnDuration = T.physics.returnDuration
}) => {
  const { isMobile } = useMobileDetect();

  const effectiveDotSize = isMobile ? T.mobile.dotSize : dotSize;
  const effectiveGap = isMobile ? T.mobile.dotGap : gap;
  const effectiveProximity = isMobile ? T.mobile.physics.proximity : proximity;
  const effectiveSpeedTrigger = isMobile ? T.mobile.physics.speedTrigger : speedTrigger;
  const effectiveShockRadius = isMobile ? T.mobile.physics.shockRadius : shockRadius;
  const effectiveShockStrength = isMobile ? T.mobile.physics.shockStrength : shockStrength;
  const effectiveMaxSpeed = isMobile ? T.mobile.physics.maxSpeed : maxSpeed;
  const effectiveResistance = isMobile ? T.mobile.physics.damping : resistance;
  const effectiveReturnDuration = isMobile ? T.mobile.physics.returnDuration : returnDuration;

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const ripplesRef = useRef([]);
  const pointerRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, lastTime: 0, lastX: 0, lastY: 0 });
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    const p = new Path2D(); p.arc(0, 0, effectiveDotSize / 2, 0, Math.PI * 2); return p;
  }, [effectiveDotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = isMobile ? 1 : (window.devicePixelRatio || 1);
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cell = effectiveDotSize + effectiveGap;
    const cols = Math.floor((width + effectiveGap) / cell);
    const rows = Math.floor((height + effectiveGap) / cell);
    const startX = (width - (cols * cell - effectiveGap)) / 2 + effectiveDotSize / 2;
    const startY = (height - (rows * cell - effectiveGap)) / 2 + effectiveDotSize / 2;
    const dots = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
      dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, vx: 0, vy: 0, active: false, trail: 0 });
    dotsRef.current = dots;
    ripplesRef.current = [];
  }, [effectiveDotSize, effectiveGap, isMobile]);

  useEffect(() => {
    const DAMPING = 1 - (1 / effectiveResistance) * 16;
    const RETURN = 1 / (effectiveReturnDuration * 60);
    const proxSq = effectiveProximity * effectiveProximity;
    let rafId;
    let lastFrameTime = 0;

    const loop = (timestamp) => {
      const canvas = canvasRef.current; if (!canvas) { rafId = requestAnimationFrame(loop); return; }
      const ctx = canvas.getContext("2d"); if (!ctx) { rafId = requestAnimationFrame(loop); return; }

      const shouldUpdatePhysics = !isMobile || (timestamp - lastFrameTime > 16);

      if (shouldUpdatePhysics) {
        lastFrameTime = timestamp;

        const ripples = ripplesRef.current;
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += RIPPLE_SPEED;
          const band = RIPPLE_SPEED * 1.5;
          for (const dot of dotsRef.current) {
            const dist = Math.hypot(dot.cx - r.cx, dot.cy - r.cy);
            if (dist >= r.radius - band && dist <= r.radius) {
              const falloff = Math.max(0, 1 - dist / r.maxRadius);
              dot.active = true;
              dot.trail = Math.min(1, dot.trail + falloff * 0.9);
              dot.vx = (dot.cx - r.cx) / Math.max(dist, 1) * r.strength * falloff;
              dot.vy = (dot.cy - r.cy) / Math.max(dist, 1) * r.strength * falloff;
            }
          }
          if (r.radius > r.maxRadius) ripples.splice(i, 1);
        }

        for (const dot of dotsRef.current) {
          if (dot.active) {
            dot.vx *= DAMPING; dot.vy *= DAMPING;
            dot.xOffset += dot.vx * 0.016; dot.yOffset += dot.vy * 0.016;
            dot.xOffset += -dot.xOffset * RETURN * 60;
            dot.yOffset += -dot.yOffset * RETURN * 60;
            if (Math.abs(dot.xOffset) < 0.1 && Math.abs(dot.yOffset) < 0.1 && Math.abs(dot.vx) < 0.1 && Math.abs(dot.vy) < 0.1) {
              dot.xOffset = 0; dot.yOffset = 0; dot.vx = 0; dot.vy = 0; dot.active = false;
            }
          }
          if (dot.trail > 0) {
            dot.trail *= TRAIL_DECAY;
            if (dot.trail < TRAIL_FLOOR) dot.trail = 0;
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset, oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px, dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let t = dot.trail > 0 ? TRAIL_LUT[Math.round(dot.trail * 255)] : 0;

        if (dsq <= proxSq) {
          const linear = 1 - Math.sqrt(dsq) / effectiveProximity;
          const eased = 1 - Math.pow(1 - linear, 2.4);
          if (eased > t) t = eased;
          dot.trail = Math.max(dot.trail, eased * 0.75);
        }

        if (t <= 0) {
          ctx.save();
          ctx.translate(dot.cx, dot.cy);
          ctx.fillStyle = baseColor;
          ctx.fill(circlePath);
          ctx.restore();
          continue;
        }

        const softT = Math.pow(t * t * (3 - 2 * t), TRAIL_SOFTEN);
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * softT);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * softT);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * softT);

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [effectiveResistance, effectiveReturnDuration, effectiveProximity, baseColor, baseRgb, activeRgb, circlePath, isMobile]);

  useResizeObserver(wrapperRef, buildGrid);
  useEffect(() => { buildGrid(); }, [buildGrid]);

  useEffect(() => {
    const el = wrapperRef.current; if (!el) return;

    const onMove = e => {
      const now = performance.now(), pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      let vx = (e.clientX - pr.lastX) / dt * 1000, vy = (e.clientY - pr.lastY) / dt * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > effectiveMaxSpeed) { const s = effectiveMaxSpeed / speed; vx *= s; vy *= s; speed = effectiveMaxSpeed; }
      pr.lastTime = now; pr.lastX = e.clientX; pr.lastY = e.clientY; pr.vx = vx; pr.vy = vy; pr.speed = speed;
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      pr.x = e.clientX - rect.left; pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (dist >= effectiveProximity) continue;

        const proximityGain = Math.max(0, 1 - dist / effectiveProximity);
        dot.trail = Math.min(1, dot.trail + proximityGain * 0.1);

        if (speed > effectiveSpeedTrigger && !dot.active) {
          dot.active = true;
          dot.trail = Math.min(1, dot.trail + 0.45 * proximityGain);
          dot.vx = (dot.cx - pr.x) * 0.3 + vx * 0.08;
          dot.vy = (dot.cy - pr.y) * 0.3 + vy * 0.08;
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      ripplesRef.current.push({
        cx: e.clientX - rect.left,
        cy: e.clientY - rect.top,
        radius: 0,
        maxRadius: effectiveShockRadius,
        strength: effectiveShockStrength * 18,
      });
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        onMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        onClick({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("click", onClick);

    if (isMobile) {
      el.addEventListener("touchmove", onTouchMove, { passive: false });
      el.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      if (isMobile) {
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, [effectiveMaxSpeed, effectiveSpeedTrigger, effectiveProximity, effectiveShockRadius, effectiveShockStrength, isMobile]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0, touchAction: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
    </div>
  );
};