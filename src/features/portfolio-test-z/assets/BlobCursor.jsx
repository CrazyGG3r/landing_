import { useEffect, useId, useMemo, useRef } from 'react'
import { DEFAULT_BLOB_CURSOR } from './assetDefaults'

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))
const mix = (from, to, amount) => from + (to - from) * amount
const smoothstep = (edgeA, edgeB, value) => {
  const amount = clamp((value - edgeA) / (edgeB - edgeA), 0, 1)
  return amount * amount * (3 - 2 * amount)
}
const IDLE_MERGE_DELAY = 3000
const PRIMARY_BLOB_INDEX = 1

const organicSignedDistance = (x, y) => {
  const dx = x - 100
  const dy = y - 70
  const angle = Math.atan2(dy, dx)
  const organicEdge = 1
    + Math.sin(angle * 3 + 0.52) * 0.05
    + Math.sin(angle * 5 - 0.8) * 0.022
    + Math.cos(angle * 2 + 0.25) * 0.014
  const radiusX = 69 * organicEdge
  const radiusY = 48 * organicEdge
  const boundaryRadius = 1 / Math.sqrt(
    (Math.cos(angle) / radiusX) ** 2 + (Math.sin(angle) / radiusY) ** 2,
  )
  return boundaryRadius - Math.hypot(dx, dy)
}

const createDotFieldPath = (dots) => dots.map(({ x, y, radius }) => {
  const left = x - radius
  const diameter = radius * 2
  return `M${left.toFixed(2)} ${y.toFixed(2)}a${radius.toFixed(2)} ${radius.toFixed(2)} 0 1 0 ${diameter.toFixed(2)} 0a${radius.toFixed(2)} ${radius.toFixed(2)} 0 1 0 -${diameter.toFixed(2)} 0`
}).join('')

