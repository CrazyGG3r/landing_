import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useResizeObserver } from '../core/hooks';
import { FONT_LETTERBOX_TITLE } from '../core/constants';

const CalloutWithLeader = memo(function CalloutWithLeader({
  text,
  targetRect,
}) {
  const calloutRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const sizeRef = useRef({ width: 220, height: 48 });
  const overlayStyle = useMemo(() => ({
    position: 'absolute',
    inset: 0,
    borderRadius: '10px',
    background: 'linear-gradient(120deg, rgba(120,160,255,0.18), rgba(255,255,255,0))',
    pointerEvents: 'none',
    opacity: 0.8,
  }), []);
  const topLineStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    height: 1,
    background: 'linear-gradient(90deg, rgba(140,180,255,0.0), rgba(160,200,255,0.8), rgba(140,180,255,0.0))',
    opacity: 0.7,
  }), []);

  const updateSize = useCallback(() => {
    const node = calloutRef.current;
    if (!node) return;
    sizeRef.current = {
      width: node.offsetWidth || 220,
      height: node.offsetHeight || 48,
    };
  }, []);

  const recompute = useCallback(() => {
    if (!calloutRef.current || !targetRect) return;

    const margin = 16;
    const calloutWidth = sizeRef.current.width || 220;
    const calloutHeight = sizeRef.current.height || 48;

    const leaderStretch = 90;
    let x = targetRect.right + 24 + leaderStretch;
    let y = targetRect.top - calloutHeight * 0.6;
    let flipped = false;

    if (x + calloutWidth > window.innerWidth - margin) {
      x = targetRect.left - calloutWidth - 24 - leaderStretch;
      flipped = true;
    }

    x = Math.max(margin, Math.min(x, window.innerWidth - calloutWidth - margin));
    y = Math.max(margin, Math.min(y, window.innerHeight - calloutHeight - margin));

    const anchorX = flipped ? targetRect.left : targetRect.right;
    const anchorY = targetRect.top + Math.min(18, targetRect.height * 0.2);
    const tipOffset = 6;
    const endX = flipped ? x + calloutWidth + tipOffset : x - tipOffset;
    const endY = y + calloutHeight * 0.5;
    const elbowX = anchorX + (endX - anchorX) * 0.78;
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
          <linearGradient id="calloutGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(120,160,255,0.9)" />
            <stop offset="100%" stopColor="rgba(220,240,255,0.8)" />
          </linearGradient>
          <filter id="calloutGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {layout && (
          <>
            <motion.path
              key={`callout-path-${layout.x}-${layout.y}`}
              d={layout.path}
              fill="none"
              stroke="url(#calloutGradient)"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="url(#calloutGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="3"
              fill="rgba(200,220,255,0.9)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.06 }}
            />
            <motion.circle
              cx={layout.endX}
              cy={layout.endY}
              r="2.4"
              fill="rgba(255,255,255,0.9)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.18 }}
            />
          </>
        )}
      </svg>
      <motion.div
        ref={calloutRef}
        style={{
          position: 'fixed',
          left: layout ? layout.x : -9999,
          top: layout ? layout.y : -9999,
          padding: '12px 22px',
          background: 'linear-gradient(160deg, rgba(20,26,36,0.82), rgba(10,12,18,0.7))',
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          border: '1px solid rgba(180, 200, 255, 0.25)',
          borderRadius: '10px',
          color: 'rgba(245, 248, 255, 0.96)',
          fontSize: '12px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: FONT_LETTERBOX_TITLE,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10003,
          boxShadow: '0 12px 32px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)',
          transformOrigin: layout?.flipped ? 'right center' : 'left center',
          opacity: layout ? 1 : 0,
          textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: layout ? 1 : 0, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={overlayStyle} />
        <div style={topLineStyle} />
        <div style={{
          position: 'absolute',
          left: layout?.flipped ? 'auto' : -6,
          right: layout?.flipped ? -6 : 'auto',
          top: '50%',
          width: 10,
          height: 10,
          transform: 'translateY(-50%) rotate(45deg)',
          background: 'rgba(12,16,24,0.95)',
          border: '1px solid rgba(180, 200, 255, 0.25)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
        }} />
        <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
      </motion.div>
    </>
  );
});

export default CalloutWithLeader;
