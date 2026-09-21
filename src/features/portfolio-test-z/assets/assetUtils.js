export function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

export function makeBurstRadii(seed, count, inner, outer, randomness = 0.28) {
  const random = seededRandom(seed)
  return Array.from({ length: count * 2 }, (_, index) => {
    const base = index % 2 === 0 ? outer : inner
    return base * (1 - randomness * 0.5 + random() * randomness)
  })
}

export function radiiToPoints(radii, reveal = 1, center = 50) {
  return radii.map((radius, index) => {
    const angle = (Math.PI * 2 * index) / radii.length - Math.PI / 2
    const animatedRadius = 3 + (radius - 3) * reveal
    return `${center + Math.cos(angle) * animatedRadius},${center + Math.sin(angle) * animatedRadius}`
  }).join(' ')
}
