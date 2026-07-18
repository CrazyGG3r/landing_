import { useGLTF ,Outlines } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef,useEffect,cloneElement,useState } from 'react'
import * as THREE from 'three'




export function GLBLoader({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  ...props
}) {
  const ref = useRef()
  const { scene } = useGLTF(path)

  // Basic safety: ensure meshes have correct flags (no emissive mutation here)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
        // do NOT mutate material.emissive here
        // keep materials as exported so HDRI / Bloom works correctly
        if (!child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals()
        }
      }
    })
  }, [scene, castShadow, receiveShadow])

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale} {...props}>
      <primitive object={scene} />
    </group>
  )
}

export function Orbiter({
  children,
  target = [0, 0, 0],
  radius = 3,
  speed = 0.6,
  bob = false,
  paused = false, // <--- new prop
}) {
  const ref = useRef()
  const angleRef = useRef(0)

  useFrame((_, delta) => {
    if (!paused) {
      angleRef.current += delta * speed
    }

    const x = Math.cos(angleRef.current) * radius
    const z = Math.sin(angleRef.current) * radius
    const y = bob ? Math.sin(angleRef.current * 1.5) * 0.2 : 0

    ref.current.position.set(x, y, z)
    ref.current.lookAt(new THREE.Vector3(...target))
  })

  return <group ref={ref}>{children}</group>
}

export function Platform({
  path = '/assets/model.glb',
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  ...props
}) {
  const { scene } = useGLTF(path)

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  )
}

