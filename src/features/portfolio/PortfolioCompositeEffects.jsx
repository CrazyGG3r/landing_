import React, { memo, useEffect, useMemo } from 'react'

const STYLE_ELEMENT_ID = 'portfolio-composite-keyframes'

const KEYFRAME_CSS = `
  @keyframes portfolioCompositeFlicker {
    0%, 17%, 19%, 54%, 56%, 100% { opacity: 1; }
    18%, 55% { opacity: 0.94; }
  }

  @keyframes portfolioCompositeDrift {
    0% { transform: translate3d(-0.4%, -0.2%, 0) scale(1.01); }
    100% { transform: translate3d(0.35%, 0.25%, 0) scale(1.015); }
  }

  @keyframes portfolioNoisePan {
    0% { transform: translate3d(0, 0, 0); }
    25% { transform: translate3d(-2%, 1.5%, 0); }
    50% { transform: translate3d(1%, -1%, 0); }
    75% { transform: translate3d(2%, 2%, 0); }
    100% { transform: translate3d(-1%, -1.5%, 0); }
  }
`

export const DEFAULT_POST_COMPOSITE = {
  overallOpacity: 0.96,
  contrast: 1.14,
  brightness: 1.03,
  saturate: 1.16,
  sepia: 0.05,
  hueRotateDeg: 0,
  blurPx: 0.7,
  bloomPx: 12,
  bloomOpacity: 0.2,
  chromaticAberrationPx: 2,
  tintColor: '#0cff92',
  tintStrength: 0.14,
  secondaryTintColor: '#ffbd08',
  secondaryTintStrength: 0.06,
  scanlineOpacity: 0.18,
  scanlineSize: 3,
  scanlineBlurPx: 0.5,
  grilleOpacity: 0.28,
  grilleSize: 4,
  noiseOpacity: 0.085,
  noiseScale: 140,
  flickerOpacity: 0.05,
  ghostOpacity: 0.12,
  glareOpacity: 0.16,
  vignetteOpacity: 0.22,
  frameOpacity: 0.52,
  frameRadius: 1,
  frameBorder: 'rgba(235, 255, 245, 0.22)',
  frameHighlight: 'rgba(255, 255, 255, 0.42)',
  frameShadow: 'rgba(0, 0, 0, 0.18)',
  frameTint: 'rgba(180, 255, 220, 0.08)',
  y2kChromeA: '#edfc19',
  y2kChromeB: '#00f38e',
  cornerDecoOpacity: 0.34,
  animate: true,
}

export function buildPostCompositeFilter(composite = DEFAULT_POST_COMPOSITE) {
  return [
    `contrast(${composite.contrast})`,
    `brightness(${composite.brightness})`,
    `saturate(${composite.saturate})`,
    `sepia(${composite.sepia})`,
    `hue-rotate(${composite.hueRotateDeg}deg)`,
    `blur(${composite.blurPx}px)`,
    `drop-shadow(${-composite.chromaticAberrationPx}px 0 0 rgba(255, 84, 160, 0.22))`,
    `drop-shadow(${composite.chromaticAberrationPx}px 0 0 rgba(95, 255, 223, 0.18))`,
    `drop-shadow(0 0 ${composite.bloomPx}px rgba(160, 255, 220, ${composite.bloomOpacity}))`,
  ].join(' ')
}

function useCompositeKeyframes() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    let styleElement = document.getElementById(STYLE_ELEMENT_ID)
    let createdHere = false

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = STYLE_ELEMENT_ID
      styleElement.textContent = KEYFRAME_CSS
      document.head.appendChild(styleElement)
      createdHere = true
    }

    return () => {
      if (createdHere) {
        styleElement.remove()
      }
    }
  }, [])
}

