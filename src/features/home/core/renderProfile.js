function readConnection() {
  if (typeof navigator === 'undefined') return null
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection
}

export function getRenderProfile() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      level: 'medium',
      maxDpr: 1.25,
      animationFps: 30,
      antialias: true,
      samples: 2,
      enableDepthOfField: false,
      enableSmaa: false,
      enableLensBlur: true,
    }
  }

  const connection = readConnection()
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  const displayPixels =
    window.innerWidth *
    window.innerHeight *
    Math.min(window.devicePixelRatio || 1, 2)

  const lowPower =
    reducedMotion ||
    connection?.saveData ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === 'slow-2g' ||
    memory <= 4 ||
    cores <= 4

  const mediumPower =
    coarsePointer ||
    memory <= 8 ||
    cores <= 8 ||
    displayPixels > 4_500_000

  if (lowPower) {
    return {
      level: 'low',
      maxDpr: 1,
      animationFps: reducedMotion ? 20 : 30,
      antialias: false,
      samples: 0,
      enableDepthOfField: false,
      enableSmaa: false,
      enableLensBlur: false,
    }
  }

  if (mediumPower) {
    return {
      level: 'medium',
      maxDpr: 1.25,
      animationFps: 30,
      antialias: true,
      samples: 2,
      enableDepthOfField: false,
      enableSmaa: false,
      enableLensBlur: true,
    }
  }

  return {
    level: 'high',
    maxDpr: 1.5,
    animationFps: 60,
    antialias: true,
    samples: 4,
    enableDepthOfField: true,
    enableSmaa: true,
    enableLensBlur: true,
  }
}
