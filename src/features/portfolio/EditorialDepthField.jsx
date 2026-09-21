import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function createShardGeometry() {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    -1.4, -0.8, 0,
    1.65, -0.18, 0,
    -0.35, 1.2, 0,
  ], 3))
  geometry.setIndex([0, 1, 2])
  geometry.computeVertexNormals()
  return geometry
}

function createArchiveTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 512
  const context = canvas.getContext('2d')
  if (!context) return null
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = '900 430px Impact, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.lineWidth = 7
  context.strokeStyle = 'rgba(233, 227, 212, 0.72)'
  context.strokeText('ARCHIVE', canvas.width / 2, canvas.height / 2 + 18)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function EditorialDepthField({ progress = 0, enabled = true, stateRef }) {
  const rigRef = useRef(null)
  const motionRef = useRef(null)
  const nearShardRef = useRef(null)
  const farShardRef = useRef(null)
  const ringRef = useRef(null)
  const { camera } = useThree()
  const shardGeometry = useMemo(createShardGeometry, [])
  const archiveTexture = useMemo(createArchiveTexture, [])

  useEffect(() => () => {
    shardGeometry.dispose()
    archiveTexture?.dispose()
  }, [archiveTexture, shardGeometry])

  useFrame(({ clock, pointer }, delta) => {
    if (!enabled || !rigRef.current || !motionRef.current) return

    // The rig follows the authored camera, but its contents retain real depth.
    // This keeps the composition intentional along the entire Blender path while
    // still allowing scene objects to pass in front of or behind these planes.
    rigRef.current.position.copy(camera.position)
    rigRef.current.quaternion.copy(camera.quaternion)

    const localPhase = (Math.min(1, Math.max(0, progress)) * 5) % 1
    const chapterPulse = Math.sin(localPhase * Math.PI)
    const focusAmount = THREE.MathUtils.clamp(
      stateRef?.current?.cs?.anchor ?? 0,
      0,
      1,
    )

    const motion = motionRef.current
    // Keep every object in its authored part of the frame. Hover creates a
    // dramatic depth surge, rather than collapsing the whole system onto the
    // selected VHS.
    const targetX = pointer.x * 0.2
    const targetY = pointer.y * 0.13
    const targetZ = focusAmount * 8.1
    const targetScale = THREE.MathUtils.lerp(1, 1.28, focusAmount)
    motion.position.x = THREE.MathUtils.damp(motion.position.x, targetX, 6.5, delta)
    motion.position.y = THREE.MathUtils.damp(motion.position.y, targetY, 6.5, delta)
    motion.position.z = THREE.MathUtils.damp(motion.position.z, targetZ, 7.2, delta)
    motion.scale.x = THREE.MathUtils.damp(motion.scale.x, targetScale, 7.5, delta)
    motion.scale.y = THREE.MathUtils.damp(motion.scale.y, targetScale, 7.5, delta)
    motion.scale.z = THREE.MathUtils.damp(motion.scale.z, targetScale, 7.5, delta)
    motion.rotation.z = THREE.MathUtils.damp(
      motion.rotation.z,
      (progress - 0.5) * 0.055 + pointer.x * 0.012,
      3.6,
      delta,
    )

    const elapsed = clock.elapsedTime
    if (nearShardRef.current) {
      nearShardRef.current.rotation.z = -0.44 + Math.sin(elapsed * 0.22) * 0.025
      nearShardRef.current.position.x = -3.75 + chapterPulse * 0.32
    }
    if (farShardRef.current) {
      farShardRef.current.rotation.z = 0.36 - progress * 0.18
      farShardRef.current.position.y = 1.6 + Math.sin(elapsed * 0.17) * 0.14
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = elapsed * 0.035 + progress * Math.PI * 0.35
      ringRef.current.rotation.x = 0.12 + Math.sin(elapsed * 0.14) * 0.05
    }
  })

  if (!enabled) return null

  const ignoreRaycast = () => null

  return (
    <group ref={rigRef} frustumCulled={false}>
      {/* This wordmark is deliberately the deepest graphic element. */}
      {archiveTexture && (
        <mesh
          position={[0, -0.1, -18]}
          raycast={ignoreRaycast}
          frustumCulled={false}
          renderOrder={-20}
        >
          <planeGeometry args={[15.5, 3.85]} />
          <meshBasicMaterial
            map={archiveTexture}
            transparent
            opacity={0.17}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      <group ref={motionRef}>
        {/* Deep graphic objects rest immediately above the ARCHIVE wordmark. */}
        <mesh
          ref={nearShardRef}
          geometry={shardGeometry}
          position={[-3.75, -1.55, -14.2]}
          scale={[1.7, 1.25, 1]}
          rotation={[0, 0, -0.44]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#050607"
            emissive="#111417"
            emissiveIntensity={0.24}
            roughness={0.72}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mid-depth signal-red blade. */}
        <mesh
          position={[-3.5, 1.72, -14.8]}
          rotation={[0.03, -0.07, -0.42]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <boxGeometry args={[7.2, 0.115, 0.34]} />
          <meshStandardMaterial
            color="#ee3027"
            emissive="#b8120c"
            emissiveIntensity={0.62}
            roughness={0.44}
            metalness={0.12}
          />
        </mesh>

        {/* Paper-white counter diagonal, farther back for visible parallax. */}
        <mesh
          position={[3.65, -1.72, -15.3]}
          rotation={[-0.02, 0.05, 0.48]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <boxGeometry args={[8.5, 0.055, 0.22]} />
          <meshStandardMaterial
            color="#e4ddcd"
            emissive="#8e887b"
            emissiveIntensity={0.2}
            roughness={0.78}
          />
        </mesh>

        {/* A second triangular form answers the near shard across the frame. */}
        <mesh
          ref={farShardRef}
          geometry={shardGeometry}
          position={[3.45, 1.6, -14.6]}
          scale={[1.45, 1.7, 1]}
          rotation={[0, 0, 0.36]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#ddd7c8"
            emissive="#282724"
            emissiveIntensity={0.14}
            roughness={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Oversized wire volume creates a distant technical construction line. */}
        <mesh
          position={[3.35, -0.15, -15.8]}
          rotation={[0.22, 0.38, -0.2]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <boxGeometry args={[3.4, 2.2, 1.6]} />
          <meshBasicMaterial
            color="#b9c8c5"
            wireframe
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>

        <mesh
          ref={ringRef}
          position={[-3.7, 1.48, -15.5]}
          rotation={[0.12, 0.3, 0]}
          raycast={ignoreRaycast}
          frustumCulled={false}
        >
          <torusGeometry args={[1.42, 0.018, 5, 72]} />
          <meshBasicMaterial
            color="#e4ddcd"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

export default EditorialDepthField
