const METRIC_LIMIT = 50
const NAVIGATION_METRIC = 'route-ready'
let activeNavigation = null

function metricStore() {
  if (typeof window === 'undefined') return null
  if (!Array.isArray(window.__BOLTFORGED_METRICS__)) {
    window.__BOLTFORGED_METRICS__ = []
  }
  return window.__BOLTFORGED_METRICS__
}

export function recordPerformanceMetric(name, duration, detail = {}) {
  if (!Number.isFinite(duration)) return

  const entry = {
    name,
    duration: Math.round(duration * 10) / 10,
    at: Date.now(),
    ...detail,
  }
  const store = metricStore()
  if (store) {
    store.push(entry)
    if (store.length > METRIC_LIMIT) store.splice(0, store.length - METRIC_LIMIT)
  }

  if (import.meta.env.DEV) {
    console.debug(`[performance] ${name}: ${entry.duration}ms`, detail)
  }
}

export function markNavigationStart(detail = {}) {
  if (typeof performance === 'undefined') return
  activeNavigation = {
    pathname: detail.pathname || null,
    startedAt: performance.now(),
  }
}

export function markNavigationReady(pathname) {
  if (typeof performance === 'undefined' || !activeNavigation) return
  if (activeNavigation.pathname && activeNavigation.pathname !== pathname) return

  recordPerformanceMetric(
    NAVIGATION_METRIC,
    performance.now() - activeNavigation.startedAt,
    { pathname },
  )
  activeNavigation = null
}
