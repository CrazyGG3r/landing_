import { T } from '../styles/tokens.js';
import { ArcSlider } from './ArcSlider.jsx';

const IMPACT_COLOR = '#a78bfa';

export function ImpactCard({ impact, onChange }) {
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
          }}>Impact</div>
          <div style={{
            color: T.textSec,
            fontSize: 10,
            marginTop: 2
          }}>mouse influence</div>
        </div>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: `radial-gradient(circle, ${IMPACT_COLOR}55, ${IMPACT_COLOR}11)`,
          border: `2px solid ${IMPACT_COLOR}44`,
          boxShadow: `0 0 14px ${IMPACT_COLOR}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" fill={IMPACT_COLOR} />
            <circle cx="7" cy="7" r="5.5" stroke={IMPACT_COLOR} strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
      
      <div style={{ height: 1, background: T.border }} />
      
      {[
        ['Size', impact.size, 0, 1, v => onChange({ ...impact, size: v })],
        ['Edge', impact.edge, 0, 3, v => onChange({ ...impact, edge: v })]
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
              color: IMPACT_COLOR,
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
            color={IMPACT_COLOR}
            onChange={fn}
          />
        </div>
      ))}
    </div>
  );
}