import { useEffect, useMemo, useRef } from 'react'
import { DEFAULT_STARBURST } from './assetDefaults'
import { makeBurstRadii, radiiToPoints } from './assetUtils'
import { clamp, easeOutBack, subscribeSteppedAnimation } from './useSteppedProgress'

export default function Starburst({ config = DEFAULT_STARBURST, accent = '#f01924', support = '#ffe600', replayKey = 0, className = '' }) {
  const svgRef = useRef(null)
  const polygonRefs = useRef([])
  const radii = useMemo(() => makeBurstRadii(config.seed, config.spikes, config.inner, config.outer, config.spikeRandomness), [config.inner, config.outer, config.seed, config.spikeRandomness, config.spikes])
  const layers = useMemo(() => [radii, radii.map((radius) => radius * 0.8), radii.map((radius) => radius * 0.61)], [radii])

  useEffect(() => subscribeSteppedAnimation(config, (progress) => {
    if (svgRef.current) svgRef.current.style.opacity = clamp(progress / 0.12)
    const delays = [0, 0.04, 0.11, 0.17]
    polygonRefs.current.forEach((polygon, index) => {
      if (!polygon) return
      const source = index < 2 ? layers[0] : layers[index - 1]
      const layerProgress = easeOutBack(clamp((progress - delays[index]) / 0.46), config.overshoot)
      polygon.setAttribute('points', radiiToPoints(source, layerProgress))
    })
  }), [config.duration, config.fps, config.loop, config.overshoot, config.paused, layers, replayKey])

  return <svg ref={svgRef} className={`asset-starburst ${className}`} style={{ opacity: 0 }} viewBox="-8 -8 116 116" aria-hidden="true">
    <polygon ref={(node) => { polygonRefs.current[0] = node }} className="asset-starburst__shadow" points={radiiToPoints(radii, 0)} />
    <polygon ref={(node) => { polygonRefs.current[1] = node }} className="asset-starburst__outer" points={radiiToPoints(radii, 0)} fill={accent} />
    <polygon ref={(node) => { polygonRefs.current[2] = node }} className="asset-starburst__middle" points={radiiToPoints(layers[1], 0)} fill={support} />
    <polygon ref={(node) => { polygonRefs.current[3] = node }} className="asset-starburst__core" points={radiiToPoints(layers[2], 0)} />
  </svg>
}
