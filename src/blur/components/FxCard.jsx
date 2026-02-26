import { useEffect, useRef, useState } from 'react';
import { Portal } from './Portal.jsx';
import { T } from '../styles/tokens.js';
import { ArcSlider } from './ArcSlider.jsx';
import { PillToggle } from './PillToggle.jsx';

export function FxCard({ label, accentColor, enabled, intensity, onToggle, onIntensity, anchorRef, onClose }) {
  const cardRef = useRef();
  const [sty, setSty] = useState({ opacity: 0, transform: 'translate(-50%,-100%) scale(0.95)' });

  useEffect(() => {
    const place = () => {
      if (!anchorRef.current || !cardRef.current) return;
      const r = anchorRef.current.getBoundingClientRect();
      cardRef.current.style.top = `${r.top - 12}px`;
      cardRef.current.style.left = `${r.left + r.width / 2}px`;
    };
    place();
    requestAnimationFrame(() => setSty({ opacity: 1, transform: 'translate(-50%,-100%) scale(1)' }));
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [anchorRef]);

  useEffect(() => {
    const handleOutsideClick = e => {
      if (cardRef.current?.contains(e.target)) return;
      if (anchorRef.current?.contains(e.target)) return;
      onClose();
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [onClose, anchorRef]);

  return (
    <Portal>
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: sty.transform,
          opacity: sty.opacity,
          transition: 'opacity 0.18s ease, transform 0.22s cubic-bezier(0.34,1.1,0.64,1)',
          width: 260,
          pointerEvents: 'all',
          background: T.surface,
          border: `1px solid ${T.borderHi}`,
          borderRadius: T.radius.xl,
          overflow: 'hidden',
          boxShadow: `0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 1px 0 rgba(255,255,255,0.07) inset`,
          touchAction: 'auto',
        }}
      >
        <div style={{
          height: 2,
          background: `linear-gradient(90deg,transparent 0%,${accentColor} 40%,${accentColor}88 70%,transparent 100%)`
        }} />
        
        <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accentColor,
                boxShadow: `0 0 10px ${accentColor}66`,
                flexShrink: 0
              }} />
              <div>
                <div style={{
                  color: T.textPri,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>{label}</div>
                <div style={{
                  color: enabled ? accentColor : T.textSec,
                  fontSize: 10,
                  marginTop: 1,
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}>{enabled ? 'Active' : 'Off'}</div>
              </div>
            </div>
            <PillToggle enabled={enabled} onToggle={onToggle} color={accentColor} />
          </div>
          
          <div style={{ height: 1, background: T.border, margin: '0 -16px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{
                color: T.textSec,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>Intensity</span>
              <span style={{
                color: enabled ? accentColor : T.textDim,
                fontSize: 12,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                transition: 'color 0.2s'
              }}>
                {Math.round(intensity * 100)}<span style={{ fontSize: 9, opacity: 0.5 }}>%</span>
              </span>
            </div>
            <ArcSlider
              value={intensity}
              color={accentColor}
              onChange={onIntensity}
              disabled={!enabled}
            />
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: -5,
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 9,
          height: 9,
          background: T.surface,
          border: `1px solid ${T.borderHi}`,
          borderTop: 'none',
          borderLeft: 'none',
        }} />
      </div>
    </Portal>
  );
}