let cachedWebpSupport

const iosVideoOverrides = new Map([
  ['/takezo/TakezoPortraitFormation.webm', '/takezo/TakezoPortraitFormation.mov'],
  ['/takezo/skillset/design/BFLogoFormation.webm', '/takezo/skillset/design/BFLogoFormation.mov'],
  ['/takezo/skillset/technical/CrabRig.webm', '/takezo/skillset/technical/CrabRig.mov'],
  ['/takezo/skillset/technical/UniJointRig.webm', '/takezo/skillset/technical/UniJointRig.mov'],
])

export function isIOSDevice(environment = typeof navigator === 'undefined' ? null : navigator) {
  if (!environment) return false
  const ua = environment.userAgent || ''
  const platform = environment.platform || ''
  return /iPad|iPhone|iPod/i.test(ua)
    || (platform === 'MacIntel' && environment.maxTouchPoints > 1)
}

export function compatibleVideoSource(source, environment = typeof navigator === 'undefined' ? null : navigator) {
  if (!source || !isIOSDevice(environment)) return source
  return iosVideoOverrides.get(source) || source
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
