import { T } from '../styles/tokens.js';

export function ToggleBtn({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 20,
        zIndex: 100,
        width: 42,
        height: 42,
        borderRadius: 12,
        background: open ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${open ? T.borderHi : T.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: open ? '0 0 24px rgba(255,255,255,0.07)' : 'none',
      }}
    >
      {open ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="2" y1="2" x2="12" y2="12" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="2" x2="2" y2="12" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="8"   x2="14" y2="8"   stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="5.5" cy="4.5" r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <circle cx="10.5" cy="8"  r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <circle cx="6.5" cy="11.5" r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
        </svg>
      )}
    </button>
  );
}