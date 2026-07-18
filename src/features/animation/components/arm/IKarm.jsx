/**
 * IKArm.jsx
 * ─────────────────────────────────────────────────────────────────
 * A 2-segment IK arm.
 * • Shoulder anchored to bottom edge, slides freely left/right
 * • Total arm length = distance from bottom-right corner to screen centre
 * • Upper arm + forearm each = half that total (no stretch)
 * • Hand follows the mouse via 2-bone IK (law of cosines)
 * • Paper-cut aesthetic — flat shapes, drop shadows, layered depth
 *
 * Props:
 *   corner         'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
 *   flip           1 = elbow bends toward screen, -1 = away
 *   zIndex
 *   upperArmColor / forearmColor / jointColor / handColor / shadowColor
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from 'react';

// ── 2-bone IK solver (law of cosines) ─────────────────────────────
function solveIK(sx, sy, tx, ty, l1, l2, flip) {
  const dx   = tx - sx;
  const dy   = ty - sy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

  // Clamp hand within reach
  const reach = Math.min(dist, l1 + l2 - 1);
  const rx    = sx + (dx / dist) * reach;
  const ry    = sy + (dy / dist) * reach;
  const rdx   = rx - sx;
  const rdy   = ry - sy;
  const rd    = Math.sqrt(rdx * rdx + rdy * rdy) || 0.001;

  const cosA = (l1 * l1 + rd * rd - l2 * l2) / (2 * l1 * rd);
  const a    = Math.acos(Math.max(-1, Math.min(1, cosA)));

  const base  = Math.atan2(rdy, rdx);
  const eAngle = base + flip * a;

  return {
    ex: sx + Math.cos(eAngle) * l1,
    ey: sy + Math.sin(eAngle) * l1,
    hx: rx,
    hy: ry,
  };
}

// ── Tapered quad segment ───────────────────────────────────────────
function Segment({ x1, y1, x2, y2, w1, w2, fill, shadow }) {
  const dx  = x2 - x1;
  const dy  = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx  = -dy / len;
  const ny  =  dx / len;

  const pts = [
    `${x1 + nx * w1},${y1 + ny * w1}`,
    `${x2 + nx * w2},${y2 + ny * w2}`,
    `${x2 - nx * w2},${y2 - ny * w2}`,
    `${x1 - nx * w1},${y1 - ny * w1}`,
  ].join(' ');

  return (
    <g>
      <polygon points={pts} fill={shadow}
        transform="translate(5,7)" opacity={0.28}
        style={{ filter: 'blur(7px)' }} />
      <polygon points={pts} fill={fill} />
      <polygon points={pts} fill="none"
        stroke="rgba(255,255,255,0.07)" strokeWidth={1.5} />
    </g>
  );
}

// ── Joint ──────────────────────────────────────────────────────────
function Joint({ x, y, r, fill, shadow }) {
  return (
    <g>
      <circle cx={x + 4} cy={y + 6} r={r}
        fill={shadow} opacity={0.25}
        style={{ filter: 'blur(5px)' }} />
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x - r * 0.25} cy={y - r * 0.25}
        r={r * 0.38} fill="rgba(255,255,255,0.18)" />
    </g>
  );
}

// ── Hand (simple palm silhouette) ──────────────────────────────────
function Hand({ x, y, angle, size, fill, shadow }) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const tr = ([px, py]) => `${px * c - py * s + x},${px * s + py * c + y}`;

  const palm = [
    [0,          -size * 0.38],
    [size * 0.52, -size * 0.18],
    [size * 0.68,  size * 0.22],
    [size * 0.38,  size * 0.58],
    [-size * 0.38, size * 0.58],
    [-size * 0.68, size * 0.22],
    [-size * 0.52, -size * 0.18],
  ].map(tr).join(' ');

  return (
    <g>
      <polygon points={palm} fill={shadow}
        transform="translate(5,7)" opacity={0.25}
        style={{ filter: 'blur(6px)' }} />
      <polygon points={palm} fill={fill} />
      <polygon points={palm} fill="none"
        stroke="rgba(255,255,255,0.08)" strokeWidth={1.2} />
    </g>
  );
}

// ── Main ───────────────────────────────────────────────────────────
export default function IKArm({
  corner        = 'bottom-right',
  flip          = -1,
  zIndex        = 5,
  upperArmColor = '#c8a882',
  forearmColor  = '#a8805a',
  jointColor    = '#e2c090',
  handColor     = '#d4a870',
  shadowColor   = '#1a0800',
}) {
  const mouseRef       = useRef({ x: window.innerWidth / 2,   y: window.innerHeight / 2 });
  const smoothMouse    = useRef({ x: window.innerWidth / 2,   y: window.innerHeight / 2 });
  const smoothShoulder = useRef({ x: window.innerWidth * 0.8, y: window.innerHeight });
  const rafRef         = useRef(null);

  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [ik, setIk] = useState(null);

  // Arm total length = corner → centre
  const getArmLen = useCallback((w, h) => {
    const corners = {
      'bottom-right': [w, h],
      'bottom-left':  [0, h],
      'top-right':    [w, 0],
      'top-left':     [0, 0],
    };
    const [cx, cy] = corners[corner];
    return Math.sqrt((w / 2 - cx) ** 2 + (h / 2 - cy) ** 2);
  }, [corner]);

  // Shoulder slides along the nearest edge
  const getEdge = useCallback((w, h) => {
    if (corner === 'bottom-right' || corner === 'bottom-left')
      return { fixedY: h, minX: 0, maxX: w };
    return { fixedY: 0, minX: 0, maxX: w };
  }, [corner]);

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const { w, h }  = vp;
    const totalLen  = getArmLen(w, h);
    const l1        = totalLen * 0.5;
    const l2        = totalLen * 0.5;
    const edge      = getEdge(w, h);
    const thickness = Math.max(16, totalLen * 0.042);

    const LMOUSE = 0.11;
    const LSHLD  = 0.07;

    const tick = () => {
      // Smooth mouse
      smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * LMOUSE;
      smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * LMOUSE;

      const tx = smoothMouse.current.x;
      const ty = smoothMouse.current.y;

      // Shoulder tracks mouse X along the bottom edge
      const targetShoulderX = Math.max(edge.minX, Math.min(edge.maxX, tx));
      smoothShoulder.current.x += (targetShoulderX   - smoothShoulder.current.x) * LSHLD;
      smoothShoulder.current.y += (edge.fixedY        - smoothShoulder.current.y) * LSHLD;

      const sx = smoothShoulder.current.x;
      const sy = smoothShoulder.current.y;

      const { ex, ey, hx, hy } = solveIK(sx, sy, tx, ty, l1, l2, flip);

      const handAngle = Math.atan2(hy - ey, hx - ex) + Math.PI / 2;

      setIk({ sx, sy, ex, ey, hx, hy, handAngle, thickness });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [vp, flip, getArmLen, getEdge]);

  if (!ik) return null;

  const t = ik.thickness;

  return (
    <svg
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex, pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Upper arm — shoulder → elbow */}
      <Segment
        x1={ik.sx} y1={ik.sy}
        x2={ik.ex} y2={ik.ey}
        w1={t * 0.58} w2={t * 0.5}
        fill={upperArmColor} shadow={shadowColor}
      />

      {/* Forearm — elbow → hand */}
      <Segment
        x1={ik.ex} y1={ik.ey}
        x2={ik.hx} y2={ik.hy}
        w1={t * 0.46} w2={t * 0.3}
        fill={forearmColor} shadow={shadowColor}
      />

      {/* Shoulder */}
      <Joint x={ik.sx} y={ik.sy} r={t * 0.62}
        fill={jointColor} shadow={shadowColor} />

      {/* Elbow */}
      <Joint x={ik.ex} y={ik.ey} r={t * 0.5}
        fill={jointColor} shadow={shadowColor} />

      {/* Hand */}
      <Hand
        x={ik.hx} y={ik.hy}
        angle={ik.handAngle}
        size={t * 1.5}
        fill={handColor} shadow={shadowColor}
      />
    </svg>
  );
}