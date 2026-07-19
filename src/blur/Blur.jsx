import { useState, useEffect } from 'react';
import { T } from './styles/tokens.js';
import { useSettings } from './hooks/useSettings.js';
import { ShapeBlur } from './components/ShapeBlur.jsx';
import { LayerCard } from './components/LayerCard.jsx';
import { ImpactCard } from './components/ImpactCard.jsx';
import { FxControlFinal } from './components/FxControlFinal.jsx';
import { StatusDot } from './components/StatusDot.jsx';
import { ToggleBtn } from './components/ToggleBtn.jsx';
import { SpaceBadge } from './components/SpaceBadge.jsx';

export default function Blur() {
  const {
    layers, impact, noise, smoke, dither, status,
    updateLayer, updateImpact, updateNoise, updateSmoke, updateDither, reset
  } = useSettings();
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [jsonView, setJsonView] = useState(false);
  const [followMouse, setFollowMouse] = useState(false);

  // Scroll lock
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    
    const block = e => {
      if (e.target.closest?.('[data-scroll]')) return;
      e.preventDefault();
    };
    
    document.addEventListener('touchmove', block, { passive: false });
    document.addEventListener('wheel', block, { passive: false });
    
    return () => {
      document.body.style.overflow = orig;
      document.body.style.touchAction = '';
      document.removeEventListener('touchmove', block);
      document.removeEventListener('wheel', block);
    };
  }, []);

  // Spacebar follow
  useEffect(() => {
    const down = e => {
      if (e.code === 'Space') {
        e.preventDefault();
        setFollowMouse(true);
      }
    };
    const up = e => {
      if (e.code === 'Space') setFollowMouse(false);
    };
    
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);
  
  useEffect(() => {
    const start = () => setFollowMouse(true);
    const end = () => setFollowMouse(false);
    
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    window.addEventListener('touchcancel', end, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
      window.removeEventListener('touchcancel', end);
    };
  }, []);

  const jsonString = JSON.stringify({ version: 1, layers, impact, noise, smoke, dither }, null, 2);

  return (
    <div style={{
      background: T.bg,
      width: '100vw',
      height: '100vh',
      minHeight: '-webkit-fill-available',
      position: 'fixed',
      inset: 0,
      fontFamily: T.font,
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    }}>
      {/* Canvas */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ShapeBlur
          layers={layers}
          followMouse={followMouse}
          impactSize={impact.size}
          impactEdge={impact.edge}
          noiseEnabled={noise.enabled}   noiseIntensity={noise.intensity}
          smokeEnabled={smoke.enabled}   smokeIntensity={smoke.intensity}
          ditherEnabled={dither.enabled} ditherIntensity={dither.intensity}
        />
      </div>

      {/* Panel */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.36s cubic-bezier(0.32,0.72,0,1)',
        padding: '0 16px 76px',
      }}>
        <div style={{
          maxWidth: 820,
          margin: '0 auto',
          background: T.surface,
          border: `1px solid ${T.borderHi}`,
          borderRadius: `${T.radius.xl}px ${T.radius.xl}px 0 0`,
          boxShadow: '0 -32px 80px rgba(0,0,0,0.75)',
        }}>
          <div data-scroll="true" style={{
            padding: '14px 18px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            overflowY: 'auto',
            maxHeight: '78vh',
            WebkitOverflowScrolling: 'touch',
          }}>
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <StatusDot status={status} />
              
              <div style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                flexWrap: 'wrap',
                flex: 1,
                justifyContent: 'center'
              }}>
                <FxControlFinal
                  label="Noise"
                  accentColor="#c87eff"
                  glowColor="#c87eff"
                  enabled={noise.enabled}
                  intensity={noise.intensity}
                  onToggle={() => updateNoise({ enabled: !noise.enabled }, layers, impact, smoke, dither)}
                  onIntensity={v => updateNoise({ intensity: v }, layers, impact, smoke, dither)}
                />
                <FxControlFinal
                  label="Smoke"
                  accentColor="#7ec8e3"
                  glowColor="#7ec8e3"
                  enabled={smoke.enabled}
                  intensity={smoke.intensity}
                  onToggle={() => updateSmoke({ enabled: !smoke.enabled }, layers, impact, noise, dither)}
                  onIntensity={v => updateSmoke({ intensity: v }, layers, impact, noise, dither)}
                />
                <FxControlFinal
                  label="Dither"
                  accentColor="#f0c040"
                  glowColor="#f0c040"
                  enabled={dither.enabled}
                  intensity={dither.intensity}
                  onToggle={() => updateDither({ enabled: !dither.enabled }, layers, impact, noise, smoke)}
                  onIntensity={v => updateDither({ intensity: v }, layers, impact, noise, smoke)}
                />
              </div>
              
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                <button
                  onClick={() => setJsonView(v => !v)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${T.border}`,
                    color: jsonView ? T.textPri : T.textSec,
                    borderRadius: T.radius.sm,
                    padding: '5px 10px',
                    fontSize: 11,
                    cursor: 'pointer',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s',
                  }}
                >
                  {jsonView ? 'Hide JSON' : 'JSON'}
                </button>
                <button
                  onClick={reset}
                  style={{
                    background: 'rgba(255,50,50,0.07)',
                    border: '1px solid rgba(255,60,60,0.18)',
                    color: '#ff5555',
                    borderRadius: T.radius.sm,
                    padding: '5px 10px',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: T.border }} />

            {/* JSON view */}
            {jsonView && (
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${T.border}`,
                borderRadius: T.radius.md,
                padding: '12px 14px',
                margin: 0,
                color: '#58a6ff',
                fontSize: 11,
                lineHeight: 1.65,
                overflowX: 'auto',
                maxHeight: 160,
                overflowY: 'auto',
                fontFamily: "'Fira Code','Courier New',monospace",
                userSelect: 'text',
                WebkitUserSelect: 'text',
              }}>
                {jsonString}
              </pre>
            )}

            {/* Cards grid: Layer A/B/C + Impact */}
            <div style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              paddingBottom: 2
            }}>
              {layers.map((l, i) => (
                <LayerCard
                  key={i}
                  index={i}
                  layer={l}
                  onChange={v => updateLayer(i, v, impact, noise, smoke, dither)}
                />
              ))}
              <ImpactCard
                impact={impact}
                onChange={v => updateImpact(v, layers, noise, smoke, dither)}
              />
            </div>
          </div>
        </div>
      </div>

      <SpaceBadge active={followMouse} />
      <ToggleBtn open={panelOpen} onClick={() => setPanelOpen(v => !v)} />
    </div>
  );
}