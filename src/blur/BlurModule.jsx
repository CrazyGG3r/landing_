import { useMemo } from 'react';
import { ShapeBlur } from './components/ShapeBlur.jsx';
import { parseSettings } from './storage.js';

export default function BlurModule({
  config,
  json,
  className,
  style,
  follow = false,
  trackPointer = true,
  debugSubjects = false,
  subjects,
}) {
  const settings = useMemo(() => {
    if (json != null) return parseSettings(json);
    return parseSettings(config);
  }, [json, config]);

  const activeSubjects = subjects ?? settings.subjects;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <ShapeBlur
        layers={settings.layers}
        subjects={activeSubjects}
        debugSubjects={debugSubjects}
        followMouse={follow}
        trackPointer={trackPointer}
        impactSize={settings.impact.size}
        impactEdge={settings.impact.edge}
        noiseEnabled={settings.noise.enabled}
        noiseIntensity={settings.noise.intensity}
        smokeEnabled={settings.smoke.enabled}
        smokeIntensity={settings.smoke.intensity}
        ditherEnabled={settings.dither.enabled}
        ditherIntensity={settings.dither.intensity}
      />
    </div>
  );
}
