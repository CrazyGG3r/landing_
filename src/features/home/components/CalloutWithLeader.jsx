import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useResizeObserver } from '../core/hooks';
import { FONT_SUBTITLE } from '../core/constants';

const CORNER_SIZE = 13;
const CORNER_BORDER = '1.5px solid rgba(205,224,255,0.92)';

const CORNERS = [
  { key: 'tl', pos: { top: -1, left: -1, borderTop: CORNER_BORDER, borderLeft: CORNER_BORDER }, from: { x: -5, y: -5 } },
  { key: 'tr', pos: { top: -1, right: -1, borderTop: CORNER_BORDER, borderRight: CORNER_BORDER }, from: { x: 5, y: -5 } },
  { key: 'bl', pos: { bottom: -1, left: -1, borderBottom: CORNER_BORDER, borderLeft: CORNER_BORDER }, from: { x: -5, y: 5 } },
  { key: 'br', pos: { bottom: -1, right: -1, borderBottom: CORNER_BORDER, borderRight: CORNER_BORDER }, from: { x: 5, y: 5 } },
];

const CalloutWithLeader = memo(function CalloutWithLeader({
  text,
  targetRect,
}) {
  const calloutRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const sizeRef = useRef({ width: 200, height: 44 });

  const updateSize = useCallback(() => {
    const node = calloutRef.current;
    if (!node) return;
    sizeRef.current = {
      width: node.offsetWidth || 200,
      height: node.offsetHeight || 44,
    };
  }, []);

  const recompute = useCallback(() => {
    if (!calloutRef.current || !targetRect) return;

    const margin = 16;
    const w = sizeRef.current.width || 200;
    const h = sizeRef.current.height || 44;

    const leaderStretch = 84;
    let x = targetRect.right + 24 + leaderStretch;
    let y = targetRect.top - h * 0.5;
    let flipped = false;

    if (x + w > window.innerWidth - margin) {
      x = targetRect.left - w - 24 - leaderStretch;
      flipped = true;
    }

    x = Math.max(margin, Math.min(x, window.innerWidth - w - margin));
    y = Math.max(margin, Math.min(y, window.innerHeight - h - margin));

    const anchorX = flipped ? targetRect.left : targetRect.right;
    const anchorY = targetRect.top + Math.min(18, targetRect.height * 0.2);
    const tipOffset = 7;
    const endX = flipped ? x + w + tipOffset : x - tipOffset;
    const endY = y + h * 0.5;
    const elbowX = anchorX + (endX - anchorX) * 0.8;
    const path = `M ${anchorX} ${anchorY} L ${elbowX} ${anchorY} L ${elbowX} ${endY} L ${endX} ${endY}`;

    setLayout({ x, y, path, anchorX, anchorY, endX, endY, flipped });
  }, [targetRect]);

  useEffect(() => {
    if (!targetRect) return undefined;
    updateSize();
    const raf = requestAnimationFrame(recompute);
    window.addEventListener('resize', recompute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', recompute);
    };
  }, [targetRect, recompute, updateSize]);

  useResizeObserver(calloutRef, () => {
    updateSize();
    if (targetRect) recompute();
  });

  return (
    <>
      {/* Slim elbow leader + ringed node at the reticle */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10002,
        }}
      >
        <defs>
          <linearGradient id="calloutLeader" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(150,185,255,0.15)" />
            <stop offset="40%" stopColor="rgba(180,208,255,0.65)" />
            <stop offset="100%" stopColor="rgba(220,235,255,0.9)" />
          </linearGradient>
        </defs>
        {layout && (
          <>
            <Motion.path
              key={`callout-path-${layout.x}-${layout.y}`}
              d={layout.path}
              fill="none"
              stroke="url(#calloutLeader)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* breathing halo */}
            <Motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="5"
              fill="none"
              stroke="rgba(160,198,255,0.55)"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: `${layout.anchorX}px ${layout.anchorY}px` }}
            />
            {/* ring */}
            <Motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="5"
              fill="rgba(10,14,22,0.5)"
              stroke="rgba(210,228,255,0.95)"
              strokeWidth="1.2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${layout.anchorX}px ${layout.anchorY}px` }}
            />
            {/* dot */}
            <Motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="1.9"
              fill="rgba(225,238,255,1)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            />
          </>
        )}
      </svg>

      {/* HUD corner-frame label — no box, just brackets over a soft backlight */}
      <Motion.div
        ref={calloutRef}
        style={{
          position: 'fixed',
          left: layout ? layout.x : -9999,
          top: layout ? layout.y : -9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '13px 22px',
          pointerEvents: 'none',
          zIndex: 10003,
          filter: 'drop-shadow(0 0 7px rgba(120,160,255,0.22))',
          opacity: layout ? 1 : 0,
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: layout ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* soft edgeless backlight for legibility over the scene */}
        <div style={{
          position: 'absolute',
          inset: '-8px -14px',
          background: 'radial-gradient(ellipse at center, rgba(26,42,74,0.5) 0%, rgba(10,15,26,0) 72%)',
          filter: 'blur(7px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {CORNERS.map((c, i) => (
          <Motion.span
            key={c.key}
            style={{
              position: 'absolute',
              width: CORNER_SIZE,
              height: CORNER_SIZE,
              ...c.pos,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, x: c.from.x, y: c.from.y }}
            animate={{ opacity: layout ? 1 : 0, x: 0, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        <span style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: FONT_SUBTITLE,
          fontSize: '13px',
          fontWeight: 200,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(244, 248, 255, 0.96)',
          whiteSpace: 'nowrap',
          paddingLeft: '0.15em',
          textShadow: '0 0 16px rgba(120,160,255,0.4), 0 2px 6px rgba(0,0,0,0.7)',
        }}>
          {text}
        </span>
      </Motion.div>
    </>
  );
});

export default CalloutWithLeader;
