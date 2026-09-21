import { useEffect, useRef } from 'react'
import { DEFAULT_PRINT_GRAIN } from './assetDefaults'

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value))

export default function PrintGrain({ config = DEFAULT_PRINT_GRAIN, className = '' }) {
  const canvasRef = useRef(null)
  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return undefined

    let timer = 0
    let seed = 0x9e3779b9
    let frameIndex = 0
    let image = null
    let pixels = null

    const resize = () => {
      const quality = clamp(0.3 / Math.max(0.45, configRef.current.scale), 0.24, 0.42)
      canvas.width = Math.max(160, Math.min(720, Math.round(window.innerWidth * quality)))
      canvas.height = Math.max(100, Math.min(420, Math.round(window.innerHeight * quality)))
      image = context.createImageData(canvas.width, canvas.height)
      pixels = image.data
    }

    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      return seed / 4294967296
    }

    const draw = () => {
      if (document.hidden) return
      const current = configRef.current
      if (!image || !pixels) return
      seed = (0x9e3779b9 + frameIndex * 0x6d2b79f5) >>> 0
      for (let index = 0; index < pixels.length; index += 4) {
        const fine = random()
        const coarse = random() * 0.34
        const value = Math.round(78 + (fine * 0.78 + coarse) * 112)
        pixels[index] = value
        pixels[index + 1] = value
        pixels[index + 2] = value
        pixels[index + 3] = 210
      }
      context.putImageData(image, 0, 0)
      frameIndex += 1
      if (!current.paused) timer = window.setTimeout(draw, 1000 / Math.max(1, current.fps))
    }

    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer)
      resize()
      draw()
    })
    observer.observe(document.documentElement)
    const handleVisibility = () => {
      window.clearTimeout(timer)
      if (!document.hidden) draw()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    resize()
    draw()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      window.clearTimeout(timer)
    }
  }, [])

  return <canvas ref={canvasRef} className={`asset-print-grain ${className}`} style={{ opacity: config.opacity }} aria-hidden="true" />
}
