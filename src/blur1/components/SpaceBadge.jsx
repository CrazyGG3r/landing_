import { T } from '../styles/tokens.js';

export function SpaceBadge({ active }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 20,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${active ? 'rgba(255,255,255,0.12)' : T.border}`,
      borderRadius: 10,
      padding: '6px 12px',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transition: 'border-color 0.2s',
      pointerEvents: 'none',
    }}>
      <div style={{
        background: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 5,
        padding: '1px 8px',
        fontSize: 10,
        letterSpacing: '0.05em',
        color: active ? '#e2e2e6' : '#36363e',
        fontFamily: 'monospace',
        boxShadow: active ? '0 0 8px rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.2s',
      }}>SPACE</div>
      <span style={{
        color: active ? T.textSec : T.textDim,
        fontSize: 11,
        transition: 'color 0.2s'
      }}>
        {active ? 'following' : 'hold to follow'}
      </span>
    </div>
  );
}