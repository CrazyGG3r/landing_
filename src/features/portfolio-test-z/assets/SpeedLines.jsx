import { useEffect, useMemo, useRef } from 'react'
import { DEFAULT_SPEED_LINES } from './assetDefaults'
import { seededRandom } from './assetUtils'
import { clamp, subscribeSteppedAnimation } from './useSteppedProgress'

export default function SpeedLines({ config = DEFAULT_SPEED_LINES, replayKey = 0, className = '' }) {
  const lineRefs = useRef([])
  const lines = useMemo(() => {
    const random = seededRandom(config.seed ?? 1989)
    return Array.from({ length: config.count }, (_, index) => ({ angle: random() * Math.PI * 2, start: 14 + random() * 18, length: config.length * (0.45 + random() * 0.75), width: 0.18 + random() * 0.55, delay: (index % 9) * 0.025 }))
  }, [config.count, config.length, config.seed])

  useEffect(() => subscribeSteppedAnimation(config, (progress) => {
    lines.forEach((line, index) => {
      const node = lineRefs.current[index]
      if (!node) return
      const local = clamp((progress - line.delay) / 0.38)
      const travel = local * config.spread
      const start = line.start + travel
      const end = start + line.length * Math.sin(local * Math.PI)
      node.setAttribute('x1', 50 + Math.cos(line.angle) * start)
      node.setAttribute('y1', 50 + Math.sin(line.angle) * start)
      node.setAttribute('x2', 50 + Math.cos(line.angle) * end)
      node.setAttribute('y2', 50 + Math.sin(line.angle) * end)
      node.setAttribute('opacity', Math.sin(local * Math.PI))
    })
  }), [config.duration, config.fps, config.loop, config.paused, config.spread, lines, replayKey])

  return <svg className={`asset-speed-lines ${className}`} viewBox="0 0 100 100" aria-hidden="true">
    {lines.map((line, index) => <line key={index} ref={(node) => { lineRefs.current[index] = node }} x1="50" y1="50" x2="50" y2="50" strokeWidth={line.width} opacity="0" />)}
  </svg>
}
