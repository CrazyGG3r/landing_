let cachedWebpSupport

export function isIOSDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''
  return /iPad|iPhone|iPod/i.test(ua)
    || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function supportsWebPImages() {
  if (cachedWebpSupport !== undefined) return cachedWebpSupport
  if (typeof document === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    cachedWebpSupport = canvas.toDataURL('image/webp').startsWith('data:image/webp')
  } catch {
    cachedWebpSupport = false
  }
  return cachedWebpSupport
}
