import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  DEFAULT_VHS_MODEL_PATH,
  VHS_PRIMARY_MASK_PATH,
  VHS_SECONDARY_MASK_PATH,
  preloadVhsMaterialTextures,
} from '../../features/portfolio/vhsMaterials'
import { getPortfolioPerformanceProfile } from '../../features/portfolio/performanceProfile'

const ROUTE_MODELS = {
  '/portfolio': 'scenes/vhs/InitialScene.glb',
  '/entry': 'scenes/vhs/EntryScene.glb',
}

const primedRoutes = new Map()

function fetchIntoHttpCache(path) {
  const url = path.startsWith('/') ? path : `/${path}`
  return fetch(url, { cache: 'force-cache', credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to warm ${url}`)
      return response.arrayBuffer()
    })
}

export function primeRouteAssets(pathname) {
  const modelPath = ROUTE_MODELS[pathname]
  if (!modelPath) return Promise.resolve()
  if (primedRoutes.has(pathname)) return primedRoutes.get(pathname)

  // Match the exact loader classes and URL strings used by the route
  // components so React Three Fiber's suspense cache is reused on mount.
  useLoader.preload(GLTFLoader, modelPath)
  const portfolioProfile = getPortfolioPerformanceProfile()
  const vhsModel = portfolioProfile?.vhsModelPath ?? DEFAULT_VHS_MODEL_PATH
  useLoader.preload(GLTFLoader, vhsModel)
  preloadVhsMaterialTextures()

  // R3F's preload API intentionally returns void. Track the real network work
  // separately so route transitions can wait without showing a blank screen.
  const promise = Promise.allSettled([
    fetchIntoHttpCache(modelPath),
    fetchIntoHttpCache(vhsModel),
    fetchIntoHttpCache(VHS_PRIMARY_MASK_PATH),
    fetchIntoHttpCache(VHS_SECONDARY_MASK_PATH),
  ]).then(() => undefined)

  primedRoutes.set(pathname, promise)
  return promise
}
