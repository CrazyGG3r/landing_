import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function reportSceneLoadError(error, onError) {
  if (error && !error.type?.includes('progress')) {
    console.error('❌ Failed to load scene:', error)
    onError?.(error)
  }
}

export function loadSceneAsset(modelPath, { clone = false, onError } = {}) {
  const loader = new GLTFLoader()

  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        const scene = clone ? gltf.scene.clone(true) : gltf.scene
        console.log('✅ Scene loaded successfully')
        resolve({ gltf, scene })
      },
      undefined,
      (error) => {
        reportSceneLoadError(error, onError)
        reject(error)
      }
    )
  })
}

export function useSceneLoader(modelPath, { onLoad, onError, clone = false } = {}) {
  const gltf = useLoader(GLTFLoader, modelPath, undefined, (error) => {
    reportSceneLoadError(error, onError)
  })

  const scene = useMemo(() => {
    if (!gltf?.scene) return null
    return clone ? gltf.scene.clone(true) : gltf.scene
  }, [gltf, clone])

  useEffect(() => {
    if (!scene) return

    console.log('✅ Scene loaded successfully')
    onLoad?.(scene, gltf)
  }, [gltf, scene, onLoad])

  return {
    gltf,
    scene
  }
}

export default function SceneLoader({
  modelPath,
  onLoad,
  onError,
  clone = false,
  children,
  ...props
}) {
  const { gltf, scene } = useSceneLoader(modelPath, { onLoad, onError, clone })

  if (!scene) return null

  if (typeof children === 'function') {
    return children({ scene, gltf })
  }

  return <primitive object={scene} {...props} />
}
