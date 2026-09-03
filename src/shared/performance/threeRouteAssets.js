import { useLoader } from '@react-three/fiber'
import { useEnvironment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  DEFAULT_VHS_MODEL_PATH,
  preloadVhsMaterialTextures,
} from '../../features/portfolio/vhsMaterials'
import { getPortfolioVhsModelPath } from '../../features/portfolio/performanceProfile'

const SHARED_ASSETS = {
  environment: '/hdri/vhs/Soft 2RingHighContrast.exr',
}

const ROUTE_MODELS = {
  '/portfolio': 'scenes/vhs/InitialScene.glb',
  '/entry': 'scenes/vhs/EntryScene.glb',
}

const primedRoutes = new Set()

export function primeRouteAssets(pathname) {
  const modelPath = ROUTE_MODELS[pathname]
  if (!modelPath || primedRoutes.has(pathname)) return
  primedRoutes.add(pathname)

  // Match the exact loader classes and URL strings used by the route
  // components so React Three Fiber's suspense cache is reused on mount.
  useLoader.preload(GLTFLoader, modelPath)
  const vhsModel = pathname === '/portfolio'
    ? getPortfolioVhsModelPath()
    : DEFAULT_VHS_MODEL_PATH
  useLoader.preload(GLTFLoader, vhsModel)
  useEnvironment.preload({ files: SHARED_ASSETS.environment })
  preloadVhsMaterialTextures()
}
