import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

export function FloatingPlatform({
  path = '/assets/model.glb',
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  direction = [0, 1, 0],
  bob = true,
  speed = 1,
  rotateSpeed = 0.5,
  bobIntensity = 0.1,
  orbit = true,                 // enable orbiting motion
  target = [0, 0, 0],           // coords to orbit around
  orbitRadius = 2,              // distance from target
  orbitSpeed = 0.5,             // how fast it orbits
  ...props
}) {
  const { scene } = useGLTF(path)
  const ref = useRef()

  // Make sure all meshes render both sides (prevents disappearing issue)
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide
      child.geometry.computeVertexNormals()
    }
  })

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()

    // --- ORBIT MOTION ---
    if (orbit) {
      const angle = t * orbitSpeed * speed
      const x = target[0] + Math.cos(angle) * orbitRadius
      const z = target[2] + Math.sin(angle) * orbitRadius
      const y = position[1]

      ref.current.position.set(x, y, z)
    }

    // --- BOBBING (optional) ---
    if (bob) {
      const bobOffset = Math.sin(t * 2 * speed) * bobIntensity
      const dir = new THREE.Vector3(...direction).normalize()
      ref.current.position.addScaledVector(dir, bobOffset)
    }

    // --- SELF ROTATION ---
    ref.current.rotation.y += delta * rotateSpeed * speed
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  )
}

// --- NEW: FloatingLight component ---
// Adds an orbiting, vertically-oscillating light that flies around a target.
export function FloatingLight({
  target = [0, 0, 0],
  orbitRadius = 2,
  orbitSpeed = 0.5,
  height = 1,                // base height above target
  verticalAmp = 0.25,        // vertical bob amplitude
  color = '#ffddaa',
  intensity = 2,
  distance = 10,
  decay = 2,
  castShadow = false,
  lightType = 'point',       // 'point' or 'spot'
  helper = false,            // show small sphere on light for debugging
  ...props
}) {
  const ref = useRef()
  const tmpTarget = new THREE.Vector3(...target)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    const angle = t * orbitSpeed
    const x = target[0] + Math.cos(angle) * orbitRadius
    const z = target[2] + Math.sin(angle) * orbitRadius
    const y = target[1] + height + Math.sin(t * 2) * verticalAmp

    ref.current.position.set(x, y, z)

    // If it's a spotLight, aim it at the target
    if (ref.current.target) {
      ref.current.target.position.copy(tmpTarget)
      ref.current.target.updateMatrixWorld()
    }
  })

  return (
    <>
      {lightType === 'point' && (
        <pointLight
          ref={ref}
          color={color}
          intensity={intensity}
          distance={distance}
          decay={decay}
          castShadow={castShadow}
          {...props}
        />
      )}

      {lightType === 'spot' && (
        <group>
          <spotLight
            ref={ref}
            color={color}
            intensity={intensity}
            distance={distance}
            decay={decay}
            angle={Math.PI / 6}
            penumbra={0.4}
            castShadow={castShadow}
            {...props}
          />
          {/* spotLight requires a target object in the scene to aim at */}
          <object3D position={target} />
        </group>
      )}

      {helper && (
        <mesh position={ref.current ? ref.current.position : [0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </>
  )
}
