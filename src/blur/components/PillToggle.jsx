export function PillToggle({ enabled, onToggle, color }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 38,
        height: 20,
        borderRadius: 10,
        border: 'none',
        flexShrink: 0,
        background: enabled ? color : 'rgba(255,255,255,0.08)',
        cursor: 'pointer',
        padding: 0,
        position: 'relative',
        transition: 'background 0.22s',
        boxShadow: enabled ? `0 0 10px ${color}55` : 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 2,
        left: enabled ? 20 : 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
        transition: 'left 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </button>
  );
}