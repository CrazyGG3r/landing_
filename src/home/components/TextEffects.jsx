import { memo, useEffect, useRef, useContext } from 'react';
import { MouseContext } from '../core/MouseContext';
import {
  SUBTITLE_SHADOW_BLUR,
  SUBTITLE_SHADOW_DISTANCE,
  SUBTITLE_SHADOW_INTENSITY,
  TEXT_EMISSION_BASE,
  TEXT_EMISSION_MAX,
  TEXT_GLOW,
  TEXT_LIGHT_FALLOFF,
  TITLE_SHADOW_BLUR,
  TITLE_SHADOW_DISTANCE,
  TITLE_SHADOW_INTENSITY,
} from '../core/constants';

export const BacklitText = memo(function BacklitText({ children, style }) {
  const ref = useRef(null);
  const mouseRef = useContext(MouseContext);
  const emissionRef = useRef(0);
  const lastValsRef = useRef({ lx: null, ly: null, emission: null });

  useEffect(() => {
    let raf;
    const start = performance.now();

    const loop = () => {
      const t = (performance.now() - start) / 1000;
      const mx = mouseRef.current?.x ?? 0;
      const my = mouseRef.current?.y ?? 0;

      const ox = Math.cos(t * 0.35) * 0.6;
      const oy = Math.sin(t * 0.27) * 0.45;
      const blend = 0.65;
      const lx = ((ox * (1 - blend) + mx * blend) * 0.5 + 0.5) * 100;
      const ly = ((oy * (1 - blend) + my * blend) * 0.5 + 0.5) * 100;

      const distance = Math.sqrt(mx * mx + my * my);
      const emissionFactor = Math.min(1, distance * 1.5);
      const emissionValue = TEXT_EMISSION_BASE + (emissionFactor * TEXT_EMISSION_MAX);

      emissionRef.current += (emissionValue - emissionRef.current) * 0.15;

      if (ref.current) {
        const last = lastValsRef.current;
        const emission = emissionRef.current;
        const eps = 0.15;

        if (last.lx === null || Math.abs(last.lx - lx) > eps) {
          ref.current.style.setProperty('--lx', `${lx}%`);
          last.lx = lx;
        }
        if (last.ly === null || Math.abs(last.ly - ly) > eps) {
          ref.current.style.setProperty('--ly', `${ly}%`);
          last.ly = ly;
        }
        if (last.emission === null || Math.abs(last.emission - emission) > 0.02) {
          ref.current.style.setProperty('--emission', emission.toString());
          last.emission = emission;
        }
        ref.current.style.setProperty('--lg', `${TEXT_GLOW}`);
        ref.current.style.setProperty('--lf', `${TEXT_LIGHT_FALLOFF}`);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef]);

  return (
    <div ref={ref} style={{ ...style, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto' }}>
        {children}
      </div>
    </div>
  );
});

export const DynamicShadowText = memo(function DynamicShadowText({ children, style, level = 'title' }) {
  const ref = useRef(null);
  const mouseRef = useContext(MouseContext);
  const lastShadowRef = useRef('');

  const shadowIntensity = level === 'title' ? TITLE_SHADOW_INTENSITY : SUBTITLE_SHADOW_INTENSITY;
  const shadowBlur = level === 'title' ? TITLE_SHADOW_BLUR : SUBTITLE_SHADOW_BLUR;
  const shadowDistance = level === 'title' ? TITLE_SHADOW_DISTANCE : SUBTITLE_SHADOW_DISTANCE;

  useEffect(() => {
    let raf;
    const loop = () => {
      if (ref.current && mouseRef.current) {
        const mx = mouseRef.current.x || 0;
        const my = mouseRef.current.y || 0;

        const shadowX = mx * shadowDistance;
        const shadowY = my * shadowDistance;

        const emission = parseFloat(getComputedStyle(ref.current).getPropertyValue('--emission')) || 0;

        const shadow = `
          ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowIntensity}),
          ${shadowX * 0.3}px ${shadowY * 0.3}px ${shadowBlur * 0.5}px rgba(0,0,0,${shadowIntensity * 0.5}),
          0 0 ${15 + emission * 8}px rgba(140,80,255,${0.4 + emission * 0.15}),
          0 0 ${30 + emission * 15}px rgba(140,80,255,${0.25 + emission * 0.1})
        `;
        if (shadow !== lastShadowRef.current) {
          ref.current.style.textShadow = shadow;
          lastShadowRef.current = shadow;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef, shadowIntensity, shadowBlur, shadowDistance]);

  return (
    <span ref={ref} style={style}>
      {children}
    </span>
  );
});
