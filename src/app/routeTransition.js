import {
  markNavigationReady,
  markNavigationStart,
} from '../shared/performance/metrics'

export const ROUTE_TRANSITION_START = 'boltforged:route-transition-start'
export const ROUTE_TRANSITION_READY = 'boltforged:route-transition-ready'

export function startRouteTransition(detail) {
  markNavigationStart(detail)
  window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START, { detail }))
}

export function signalRouteReady(pathname) {
  markNavigationReady(pathname)
  window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_READY, {
    detail: { pathname },
  }))
}
