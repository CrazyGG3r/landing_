import { useEffect, useMemo, useRef } from 'react'
import { seededRandom } from './assetUtils'
import { clamp, easeOutBack, subscribeSteppedAnimation } from './useSteppedProgress'

function buildShardPolygons(segments, config, edge, active, motion) {
  const baseY = edge === 'top' ? 60 : 0
  const overlapY = edge === 'top' ? 72 : -12
  const direction = edge === 'top' ? -1 : 1
  const resolvedWidthMultiplier = Math.max(10, config.stretch)
  return segments.map((segment, index) => {
    const cellWidth = segment.end - segment.start
    const animatedHeight = segment.height * (1 + segment.heightGain * motion)
    const snappedShift = active ? segment.shift : 0
    const rotation = segment.rotation * motion
    const rotationSkew = Math.tan((rotation * Math.PI) / 180) * animatedHeight * 0.42
    const desiredCenter = (segment.start + segment.end) * 0.5 + segment.lean * cellWidth + snappedShift
    const center = clamp(desiredCenter, -160, 1160)
    const crownY = baseY + direction * animatedHeight
    const width = clamp(cellWidth * segment.crownWidth * resolvedWidthMultiplier, cellWidth * 1.6, 920)
    const baseLeft = center - width * 0.5
    const baseRight = center + width * 0.5
    let points
    if (segment.kind === 'triangle') {
      points = [[baseLeft, overlapY], [baseRight, overlapY], [center + rotationSkew, crownY]]
    } else {
      const crownWidth = width * (0.26 + segment.crownWidth * 0.34)
      const crownCenter = center + rotationSkew
      const crownTilt = Math.sin((rotation * Math.PI) / 180) * animatedHeight * 0.28
      points = [
        [baseLeft, overlapY],
        [baseRight, overlapY],
        [crownCenter + crownWidth * 0.5, crownY + direction * crownTilt],
        [crownCenter - crownWidth * 0.5, crownY - direction * crownTilt],
      ]
    }
    return { key: `${edge}-${index}`, points: points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ') }
  })
}

export default function EdgeShards({ config, active = false, replayKey = 0, edge = 'bottom', className = '' }) {
  const motionRef = useRef(0)
  const polygonRefs = useRef([])

  const segments = useMemo(() => {
    const random = seededRandom(config.seed + (edge === 'top' ? 41 : 0))
    const weights = Array.from({ length: config.count }, () => 0.38 + Math.pow(random(), 1.8) * 1.9)
    const weightTotal = weights.reduce((sum, weight) => sum + weight, 0)
    const boundaries = [0]
    weights.forEach((weight) => boundaries.push(boundaries.at(-1) + (weight / weightTotal) * 1000))
    boundaries[boundaries.length - 1] = 1000
    const boundaryLifts = boundaries.map((_, index) => (
      index === 0 || index === boundaries.length - 1 ? 0 : config.reach * random() * 0.24
    ))

    return Array.from({ length: config.count }, (_, index) => {
      const start = boundaries[index]
      const end = boundaries[index + 1]
      const cellWidth = end - start
      const positionLimit = Math.min(config.reposition, cellWidth * 0.32)
      return {
        start,
        end,
        endLift: boundaryLifts[index + 1],
        kind: random() > 0.48 ? 'triangle' : 'quad',
        height: config.reach * (0.5 + Math.pow(random(), 1.35) * 0.72),
        heightGain: 0.12 + random() * 0.38,
        lean: random() * 0.7 - 0.35,
        shift: (random() * 2 - 1) * positionLimit,
        rotation: (random() * 2 - 1) * config.rotation,
        crownWidth: 0.16 + random() * 0.42,
      }
    })
  }, [config.count, config.reach, config.reposition, config.rotation, config.seed, edge])

  const shardPolygons = useMemo(() => buildShardPolygons(segments, config, edge, active, motionRef.current), [active, config.stretch, edge, segments])

  useEffect(() => {
    const from = replayKey && active ? 0 : motionRef.current
    const target = active ? 1 : 0
    const frameCount = Math.max(2, Math.round((config.duration / 1000) * config.fps))
    return subscribeSteppedAnimation({ duration: config.duration, fps: config.fps, loop: false, paused: config.paused }, (raw) => {
      const stepped = Math.round(raw * frameCount) / frameCount
      const next = from + (target - from) * easeOutBack(stepped, 0.72)
      motionRef.current = next
      buildShardPolygons(segments, config, edge, active, next).forEach((shard, index) => {
        polygonRefs.current[index]?.setAttribute('points', shard.points)
      })
    })
  }, [active, config.duration, config.fps, config.paused, config.stretch, edge, replayKey, segments])

  return (
    <svg className={`edge-shards edge-shards--${edge} ${className}`} data-active={active} viewBox="0 0 1000 72" preserveAspectRatio="none" aria-hidden="true">
      <g className="edge-shards__forms">
        {shardPolygons.map((shard, index) => <polygon key={shard.key} ref={(node) => { polygonRefs.current[index] = node }} points={shard.points} />)}
      </g>
    </svg>
  )
}
