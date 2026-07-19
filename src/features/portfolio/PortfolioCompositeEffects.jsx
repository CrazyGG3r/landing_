import React, { memo, useEffect, useMemo } from 'react'

const STYLE_ELEMENT_ID = 'portfolio-composite-keyframes'

const KEYFRAME_CSS = `
  @keyframes portfolioAtmosphereBreathe {
    0% { transform: translate3d(-0.25%, -0.15%, 0) scale(1.015); }
    100% { transform: translate3d(0.25%, 0.18%, 0) scale(1.025); }
  }

  @keyframes portfolioFilmGrain {
    0% { transform: translate3d(0, 0, 0); }
    20% { transform: translate3d(-1.5%, 1%, 0); }
    40% { transform: translate3d(1%, -1.5%, 0); }
    60% { transform: translate3d(1.5%, 1.25%, 0); }
    80% { transform: translate3d(-1%, -0.75%, 0); }
    100% { transform: translate3d(0.5%, 1.5%, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-portfolio-composite] > * {
      animation: none !important;
    }
  }
`

const FILM_GRAIN_TEXTURE = `url("data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.78"
        numOctaves="3"
        seed="11"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" opacity="0.82" />
  </svg>
`)}")`

export const DEFAULT_POST_COMPOSITE = {
  // Photographic response: keep model detail crisp and avoid crushed colors.
  contrast: 1.075,
  brightness: 0.97,
  saturate: 0.9,
  sepia: 0.035,
  hueRotateDeg: -2,

  // Liminal palette: cool shadow air with a weak tungsten highlight.
  shadowTint: '#6f918c',
  highlightTint: '#e2bd91',
  atmosphereOpacity: 0.16,
  halationOpacity: 0.075,
  halationBlurPx: 34,
  glassGlareOpacity: 0.1,

  // Analog texture should be felt before it is consciously noticed.
  scanlineOpacity: 0.045,
  scanlineSize: 4,
  grainOpacity: 0.052,
  grainSize: 180,
  chromaticEdgeOpacity: 0.032,

  vignetteOpacity: 0.68,
  overallOpacity: 1,
  animate: true,
}

export function buildPostCompositeFilter(composite = DEFAULT_POST_COMPOSITE) {
  const settings = { ...DEFAULT_POST_COMPOSITE, ...composite }

  return [
    `contrast(${settings.contrast})`,
    `brightness(${settings.brightness})`,
    `saturate(${settings.saturate})`,
    `sepia(${settings.sepia})`,
    `hue-rotate(${settings.hueRotateDeg}deg)`,
  ].join(' ')
}

function useCompositeKeyframes(enabled) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

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
      if (createdHere) styleElement.remove()
    }
  }, [enabled])
}

function PostCompositeOverlayInner({
  composite = DEFAULT_POST_COMPOSITE,
  progress = 0,
  enabled = true,
}) {
  useCompositeKeyframes(enabled)

  const settings = useMemo(
    () => ({ ...DEFAULT_POST_COMPOSITE, ...composite }),
    [composite],
  )

  if (!enabled) return null

  const lightX = 44 + progress * 10
  const lightY = 38 + Math.sin(progress * Math.PI) * 4
  const atmosphereAnimation = settings.animate
    ? 'portfolioAtmosphereBreathe 14s ease-in-out infinite alternate'
    : 'none'
  const grainAnimation = settings.animate
    ? 'portfolioFilmGrain 0.72s steps(2, end) infinite'
    : 'none'

  return (
    <div
      data-portfolio-composite=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
        opacity: settings.overallOpacity,
        isolation: 'isolate',
        transform: 'translateZ(0)',
      }}
    >
      {/* Slow environmental color separation, not a full-screen tint wash. */}
      <div
        style={{
          position: 'absolute',
          inset: '-3%',
          background: `
            radial-gradient(
              ellipse at ${lightX}% ${lightY}%,
              ${settings.highlightTint} 0%,
              transparent 50%
            ),
            linear-gradient(
              122deg,
              ${settings.shadowTint} 0%,
              transparent 34%,
              transparent 67%,
              ${settings.highlightTint} 100%
            )
          `,
          mixBlendMode: 'soft-light',
          opacity: settings.atmosphereOpacity,
          animation: atmosphereAnimation,
        }}
      />

      {/* A restrained pool of halation gives bright surfaces photographic weight. */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          background: `
            radial-gradient(
              ellipse at ${lightX}% ${lightY}%,
              rgba(255, 226, 192, 0.58) 0%,
              rgba(255, 208, 164, 0.16) 28%,
              transparent 58%
            )
          `,
          filter: `blur(${settings.halationBlurPx}px)`,
          mixBlendMode: 'screen',
          opacity: settings.halationOpacity,
          animation: atmosphereAnimation,
        }}
      />

      {/* Very soft lens/glass response, strongest along the upper edge. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 18% -8%, rgba(255,255,255,0.3), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 19%)
          `,
          mixBlendMode: 'screen',
          opacity: settings.glassGlareOpacity,
        }}
      />

      {/* Fine horizontal structure hints at tape/CRT without obscuring geometry. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.07) 0,
              rgba(255,255,255,0.07) 1px,
              rgba(0,0,0,0.08) 1px,
              rgba(0,0,0,0.08) 2px,
              transparent 2px,
              transparent ${settings.scanlineSize}px
            )
          `,
          mixBlendMode: 'soft-light',
          opacity: settings.scanlineOpacity,
        }}
      />

      {/* True high-frequency monochrome grain replaces the old large dot pattern. */}
      <div
        style={{
          position: 'absolute',
          inset: '-3%',
          backgroundImage: FILM_GRAIN_TEXTURE,
          backgroundRepeat: 'repeat',
          backgroundSize: `${settings.grainSize}px ${settings.grainSize}px`,
          mixBlendMode: 'soft-light',
          opacity: settings.grainOpacity,
          animation: grainAnimation,
        }}
      />

      {/* Chromatic character is limited to the optical periphery. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              90deg,
              rgba(182, 78, 92, 0.44) 0%,
              transparent 8%,
              transparent 92%,
              rgba(65, 142, 151, 0.42) 100%
            )
          `,
          mixBlendMode: 'screen',
          opacity: settings.chromaticEdgeOpacity,
        }}
      />

      {/* One optical vignette frames both the scene and foreground VHS objects. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(
              ellipse at 50% 46%,
              transparent 42%,
              rgba(5, 8, 8, 0.12) 68%,
              rgba(3, 5, 5, 0.52) 100%
            )
          `,
          opacity: settings.vignetteOpacity,
        }}
      />
    </div>
  )
}

export const PostCompositeOverlay = memo(PostCompositeOverlayInner)
