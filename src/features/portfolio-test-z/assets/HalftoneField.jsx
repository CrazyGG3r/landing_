import { useEffect, useRef } from 'react'
import { DEFAULT_HALFTONE } from './assetDefaults'

const TAU = Math.PI * 2

function smoothstep(value) {
  const clamped = Math.max(0, Math.min(1, value))
  return clamped * clamped * (3 - 2 * clamped)
}

function smootherstep(value) {
  const clamped = Math.max(0, Math.min(1, value))
  return clamped ** 3 * (clamped * (clamped * 6 - 15) + 10)
}

export default function HalftoneField({ config = DEFAULT_HALFTONE, replayKey = 0, originRef, state = 'idle', className = '' }) {
  const canvasRef = useRef(null)
  const motionRef = useRef({ reveal: 0, phase: 0, previous: performance.now() })
  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    const motion = motionRef.current
    motion.previous = performance.now()
    if (state === 'active') motion.phase = 0
    let timer = 0
    let disposed = false
    let width = 1
    let height = 1
    let dpr = 1

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      dpr = Math.min(window.devicePixelRatio || 1, 1.15)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = (time) => {
      if (document.hidden) return
      const current = configRef.current
      const delta = Math.min(160, Math.max(0, time - motion.previous))
      motion.previous = time
      const active = state === 'active'
      const target = active ? 1 : 0
      // Enter left-to-right and retreat through the same field in reverse.
      // Keeping both legs deliberately long preserves the cinematic column
      // cadence instead of collapsing the exit into a quick global fade.
      const transitionDuration = active ? 1380 : 1280
      motion.reveal += (active ? 1 : -1) * delta / transitionDuration
      motion.reveal = Math.max(0, Math.min(1, motion.reveal))

      const frameDuration = 1000 / Math.max(1, current.fps)
      {
        if (active && !current.paused && (current.loop || motion.phase < TAU)) {
          motion.phase = current.loop
            ? (motion.phase + (delta / Math.max(400, current.duration)) * TAU) % TAU
            : Math.min(TAU, motion.phase + (delta / Math.max(400, current.duration)) * TAU)
        }

        context.clearRect(0, 0, width, height)
        if (motion.reveal > 0.002) {
          const spacing = Math.max(8, 68 - current.proximity * 46)
          const origin = originRef?.current ?? { x: width * 0.5, y: height * 0.5 }
          const offsetX = ((origin.x % spacing) + spacing) % spacing
          const offsetY = ((origin.y % spacing) + spacing) % spacing
          const gain = 0.62 + current.dotGain * 0.78
          const baseRadius = Math.min(spacing * 0.42, current.maxRadius * gain)
          const breathDepth = 0.035 + current.waveWidth * 0.16
          const cinematicProgress = smootherstep(motion.reveal)
          const globalFade = smootherstep(motion.reveal / 0.24)
          for (let x = offsetX - spacing; x <= width + spacing; x += spacing) {
            const normalizedX = Math.max(0, Math.min(1, x / Math.max(1, width)))
            const columnDelay = normalizedX * 0.64
            const columnReveal = Math.max(0, Math.min(1, (cinematicProgress - columnDelay) / 0.36))
            if (columnReveal <= 0.001) continue
            const fade = smootherstep(columnReveal) * globalFade
            const entranceScale = 0.76 + smootherstep(columnReveal) * 0.24
            const settled = smoothstep(Math.max(0, (columnReveal - 0.68) / 0.32))
            const horizontalPhase = motion.phase - (x / Math.max(1, width)) * TAU * 1.18
            const dotScale = entranceScale * (1 + Math.sin(horizontalPhase) * breathDepth * settled)
            const radius = Math.max(0.08, baseRadius * dotScale)
            context.fillStyle = `rgba(255, 255, 255, ${(current.opacity * fade).toFixed(4)})`
            context.beginPath()
            for (let y = offsetY - spacing; y <= height + spacing; y += spacing) {
              context.moveTo(x + radius, y)
              context.arc(x, y, radius, 0, TAU)
            }
            context.fill()
          }
        }
      }

      const revealMoving = Math.abs(target - motion.reveal) > 0.002
      const phaseMoving = active && !current.paused && (current.loop || motion.phase < TAU)
      if (!disposed && (revealMoving || phaseMoving)) {
        timer = window.setTimeout(() => render(performance.now()), frameDuration)
      }
    }

    resize()
    const observer = new ResizeObserver(() => {
      resize()
      window.clearTimeout(timer)
      render(performance.now())
    })
    observer.observe(canvas)
    const handleVisibility = () => {
      window.clearTimeout(timer)
      if (!document.hidden) {
        motion.previous = performance.now()
        render(motion.previous)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    render(performance.now())
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      window.clearTimeout(timer)
    }
  }, [originRef, replayKey, state])

  return <canvas ref={canvasRef} className={`asset-halftone ${className}`} aria-hidden="true" />
}
