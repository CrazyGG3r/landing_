function getConnection() {
  if (typeof navigator === 'undefined') return null
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection
}

export function getPortfolioPerformanceProfile() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      level: 'balanced',
      maxDpr: 1.25,
      antialias: true,
      shadowMapSize: 512,
      shadowCasters: 3,
      pickingFps: 30,
      animateComposite: true,
      vhsModelPath: 'models/vhs/VHSUnit.performance.glb',
    }
  }

  const connection = getConnection()
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  const displayPixels =
    window.innerWidth *
    window.innerHeight *
    Math.min(window.devicePixelRatio || 1, 2)

  const reduced =
    reducedMotion ||
    connection?.saveData ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === 'slow-2g' ||
    memory <= 4 ||
    cores <= 4

  if (reduced) {
    return {
      level: 'reduced',
      maxDpr: 1,
      antialias: false,
      shadowMapSize: 512,
      shadowCasters: 1,
      pickingFps: 24,
      animateComposite: false,
      vhsModelPath: 'models/vhs/VHSUnit.performance.glb',
    }
  }

  const balanced = coarsePointer || memory <= 8 || cores <= 8 || displayPixels > 4_500_000
  if (balanced) {
    return {
      level: 'balanced',
      maxDpr: 1.25,
      antialias: true,
      shadowMapSize: 512,
      shadowCasters: 3,
      pickingFps: 30,
      animateComposite: true,
      vhsModelPath: 'models/vhs/VHSUnit.performance.glb',
    }
  }

  return {
    level: 'high',
    maxDpr: 1.5,
    antialias: true,
    shadowMapSize: 1024,
    shadowCasters: Number.POSITIVE_INFINITY,
    pickingFps: 60,
    animateComposite: true,
    vhsModelPath: 'models/vhs/VHSUnit.high.glb',
  }
}

export function getPortfolioVhsModelPath() {
  return getPortfolioPerformanceProfile().vhsModelPath
}
