import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useResizeObserver } from '../core/hooks';
import { FONT_SUBTITLE } from '../core/constants';

const CalloutWithLeader = memo(function CalloutWithLeader({
  text,
  targetRect,
}) {
  const calloutRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const sizeRef = useRef({ width: 200, height: 34 });

  const updateSize = useCallback(() => {
    const node = calloutRef.current;
    if (!node) return;
    sizeRef.current = {
      width: node.offsetWidth || 200,
      height: node.offsetHeight || 34,
    };
  }, []);

  const recompute = useCallback(() => {
    if (!calloutRef.current || !targetRect) return;

    const margin = 16;
    const calloutWidth = sizeRef.current.width || 200;
    const calloutHeight = sizeRef.current.height || 34;

    const leaderStretch = 96;
    let x = targetRect.right + 26 + leaderStretch;
    let y = targetRect.top - calloutHeight * 0.5;
    let flipped = false;

    if (x + calloutWidth > window.innerWidth - margin) {
      x = targetRect.left - calloutWidth - 26 - leaderStretch;
      flipped = true;
    }

    x = Math.max(margin, Math.min(x, window.innerWidth - calloutWidth - margin));
    y = Math.max(margin, Math.min(y, window.innerHeight - calloutHeight - margin));

    const anchorX = flipped ? targetRect.left : targetRect.right;
    const anchorY = targetRect.top + Math.min(18, targetRect.height * 0.2);
    const tipOffset = 8;
    const endX = flipped ? x + calloutWidth + tipOffset : x - tipOffset;
    const endY = y + calloutHeight * 0.5;
    const elbowX = anchorX + (endX - anchorX) * 0.82;
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

  const alignEnd = layout?.flipped;

  return (
    <>
      {/* Hairline leader — ties the floating caption back to the reticle */}
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
            <stop offset="0%" stopColor="rgba(150,185,255,0.0)" />
            <stop offset="18%" stopColor="rgba(160,195,255,0.55)" />
            <stop offset="100%" stopColor="rgba(225,238,255,0.85)" />
          </linearGradient>
        </defs>
        {layout && (
          <>
            <motion.path
              key={`callout-path-${layout.x}-${layout.y}`}
              d={layout.path}
              fill="none"
              stroke="url(#calloutLeader)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* pinned node + breathing halo at the reticle */}
            <motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="2.2"
              fill="rgba(200,222,255,0.95)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.04 }}
            />
            <motion.circle
              cx={layout.anchorX}
              cy={layout.anchorY}
              r="2.2"
              fill="none"
              stroke="rgba(160,195,255,0.6)"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 3.4, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          </>
        )}
      </svg>

      {/* Boxless caption — floats over the scene like the rest of the type */}
      <motion.div
        ref={calloutRef}
        style={{
          position: 'fixed',
          left: layout ? layout.x : -9999,
          top: layout ? layout.y : -9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignEnd ? 'flex-end' : 'flex-start',
          gap: 8,
          pointerEvents: 'none',
          zIndex: 10003,
          opacity: layout ? 1 : 0,
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 0, x: alignEnd ? 8 : -8 }}
        animate={{ opacity: layout ? 1 : 0, x: 0 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: alignEnd ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: 12,
        }}>
          {/* soft backlit glow — light, not a container */}
          <div style={{
            position: 'absolute',
            inset: '-14px -22px',
            background: 'radial-gradient(ellipse at center, rgba(40,64,112,0.42) 0%, rgba(12,18,32,0) 72%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* live indicator */}
          <span style={{
            position: 'relative',
            zIndex: 1,
            width: 5,
            height: 5,
            flex: '0 0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.span
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '1px solid rgba(160,198,255,0.7)',
              }}
              animate={{ scale: [1, 2.3], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'rgba(200,222,255,1)',
                boxShadow: '0 0 9px rgba(170,205,255,0.95)',
              }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>

          <span style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: FONT_SUBTITLE,
            fontSize: '13px',
            fontWeight: 200,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: 'rgba(244, 248, 255, 0.96)',
            textShadow: '0 0 18px rgba(120,160,255,0.45), 0 2px 8px rgba(0,0,0,0.7)',
            paddingLeft: alignEnd ? 0 : 1,
            paddingRight: alignEnd ? 1 : 0,
          }}>
            {text}
          </span>
        </div>

        {/* underline that draws in beneath the caption */}
        <motion.div
          style={{
            width: '100%',
            height: 1,
            transformOrigin: alignEnd ? 'right center' : 'left center',
            background: alignEnd
              ? 'linear-gradient(90deg, rgba(225,238,255,0.75), rgba(150,185,255,0.35), rgba(150,185,255,0))'
              : 'linear-gradient(90deg, rgba(150,185,255,0), rgba(150,185,255,0.35), rgba(225,238,255,0.75))',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </>
  );
});

export default CalloutWithLeader;
