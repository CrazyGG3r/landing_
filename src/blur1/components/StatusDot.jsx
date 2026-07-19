import { T } from '../styles/tokens.js';

export function StatusDot({ status }) {
  const map = {
    saved: { c: '#3ddc84', l: 'Saved' },
    saving: { c: '#f5a623', l: 'Saving' },
    loaded: { c: '#4e9bff', l: 'Loaded' },
    default: { c: '#ff4d4d', l: 'Reset' }
  };
  const s = map[status] || map.saved;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <div style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        background: s.c,
        boxShadow: `0 0 6px ${s.c}88`
      }} />
      <span style={{ color: T.textSec, fontSize: 11 }}>{s.l}</span>
    </div>
  );
}