const routeImporters = {
  '/portfolio': () => import('../../features/portfolio/Portfolio.jsx'),
  '/entry': () => import('../../features/portfolio/EntryScene.jsx'),
}

const routeModulePromises = new Map()
const routeAssetPromises = new Map()
const documentPromises = new Map()

function normalizeRoute(pathname) {
  if (!pathname) return '/'
  const cleanPath = pathname.split(/[?#]/, 1)[0]
  return cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : cleanPath
}

function getRouteModule(pathname) {
  const route = normalizeRoute(pathname)
  const importer = routeImporters[route]
  if (!importer) return Promise.resolve(null)

  if (!routeModulePromises.has(route)) {
    const promise = importer().catch((error) => {
      routeModulePromises.delete(route)
      throw error
    })
    routeModulePromises.set(route, promise)
  }

  return routeModulePromises.get(route)
}

function primeRouteAssets(pathname) {
  const route = normalizeRoute(pathname)
  if (!routeImporters[route]) return Promise.resolve()

  if (!routeAssetPromises.has(route)) {
    const promise = import('./threeRouteAssets.js')
      .then(({ primeRouteAssets: prime }) => prime(route))
      .catch((error) => {
        routeAssetPromises.delete(route)
        throw error
      })
    routeAssetPromises.set(route, promise)
  }

  return routeAssetPromises.get(route)
}

function prefetchProjectDocument(projectId) {
  if (!projectId || !/^[A-Za-z0-9_-]+$/.test(projectId)) return Promise.resolve()

  const url = `/projects/${projectId}/document.json`
  if (!documentPromises.has(url)) {
    const promise = fetch(url, {
      cache: 'force-cache',
      credentials: 'same-origin',
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to preload ${url}`)
        return response.arrayBuffer()
      })
      .catch(() => {
        documentPromises.delete(url)
      })
    documentPromises.set(url, promise)
  }

  return documentPromises.get(url)
}

function canRunBackgroundWarmup() {
  if (typeof navigator === 'undefined') return true

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (connection?.saveData) return false
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return false
  }
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4) {
    return false
  }

  return true
}

/**
 * Starts a best-effort, non-visual warmup. Route code and parsed Three.js
 * resources are cached by their native loaders, so the real route reuses the
 * work without a duplicate download or a second parse.
 */
export function warmRoute(
  pathname,
  {
    includeAssets = true,
    intent = false,
    projectId,
  } = {},
) {
  const route = normalizeRoute(pathname)
  if (!routeImporters[route]) return Promise.resolve()
  if (!intent && !canRunBackgroundWarmup()) return Promise.resolve()

  const tasks = [getRouteModule(route)]
  if (includeAssets) tasks.push(primeRouteAssets(route))
  if (route === '/entry' && projectId) {
    tasks.push(prefetchProjectDocument(projectId))
  }

  return Promise.allSettled(tasks).then(() => undefined)
}

export function scheduleRouteWarmup(
  pathname,
  {
    timeoutMs = 1800,
    ...options
  } = {},
) {
  if (typeof window === 'undefined') return () => {}

  let cancelled = false
  const run = () => {
    if (!cancelled) void warmRoute(pathname, options)
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(run, { timeout: timeoutMs })
    return () => {
      cancelled = true
      window.cancelIdleCallback(id)
    }
  }

  const id = window.setTimeout(run, Math.min(timeoutMs, 750))
  return () => {
    cancelled = true
    window.clearTimeout(id)
  }
}

// React.lazy entry points. Direct visits prime their route assets immediately;
// speculative warmups can opt into code-only loading with includeAssets=false.
export function loadPortfolioRoute() {
  void primeRouteAssets('/portfolio').catch(() => {})
  return getRouteModule('/portfolio')
}

export function loadEntryRoute() {
  void primeRouteAssets('/entry').catch(() => {})
  return getRouteModule('/entry')
}
