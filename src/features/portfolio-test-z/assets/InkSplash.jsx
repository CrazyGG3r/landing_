import { useEffect, useMemo, useRef } from 'react'
import { DEFAULT_INK_SPLASH } from './assetDefaults'
import { seededRandom } from './assetUtils'
import { clamp, easeOutBack, subscribeSteppedAnimation } from './useSteppedProgress'

export default function InkSplash({ config = DEFAULT_INK_SPLASH, replayKey = 0, className = '' }) {
  const svgRef = useRef(null)
  const bodyRef = useRef(null)
  const dropletRefs = useRef([])
  const droplets = useMemo(() => {
    const random = seededRandom(config.seed ?? 911)
    return Array.from({ length: config.droplets }, (_, index) => ({ angle: -2.7 + random() * 2.1, distance: 10 + random() * config.reach, radius: 0.8 + random() * 3.2, delay: (index % 8) * 0.035 }))
  }, [config.droplets, config.reach, config.seed])
  useEffect(() => subscribeSteppedAnimation(config, (progress) => {
    if (svgRef.current) svgRef.current.style.opacity = clamp(progress / 0.12) * 0.9
    if (bodyRef.current) bodyRef.current.style.transform = `scale(${easeOutBack(clamp(progress / 0.48), config.overshoot)})`
    droplets.forEach((drop, index) => {
      const node = dropletRefs.current[index]
      if (!node) return
      const local = clamp((progress - drop.delay) / 0.42)
      const travel = easeOutBack(local, 0.5) * drop.distance
      node.setAttribute('cx', 48 + Math.cos(drop.angle) * travel)
      node.setAttribute('cy', 61 + Math.sin(drop.angle) * travel)
      node.setAttribute('r', drop.radius * Math.sin(local * Math.PI))
    })
  }), [config.duration, config.fps, config.loop, config.overshoot, config.paused, droplets, replayKey])

  return <svg ref={svgRef} className={`asset-ink-splash ${className}`} style={{ opacity: 0 }} viewBox="0 0 100 100" aria-hidden="true">
    <path ref={bodyRef} className="asset-ink-splash__body" d="M72 78C52 87 23 77 21 58c-2-18 16-30 35-25 19 4 31 25 16 45Z" style={{ transform: 'scale(0)' }} />
    {droplets.map((_, index) => <circle key={index} ref={(node) => { dropletRefs.current[index] = node }} cx="48" cy="61" r="0" />)}
  </svg>
}