export default function BlobCursor({ config = DEFAULT_BLOB_CURSOR, active = false, vhsCenterRef, vhsParallaxRef, subscribePointer, className = '' }) {
  const cursorRef = useRef(null)
  const dotsRef = useRef(null)
  const trailLayerRef = useRef(null)
  const trailRefs = useRef([])
  const activeRef = useRef(active)
  const configRef = useRef(config)
  const wakeRef = useRef(() => {})
  const id = useId().replaceAll(':', '')

  activeRef.current = active
  configRef.current = config

  useEffect(() => {
    wakeRef.current()
  }, [active])

  const halftoneDots = useMemo(() => {
    const pitch = clamp(config.dotGap * 0.5, 4.5, 8)
    const transitionWidth = pitch * 8
    const gain = mix(0.82, 1.08, clamp(config.dotGain, 0, 1.5) / 1.5)
    const rotation = 15 * (Math.PI / 180)
    const cosine = Math.cos(rotation)
    const sine = Math.sin(rotation)
    const horizontalSteps = Math.ceil((200 + transitionWidth * 2) / pitch) + 4
    const verticalSteps = Math.ceil((140 + transitionWidth * 2) / pitch) + 4
    const dots = []

    for (let row = -Math.ceil(verticalSteps / 2); row <= Math.ceil(verticalSteps / 2); row += 1) {
      for (let column = -Math.ceil(horizontalSteps / 2); column <= Math.ceil(horizontalSteps / 2); column += 1) {
        const gridX = column * pitch
        const gridY = row * pitch
        const x = 100 + gridX * cosine - gridY * sine
        const y = 70 + gridX * sine + gridY * cosine
        const distance = organicSignedDistance(x, y)
        if (distance < -transitionWidth) continue

        // Dot gain is sampled at each dot centre, so no mask boundary can cut a
        // circle. Past the overlap threshold the dots themselves fuse into the
        // opaque blob; there is deliberately no separate silhouette underneath.
        const amount = smoothstep(-transitionWidth, pitch * 1.7, distance)
        const radius = clamp(
          pitch * mix(0.055, 0.78, amount ** 1.08) * gain,
          0.3,
          pitch * 0.8,
        )
        dots.push({ x, y, radius })
      }
    }

    return dots
  }, [config.dotGain, config.dotGap])

  const dotFieldPath = useMemo(() => createDotFieldPath(halftoneDots), [halftoneDots])

  useEffect(() => {
    const node = cursorRef.current
    const dotsGroup = dotsRef.current
    const trailLayer = trailLayerRef.current
    if (!node || !dotsGroup || !trailLayer) return undefined

    const startX = window.innerWidth * 0.5
    const startY = window.innerHeight * 0.5
    const pointer = { x: startX, y: startY }
    const state = { x: startX, y: startY, vx: 0, vy: 0, width: config.baseSize, height: config.baseSize * 0.7, vw: 0, vh: 0, angle: 0 }
    const trail = Array.from({ length: 3 }, () => ({ x: startX, y: startY }))
    let history = [{ x: startX, y: startY }]
    let merge = 0
    let idleMerge = 0
    let normalModeStartedAt = performance.now()
    let wasHovering = activeRef.current
    let frame = 0
    let lowPower = false
    let previousTime = performance.now()

    const movePointer = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      history.unshift({ x: pointer.x, y: pointer.y })
      if (history.length > 72) history = history.slice(0, 72)
      if (lowPower) {
        lowPower = false
        frame = window.requestAnimationFrame(render)
      }
    }

    const render = (time) => {
      if (document.hidden) {
        lowPower = true
        return
      }
      const currentConfig = configRef.current
      const hovering = activeRef.current
      const delta = clamp(time - previousTime, 6, 34)
      const frameScale = delta / 16.667
      previousTime = time

      if (wasHovering && !hovering) normalModeStartedAt = time
      wasHovering = hovering

      const mergeTarget = hovering ? 1 : 0
      const mergeResponse = hovering ? 1 - Math.exp(-delta / 235) : 1 - Math.exp(-delta / 285)
      merge += (mergeTarget - merge) * mergeResponse
      if (Math.abs(mergeTarget - merge) < 0.001) merge = mergeTarget
      const idleMergeTarget = !hovering && time - normalModeStartedAt >= IDLE_MERGE_DELAY ? 1 : 0
      const idleMergeResponse = idleMergeTarget ? 1 - Math.exp(-delta / 310) : 1 - Math.exp(-delta / 190)
      idleMerge += (idleMergeTarget - idleMerge) * idleMergeResponse
      if (Math.abs(idleMergeTarget - idleMerge) < 0.001) idleMerge = idleMergeTarget
      const hoverGather = smoothstep(0.02, 0.5, merge)
      const idleGather = smoothstep(0.02, 0.78, idleMerge)
      const grow = smoothstep(0.3, 1, merge)
      const anchoredCenter = vhsCenterRef?.current || pointer
      const parallax = vhsParallaxRef?.current || { x: 0, y: 0 }
      const center = { x: anchoredCenter.x + parallax.x * 0.42, y: anchoredCenter.y + parallax.y * 0.42 }
      const target = { x: mix(pointer.x, center.x, hoverGather), y: mix(pointer.y, center.y, hoverGather) }
      const viewportMinimum = Math.min(window.innerWidth, window.innerHeight)
      const activeWidth = clamp(viewportMinimum * currentConfig.captureScale, 680, Math.min(window.innerWidth * 1.28, 1520))
      const targetWidth = mix(currentConfig.baseSize * 1.5, activeWidth, grow)
      const targetHeight = mix(currentConfig.baseSize * 1.05, activeWidth * 0.8, grow)
      const spring = clamp(currentConfig.follow * frameScale, 0.01, 0.4)
      const damping = Math.pow(0.72, frameScale)

      state.vx = (state.vx + (target.x - state.x) * spring) * damping
      state.vy = (state.vy + (target.y - state.y) * spring) * damping
      state.vw = (state.vw + (targetWidth - state.width) * spring * 0.72) * damping
      state.vh = (state.vh + (targetHeight - state.height) * spring * 0.72) * damping
      state.x += state.vx * frameScale
      state.y += state.vy * frameScale
      state.width += state.vw * frameScale
      state.height += state.vh * frameScale

      const speed = Math.hypot(state.vx, state.vy)
      const velocityStretch = Math.min(0.2, speed * currentConfig.elasticity * 0.008) * (1 - grow)
      if (speed > 0.08 && grow < 0.35) state.angle = Math.atan2(state.vy, state.vx) * (180 / Math.PI)
      const hoverAngle = state.angle * (1 - grow)

      node.style.width = `${state.width}px`
      node.style.height = `${state.height}px`
      node.style.opacity = grow > 0.06 ? `${currentConfig.opacity}` : '0'
      node.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) rotate(${hoverAngle}deg) scale(${1 + velocityStretch}, ${1 - velocityStretch * 0.42})`
      dotsGroup.style.opacity = grow > 0.2 ? '1' : '0'

      const steppedFrame = currentConfig.paused ? 0 : Math.floor(time / (1000 / 12))
      const steppedTime = steppedFrame * (1000 / 12)
      const phase = currentConfig.paused ? 0 : steppedTime * 0.001
      const breathWave = Math.sin((phase * Math.PI * 2 * 1000) / currentConfig.breathDuration)
      const breathScale = 1 + breathWave * currentConfig.breath * 0.012
      dotsGroup.style.transform = `scale(${(0.82 + grow * 0.18) * breathScale})`

      const sizes = [1, 1.42, 0.88]
      trailRefs.current.forEach((blob, index) => {
        if (!blob) return
        const spacing = Math.max(2, Math.round((5 + currentConfig.elasticity * 3.5) * index))
        const historyPoint = history[Math.min(spacing, history.length - 1)] || pointer
        const convergeOffset = index === 0 ? { x: -4, y: 1 } : index === 1 ? { x: 4, y: -2 } : { x: 1, y: 4 }
        const hoverMergePoint = { x: center.x + convergeOffset.x * (1 - hoverGather), y: center.y + convergeOffset.y * (1 - hoverGather) }
        const primaryPoint = {
          x: mix(trail[PRIMARY_BLOB_INDEX].x, pointer.x, idleGather),
          y: mix(trail[PRIMARY_BLOB_INDEX].y, pointer.y, idleGather),
        }
        const idleTarget = index === PRIMARY_BLOB_INDEX
          ? { x: mix(historyPoint.x, pointer.x, idleGather), y: mix(historyPoint.y, pointer.y, idleGather) }
          : { x: mix(historyPoint.x, primaryPoint.x, idleGather), y: mix(historyPoint.y, primaryPoint.y, idleGather) }
        const targetPoint = hovering
          ? { x: mix(historyPoint.x, hoverMergePoint.x, hoverGather), y: mix(historyPoint.y, hoverMergePoint.y, hoverGather) }
          : idleTarget
        const response = clamp(currentConfig.follow * (index === 0 ? 1.65 : 0.72 / index), 0.018, 0.38)
        const interpolation = 1 - Math.pow(1 - response, frameScale)
        trail[index].x += (targetPoint.x - trail[index].x) * interpolation
        trail[index].y += (targetPoint.y - trail[index].y) * interpolation
        const breathing = 1 + Math.sin(phase * (1.35 + index * 0.19) + index * 1.7) * (index === 0 ? 0.045 : 0.075)
        const normalRadius = currentConfig.baseSize * sizes[index] * 0.5 * breathing
        const fusedRadius = currentConfig.baseSize * (0.77 + index * 0.025)
        blob.setAttribute('cx', trail[index].x)
        blob.setAttribute('cy', trail[index].y)
        blob.setAttribute('r', mix(normalRadius, fusedRadius, hoverGather))
      })

      // The hand-off is occluded by the growing vector mass: there is no opacity cross-fade.
      trailLayer.style.visibility = grow > 0.64 ? 'hidden' : 'visible'
      const cursorSettled = !hovering
        && idleMerge > 0.998
        && Math.abs(state.vx) + Math.abs(state.vy) + Math.abs(state.vw) + Math.abs(state.vh) < 0.08
      if (cursorSettled) {
        lowPower = true
      } else {
        frame = window.requestAnimationFrame(render)
      }
    }

    wakeRef.current = () => {
      if (!lowPower || document.hidden) return
      lowPower = false
      previousTime = performance.now()
      frame = window.requestAnimationFrame(render)
    }

    const unsubscribePointer = subscribePointer?.(movePointer)
    if (!unsubscribePointer) window.addEventListener('pointermove', movePointer, { passive: true })
    const handleVisibility = () => {
      window.cancelAnimationFrame(frame)
      if (!document.hidden) {
        lowPower = false
        previousTime = performance.now()
        frame = window.requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    frame = window.requestAnimationFrame(render)
    return () => {
      if (unsubscribePointer) unsubscribePointer()
      else window.removeEventListener('pointermove', movePointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.cancelAnimationFrame(frame)
      wakeRef.current = () => {}
    }
  }, [config.baseSize, subscribePointer, vhsCenterRef, vhsParallaxRef])

  return <>
    <svg ref={trailLayerRef} className="blob-cursor-trail" aria-hidden="true">
      <defs>
        <filter id={`${id}-liquid`} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={Math.max(5, config.baseSize * 0.115)} result="trail-blur" />
          <feColorMatrix in="trail-blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 31 -12" />
        </filter>
      </defs>
      <g filter={`url(#${id}-liquid)`}>
        {[0.74, 0.52, 0.62].map((opacity, index) => <circle
          key={index}
          ref={(circle) => { trailRefs.current[index] = circle }}
          cx="0"
          cy="0"
          r={config.baseSize * 0.5}
          opacity={opacity}
        />)}
      </g>
    </svg>
    <svg
      ref={cursorRef}
      className={`blob-cursor ${className}`}
      data-paused={config.paused}
      viewBox="0 0 200 140"
      aria-hidden="true"
    >
      <g ref={dotsRef} className="blob-cursor__edge-dots">
        <path className="blob-cursor__dot-field" d={dotFieldPath} fill="currentColor" />
      </g>
    </svg>
  </>
}
