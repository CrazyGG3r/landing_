import { useState, useRef } from 'react';
import { T } from '../styles/tokens.js';
import { FxCard } from './FxCard.jsx';

export function FxControlFinal({ label, accentColor, glowColor, enabled, intensity, onToggle, onIntensity }) {
  const [open, setOpen] = useState(false);
  const chipRef = useRef();
  
  return (
    <>
      <button
        ref={chipRef}
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: enabled ? `linear-gradient(150deg,${accentColor}20,${accentColor}0c)` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${enabled ? accentColor + '44' : T.border}`,
          borderRadius: T.radius.sm,
          padding: '5px 10px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: enabled ? `0 0 18px ${glowColor}28` : 'none',
          outline: open ? `2px solid ${accentColor}44` : 'none',
          outlineOffset: 2,
        }}
      >
        <span style={{
          color: enabled ? T.textPri : T.textSec,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'color 0.2s'
        }}>{label}</span>
        <div style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          flexShrink: 0,
          background: enabled ? accentColor : 'rgba(255,255,255,0.1)',
          boxShadow: enabled ? `0 0 5px ${glowColor}` : 'none',
          transition: 'all 0.2s'
        }} />
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          style={{
            opacity: 0.25,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            flexShrink: 0
          }}
        >
          <polyline
            points="1.5,3 4.5,6.5 7.5,3"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {open && (
        <FxCard
          label={label}
          accentColor={accentColor}
          enabled={enabled}
          intensity={intensity}
          onToggle={onToggle}
          onIntensity={onIntensity}
          anchorRef={chipRef}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}