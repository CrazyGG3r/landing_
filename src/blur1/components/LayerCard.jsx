import { T } from '../styles/tokens.js';
import { ArcSlider } from './ArcSlider.jsx';

const LAYER_META = [
  { label: 'Layer A', hint: '← left · −10%' },
  { label: 'Layer B', hint: '· center ·' },
  { label: 'Layer C', hint: '→ right · +10%' },
];

export function LayerCard({ index, layer, onChange }) {
  const { label, hint } = LAYER_META[index];
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: `1px solid ${T.border}`,
      borderRadius: T.radius.lg,
      padding: '14px 14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      flex: '1 1 160px',
      minWidth: 140,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
      }}>
        <div>
          <div style={{
            color: T.textPri,
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.01em'
          }}>{label}</div>
          <div style={{
            color: T.textSec,
            fontSize: 10,
            marginTop: 2
          }}>{hint}</div>
        </div>
        <label style={{ cursor: 'pointer', flexShrink: 0, position: 'relative' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: layer.color,
            border: '2px solid rgba(255,255,255,0.12)',
            boxShadow: `0 0 14px ${layer.color}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }} />
          <input
            type="color"
            value={layer.color}
            onChange={e => onChange({ ...layer, color: e.target.value })}
            style={{
              position: 'absolute',
              opacity: 0,
              width: 0,
              height: 0,
              pointerEvents: 'none'
            }}
          />
        </label>
      </div>
      
      <div style={{ height: 1, background: T.border }} />
      
      {[
        ['Spread', layer.spread, -2, 2, v => onChange({ ...layer, spread: v })],
        ['Intensity', layer.intensity, 0, 2, v => onChange({ ...layer, intensity: v })]
      ].map(([lbl, val, mn, mx, fn]) => (
        <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2
          }}>
            <span style={{
              color: T.textSec,
              fontSize: 10,
              letterSpacing: '0.07em',
              textTransform: 'uppercase'
            }}>{lbl}</span>
            <span style={{
              color: layer.color,
              fontSize: 11,
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 600
            }}>{val.toFixed(2)}</span>
          </div>
          <ArcSlider
            value={val}
            min={mn}
            max={mx}
            step={0.01}
            color={layer.color}
            onChange={fn}
          />
        </div>
      ))}
    </div>
  );
}