function PostCompositeOverlayInner({
  composite = DEFAULT_POST_COMPOSITE,
  progress = 0,
  enabled = true,
}) {
  // Early bail if disabled – prevents rendering and keyframe injection
  if (!enabled) return null

  useCompositeKeyframes()

  const layerShift = useMemo(
    () => Math.sin(progress * Math.PI * 2) * composite.chromaticAberrationPx,
    [composite.chromaticAberrationPx, progress]
  )

  const flickerAnimation = composite.animate
    ? 'portfolioCompositeFlicker 7s steps(1) infinite'
    : 'none'

  const driftAnimation = composite.animate
    ? 'portfolioCompositeDrift 16s ease-in-out infinite alternate'
    : 'none'

  const noiseAnimation = composite.animate
    ? 'portfolioNoisePan 0.45s steps(3) infinite'
    : 'none'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        opacity: composite.overallOpacity,
        borderRadius: composite.frameRadius,
        overflow: 'hidden',
        animation: flickerAnimation,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: composite.frameRadius,
          background: `
            radial-gradient(circle at 50% 46%, rgba(255,255,255,0.05), transparent 48%),
            linear-gradient(135deg, ${composite.frameTint}, transparent 40%, rgba(0,0,0,0.12))
          `,
          boxShadow: `
            inset 0 0 0 1px ${composite.frameBorder},
            inset 0 1px 0 ${composite.frameHighlight},
            inset 0 -22px 46px ${composite.frameShadow},
            0 0 0 1px rgba(255,255,255,0.04)
          `,
          opacity: composite.frameOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 8,
          borderRadius: Math.max(18, composite.frameRadius - 10),
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 0 24px rgba(255,255,255,0.06)',
          opacity: composite.cornerDecoOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '2.5% 2%',
          borderRadius: Math.max(16, composite.frameRadius - 8),
          background: `
            radial-gradient(circle at 20% 14%, rgba(255,255,255,0.2), transparent 22%),
            radial-gradient(circle at 80% 0%, rgba(255,255,255,0.16), transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%, transparent 74%, rgba(0,0,0,0.18))
          `,
          mixBlendMode: 'screen',
          opacity: composite.glareOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${composite.tintColor}, transparent 62%)`,
          mixBlendMode: 'color-dodge',
          opacity: composite.tintStrength,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, transparent 18%, ${composite.secondaryTintColor} 52%, transparent 82%)`,
          mixBlendMode: 'soft-light',
          opacity: composite.secondaryTintStrength,
          transform: `translate3d(${layerShift * 0.22}px, ${-layerShift * 0.16}px, 0)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '-1%',
          background: `
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.12) 0,
              rgba(255, 255, 255, 0.12) 1px,
              rgba(0, 0, 0, 0.16) 1px,
              rgba(0, 0, 0, 0.16) ${composite.scanlineSize}px
            )
          `,
          backgroundSize: `100% ${composite.scanlineSize}px`,
          opacity: composite.scanlineOpacity,
          mixBlendMode: 'soft-light',
          filter: `blur(${composite.scanlineBlurPx}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to right,
              rgba(255, 90, 140, 0.08) 0,
              rgba(255, 90, 140, 0.08) 1px,
              rgba(120, 255, 230, 0.06) 1px,
              rgba(120, 255, 230, 0.06) 2px,
              rgba(255, 230, 140, 0.04) 2px,
              rgba(255, 230, 140, 0.04) ${composite.grilleSize}px
            )
          `,
          backgroundSize: `${composite.grilleSize}px 100%`,
          opacity: composite.grilleOpacity,
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '-18%',
          background: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 34%),
            radial-gradient(circle at 50% 50%, rgba(135,255,220,0.16), transparent 52%),
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2), transparent 72%)
          `,
          mixBlendMode: 'screen',
          opacity: composite.bloomOpacity,
          animation: driftAnimation,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, transparent 44%, rgba(0,0,0,0.18) 76%, rgba(0,0,0,0.44) 100%)',
          opacity: composite.vignetteOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '-2%',
          background: `
            radial-gradient(circle, rgba(255,255,255,0.22) 0.6px, transparent 0.8px),
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16) 0.4px, transparent 0.7px)
          `,
          backgroundSize: `${composite.noiseScale}px ${composite.noiseScale}px, ${Math.max(40, composite.noiseScale * 0.66)}px ${Math.max(40, composite.noiseScale * 0.66)}px`,
          opacity: composite.noiseOpacity,
          mixBlendMode: 'screen',
          animation: noiseAnimation,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(255, 84, 160, 0.5), transparent 32%, transparent 68%, rgba(95, 255, 223, 0.45))',
          mixBlendMode: 'screen',
          opacity: composite.ghostOpacity,
          transform: `translate3d(${layerShift}px, 0, 0) scale(1.004)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${composite.y2kChromeA}, transparent 26%, transparent 74%, ${composite.y2kChromeB})`,
          mixBlendMode: 'overlay',
          opacity: composite.flickerOpacity,
        }}
      />
    </div>
  )
}

export const PostCompositeOverlay = memo(PostCompositeOverlayInner)