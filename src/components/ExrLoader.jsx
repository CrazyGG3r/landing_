import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { EXRLoader } from 'three-stdlib'

export function HDRIEnvironment({ path = '/assets/hdri/studio.exr', intensity = 1 }) {
  const { scene, gl } = useThree()

  useEffect(() => {
    const loader = new EXRLoader()
    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      scene.background = texture
      scene.environmentIntensity = intensity
    })
  }, [path, scene, gl, intensity])

  return null
}
