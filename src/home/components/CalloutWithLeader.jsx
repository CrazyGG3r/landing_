import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useResizeObserver } from '../core/hooks';
import { FONT_TITLE } from '../core/constants';

const CalloutWithLeader = memo(function CalloutWithLeader({
  text,
  targetRect,
}) {
  const calloutRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const sizeRef = useRef({ width: 210, height: 40 });

  const updateSize = useCallback(() => {
    const node = calloutRef.current;
    if (!node) return;
    sizeRef.current = {
      width: node.offsetWidth || 210,
      height: node.offsetHeight || 40,
    };
  }, []);

  const recompute = useCallback(() => {
    if (!calloutRef.current || !targetRect) return;

    const margin = 16;
    const w = sizeRef.current.width || 210;
    const h = sizeRef.current.height || 40;

    const stretch = 128;   // horizontal span of the diagonal leader
    const rise = 34;       // how far the bar floats above the node line
    const elbowGap = 24;   // where the diagonal meets the horizontal rule
    const lineExtend = 46; // how far the rule runs past the bar

    const nodeY = targetRect.top + targetRect.height * 0.5;

    // Prefer the right side; flip left if it would overflow.
    let flipped = false;
    let nodeX = targetRect.right;
    let x = nodeX + stretch;
    if (x + w > window.innerWidth - margin) {
      flipped = true;
      nodeX = targetRect.left;
      x = nodeX - stretch - w;
    }

    x = Math.max(margin, Math.min(x, window.innerWidth - w - margin));

    let baselineY = nodeY - rise;
    baselineY = Math.max(margin + h, Math.min(baselineY, window.innerHeight - margin));
    const y = baselineY - h;

    const elbowX = flipped ? x + w + elbowGap : x - elbowGap;
    const lineEndX = flipped ? x - lineExtend : x + w + lineExtend;
    const path = `M ${nodeX} ${nodeY} L ${elbowX} ${baselineY} L ${lineEndX} ${baselineY}`;

    setLayout({ x, y, w, h, baselineY, nodeX, nodeY, elbowX, lineEndX, path, flipped });
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
      {/* Ringed node + diagonal leader + horizontal rule */}
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
          <linearGradient id="calloutRule" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(150,185,255,0.35)" />
            <stop offset="55%" stopColor="rgba(220,235,255,0.9)" />
            <stop offset="100%" stopColor="rgba(220,235,255,0.15)" />
          </linearGradient>
        </defs>
        {layout && (
          <>
            <motion.path
              key={`callout-path-${layout.x}-${layout.y}`}
              d={layout.path}
              fill="none"
              stroke="url(#calloutRule)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* pulsing halo */}
            <motion.circle
              cx={layout.nodeX}
              cy={layout.nodeY}
              r="6"
              fill="none"
              stroke="rgba(160,198,255,0.6)"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{ transformOrigin: `${layout.nodeX}px ${layout.nodeY}px` }}
            />
            {/* outer ring */}
            <motion.circle
              cx={layout.nodeX}
              cy={layout.nodeY}
              r="6"
              fill="rgba(10,14,22,0.55)"
              stroke="rgba(210,228,255,0.95)"
              strokeWidth="1.4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${layout.nodeX}px ${layout.nodeY}px` }}
            />
            {/* inner dot */}
            <motion.circle
              cx={layout.nodeX}
              cy={layout.nodeY}
              r="2.3"
              fill="rgba(225,238,255,1)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            />
          </>
        )}
      </svg>

      {/* Header bar sitting on the rule */}
      <motion.div
        ref={calloutRef}
        style={{
          position: 'fixed',
          left: layout ? layout.x : -9999,
          top: layout ? layout.y : -9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '11px 22px',
          background: 'linear-gradient(180deg, rgba(26,31,41,0.9), rgba(12,15,21,0.86))',
          border: '1px solid rgba(200,216,255,0.16)',
          borderRadius: '5px',
          backdropFilter: 'blur(12px) saturate(140%)',
          WebkitBackdropFilter: 'blur(12px) saturate(140%)',
          boxShadow: '0 12px 34px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
          pointerEvents: 'none',
          zIndex: 10003,
          transformOrigin: layout?.flipped ? 'right bottom' : 'left bottom',
          opacity: layout ? 1 : 0,
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: layout ? 1 : 0, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* accent hairline along the top edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 10,
          right: 10,
          height: 1,
          background: 'linear-gradient(90deg, rgba(160,198,255,0), rgba(200,224,255,0.6), rgba(160,198,255,0))',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontFamily: FONT_TITLE,
          fontSize: '14px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(246, 249, 255, 0.98)',
          whiteSpace: 'nowrap',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}>
          {text}
        </span>
      </motion.div>
    </>
  );
});

export default CalloutWithLeader;
