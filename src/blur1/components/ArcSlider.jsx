export function ArcSlider({ value, min = 0, max = 1, step = 0.01, color, onChange, disabled = false }) {
  const pct = ((value - min) / (max - min)) * 100;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      opacity: disabled ? 0.28 : 1,
      transition: 'opacity 0.2s',
      pointerEvents: disabled ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', height: 36, display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 4,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.06)'
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: disabled ? 'none' : `0 0 6px ${color}66`
          }} />
        </div>
        <div style={{
          position: 'absolute',
          left: `calc(${pct}% - 8px)`,
          width: 16,
          height: 16,
          borderRadius: 16,
          background: disabled ? '#2a2a30' : '#fff',
          border: `2.5px solid ${disabled ? '#3a3a44' : color}`,
          boxShadow: disabled ? 'none' : `0 0 0 3px ${color}22, 0 2px 8px rgba(0,0,0,0.5)`,
          pointerEvents: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
            WebkitAppearance: 'none'
          }}
        />
      </div>
    </div>
  );
}