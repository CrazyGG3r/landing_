import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, OrbitControls, Text3D, useGLTF, useTexture } from '@react-three/drei'
import { Link } from 'react-router-dom'
import {
  AnimationMixer,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  FrontSide,
  LoopOnce,
  MathUtils,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3,
} from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import helvetiker from 'three/examples/fonts/helvetiker_bold.typeface.json'
import { ABOUT_PEOPLE, ABOUT_PEOPLE_BY_ID, ABOUT_TIERS } from './towerTeam'
import './tower-about.css'

const AVATAR_URL = '/models/about/crazygger-rigged.glb'
const PYRAMID_PATTERN_URL = '/images/about/tilemaps/boltforged-pattern-neutral.png'
const RING_PATTERN_URL = '/images/about/tilemaps/boltforged-pattern-steel-blue.png'

const towerVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = cameraPosition - worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const towerFragmentShader = /* glsl */ `
  uniform vec3 uAccent;
  uniform sampler2D uPattern;
  uniform float uPatternScale;
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  varying vec3 vWorldPosition;

  vec4 sampleBoxMappedPattern(vec3 position, vec3 surfaceNormal) {
    vec3 normal = normalize(surfaceNormal);
    vec3 blend = pow(abs(normal), vec3(8.0));
    blend /= max(blend.x + blend.y + blend.z, 0.0001);

    vec2 uvX = position.zy;
    vec2 uvY = position.xz;
    vec2 uvZ = position.xy;
    uvX.x *= normal.x < 0.0 ? -1.0 : 1.0;
    uvY.x *= normal.y < 0.0 ? -1.0 : 1.0;
    uvZ.x *= normal.z < 0.0 ? -1.0 : 1.0;

    vec4 projectionX = texture2D(uPattern, uvX * uPatternScale);
    vec4 projectionY = texture2D(uPattern, uvY * uPatternScale);
    vec4 projectionZ = texture2D(uPattern, uvZ * uPatternScale);
    return projectionX * blend.x + projectionY * blend.y + projectionZ * blend.z;
  }

  void main() {
    vec3 viewDirection = normalize(vViewDirection);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDirection)), 2.25);
    vec3 pattern = sampleBoxMappedPattern(vWorldPosition, vNormal).rgb;
    vec3 base = mix(
      vec3(0.006, 0.011, 0.016),
      pattern * vec3(0.28, 0.31, 0.33),
      0.82
    );
    vec3 signal = uAccent * fresnel * 0.3;
    gl_FragColor = vec4(base + signal, 1.0);
  }
`

function useTiledTexture(url) {
  const { gl } = useThree()
  const texture = useTexture(url)

  useEffect(() => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    texture.needsUpdate = true
  }, [gl, texture])

  return texture
}

function TowerMaterial({ accent }) {
  const patternTexture = useTiledTexture(PYRAMID_PATTERN_URL)
  const uniforms = useMemo(
    () => ({
      uAccent: { value: new Color(accent) },
      uPattern: { value: patternTexture },
      uPatternScale: { value: 0.43 },
    }),
    [accent, patternTexture],
  )

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={towerVertexShader}
      fragmentShader={towerFragmentShader}
    />
  )
}

function TowerTier({ tier }) {
  return (
    <group>
      <mesh position={[0, tier.centerY, 0]} castShadow receiveShadow>
        <cylinderGeometry
          args={[
            tier.radiusTop,
            tier.radiusBottom,
            tier.height,
            72,
            1,
            false,
          ]}
        />
        <TowerMaterial accent={tier.accent} />
      </mesh>

      <Center position={[0, tier.centerY, tier.radiusBottom + 0.045]}>
        <Text3D
          font={helvetiker}
          size={0.13}
          height={0.02}
          curveSegments={3}
          bevelEnabled
          bevelSize={0.003}
          bevelThickness={0.004}
        >
          {`${tier.index} / ${tier.label.toUpperCase()}`}
          <meshStandardMaterial
            color={tier.accent}
            emissive={tier.accent}
            emissiveIntensity={0.42}
            metalness={0.7}
            roughness={0.26}
          />
        </Text3D>
      </Center>
    </group>
  )
}

function TowerCrown() {
  return (
    <mesh position={[0, 5.72, -0.12]} castShadow receiveShadow>
      <cylinderGeometry args={[1.12, 1.48, 1.15, 64, 1, false]} />
      <TowerMaterial accent="#dceff4" />
    </mesh>
  )
}

function createSpiralGeometry() {
  const geometry = new BufferGeometry()
  const positions = []
  const uvs = []
  const indices = []
  const segments = 240
  const turns = Math.PI * 5.35
  const tileScale = 1.15
  let distanceAlongRamp = 0
  let previousCenter = null

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments
    const theta = -Math.PI * 0.65 + turns * progress
    const radius = MathUtils.lerp(5.45, 1.42, progress)
    const y = MathUtils.lerp(0.54, 6.05, progress)
    const halfWidth = MathUtils.lerp(0.34, 0.24, progress)
    const innerRadius = radius - halfWidth
    const outerRadius = radius + halfWidth
    const inner = new Vector3(
      Math.sin(theta) * innerRadius,
      y,
      Math.cos(theta) * innerRadius,
    )
    const outer = new Vector3(
      Math.sin(theta) * outerRadius,
      y,
      Math.cos(theta) * outerRadius,
    )
    const center = inner.clone().add(outer).multiplyScalar(0.5)

    if (previousCenter) distanceAlongRamp += center.distanceTo(previousCenter)
    previousCenter = center

    positions.push(inner.x, inner.y, inner.z, outer.x, outer.y, outer.z)
    uvs.push(
      distanceAlongRamp * tileScale,
      -halfWidth * tileScale,
      distanceAlongRamp * tileScale,
      halfWidth * tileScale,
    )

    if (index < segments) {
      const start = index * 2
      indices.push(start, start + 1, start + 2)
      indices.push(start + 1, start + 3, start + 2)
    }
  }

  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function SpiralRamp() {
  const geometry = useMemo(createSpiralGeometry, [])
  const ringTexture = useTiledTexture(RING_PATTERN_URL)

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        map={ringTexture}
        color="#dce8ed"
        emissive="#0b202a"
        emissiveIntensity={0.28}
        metalness={0.78}
        roughness={0.34}
        side={DoubleSide}
      />
    </mesh>
  )
}

function useRiggedClone(poseClip, highlighted) {
  const { scene, animations } = useGLTF(AVATAR_URL)
  const materialRefs = useRef([])
  const clone = useMemo(() => {
    const result = cloneSkeleton(scene)
    const materials = []
    result.traverse(object => {
      if (!object.isMesh) return
      object.castShadow = true
      object.receiveShadow = true
      const isHelmet = object.name.toLowerCase().includes('helmet')
      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material]
      const clonedMaterials = sourceMaterials.map(material => {
        const clonedMaterial = material.clone()
        // The low-poly body contains a few intentionally open/reversed seam
        // faces. Keep those visually closed, but preserve Blender's intended
        // back-face culling on the helmet instead of making it double-sided.
        clonedMaterial.side = isHelmet ? FrontSide : DoubleSide
        clonedMaterial.shadowSide = isHelmet ? FrontSide : DoubleSide
        clonedMaterial.needsUpdate = true
        if ('envMapIntensity' in clonedMaterial) clonedMaterial.envMapIntensity = 0.7
        if ('roughness' in clonedMaterial) clonedMaterial.roughness = Math.max(0.3, clonedMaterial.roughness ?? 0.5)
        if ('metalness' in clonedMaterial) clonedMaterial.metalness = Math.max(0.12, clonedMaterial.metalness ?? 0)
        if ('emissive' in clonedMaterial) clonedMaterial.emissive = new Color('#071820')
        if ('emissiveIntensity' in clonedMaterial) clonedMaterial.emissiveIntensity = 0.06
        materials.push(clonedMaterial)
        return clonedMaterial
      })
      object.material = Array.isArray(object.material)
        ? clonedMaterials
        : clonedMaterials[0]
    })
    materialRefs.current = materials
    return result
  }, [scene])
  const mixer = useMemo(() => new AnimationMixer(clone), [clone])

  useEffect(() => {
    const clip = animations.find(animation => animation.name === poseClip) || animations[0]
    if (!clip) return undefined
    const action = mixer.clipAction(clip)
    action.reset()
    action.setLoop(LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
    mixer.update(Math.min(clip.duration, 0.08))

    return () => {
      action.stop()
      mixer.uncacheAction(clip, clone)
    }
  }, [animations, clone, mixer, poseClip])

  useEffect(
    () => () => {
      mixer.stopAllAction()
      materialRefs.current.forEach(material => material.dispose())
    },
    [mixer],
  )

  useFrame((_, delta) => {
    const smoothing = 1 - Math.exp(-delta * 10)
    materialRefs.current.forEach(material => {
      if ('emissiveIntensity' in material) {
        material.emissiveIntensity = MathUtils.lerp(
          material.emissiveIntensity,
          highlighted ? 0.72 : 0.06,
          smoothing,
        )
      }
    })
  })

  return clone
}

function AvatarModel({ poseClip, highlighted = false }) {
  const clone = useRiggedClone(poseClip, highlighted)

  return (
    <Center top>
      <primitive object={clone} dispose={null} />
    </Center>
  )
}

function AvatarPlaceholder({ person }) {
  return (
    <group position={person.position} rotation={person.rotation}>
      <mesh position={[0, 0.72, 0]}>
        <capsuleGeometry args={[0.25, 0.9, 5, 10]} />
        <meshStandardMaterial color="#162129" wireframe />
      </mesh>
    </group>
  )
}

function TowerAvatar({ person, highlighted, onHover, onOpen }) {
  const handleEnter = event => {
    event.stopPropagation()
    document.body.style.cursor = 'pointer'
    onHover(person.id)
  }

  const handleLeave = event => {
    event.stopPropagation()
    document.body.style.cursor = ''
    onHover(null)
  }

  return (
    <group
      position={person.position}
      rotation={person.rotation}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onClick={event => {
        event.stopPropagation()
        onOpen(person.id)
      }}
    >
      <group scale={0.185}>
        <AvatarModel poseClip={person.poseClip} highlighted={highlighted} />
      </group>

      {highlighted && (
        <>
          <pointLight
            position={[0, 0.95, 0.45]}
            color="#aeefff"
            intensity={5}
            distance={2.8}
            decay={2}
          />
          <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.34, 0.41, 36]} />
            <meshBasicMaterial color="#b9f3ff" transparent opacity={0.8} />
          </mesh>
        </>
      )}

      <Center position={[0, 1.64, 0.52]}>
        <Text3D
          font={helvetiker}
          size={0.09}
          height={0.018}
          curveSegments={3}
          bevelEnabled
          bevelSize={0.003}
          bevelThickness={0.004}
        >
          {person.name.toUpperCase()}
          <meshStandardMaterial
            color={highlighted ? '#ffffff' : '#8eabb4'}
            emissive={highlighted ? '#8ee8ff' : '#203039'}
            emissiveIntensity={highlighted ? 1.25 : 0.18}
            metalness={0.65}
            roughness={0.28}
          />
        </Text3D>
      </Center>
    </group>
  )
}

function PyramidControls() {
  const controlsRef = useRef(null)
  const { camera, size } = useThree()
  const compactView = size.width < 760
  const focusY = compactView ? 3.05 : 3.52

  useEffect(() => {
    camera.fov = compactView ? 53 : 41
    camera.position.set(0, focusY + 0.53, compactView ? 14 : 10.8)
    camera.updateProjectionMatrix()
    controlsRef.current?.target.set(0, focusY, 0)
    controlsRef.current?.update()
  }, [camera, compactView, focusY])

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={[0, focusY, 0]}
      enableDamping
      dampingFactor={0.075}
      autoRotate
      autoRotateSpeed={0.2}
      enableRotate
      rotateSpeed={0.45}
      enableZoom
      zoomSpeed={0.9}
      enablePan={false}
      minDistance={8.75}
      maxDistance={27}
      minPolarAngle={0.18}
      maxPolarAngle={Math.PI * 0.72}
    />
  )
}

function TowerScene({ hoveredId, onHover, onOpen }) {
  return (
    <>
      <color attach="background" args={['#020305']} />
      <fog attach="fog" args={['#020305', 14, 31]} />
      <PyramidControls />

      <ambientLight intensity={0.5} color="#b5d8e2" />
      <hemisphereLight
        color="#c8f1ff"
        groundColor="#071015"
        intensity={0.85}
      />
      <directionalLight
        position={[-7, 11, 8]}
        intensity={2.4}
        color="#e3fbff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[8, 9, 8]}
        angle={0.4}
        penumbra={0.9}
        intensity={52}
        distance={30}
        color="#5ba5bd"
      />
      <pointLight position={[0, 1, 6]} intensity={8} distance={18} color="#153b49" />

      <group>
        {ABOUT_TIERS.map(tier => <TowerTier key={tier.id} tier={tier} />)}
        <TowerCrown />
        <SpiralRamp />

        {ABOUT_PEOPLE.map(person => (
          <Suspense key={person.id} fallback={<AvatarPlaceholder person={person} />}>
            <TowerAvatar
              person={person}
              highlighted={person.id === hoveredId}
              onHover={onHover}
              onOpen={onOpen}
            />
          </Suspense>
        ))}
      </group>

      <gridHelper
        args={[34, 34, '#18323b', '#091317']}
        position={[0, -0.02, 0]}
      />
    </>
  )
}

function RotatingRecordModel({ person }) {
  const rotationRef = useRef(null)

  useFrame((_, delta) => {
    if (rotationRef.current) rotationRef.current.rotation.y -= delta * 0.48
  })

  return (
    <>
      <color attach="background" args={['#05090c']} />
      <ambientLight intensity={0.5} color="#c9f3ff" />
      <directionalLight position={[-3, 6, 5]} intensity={3.5} color="#e9fcff" />
      <pointLight position={[3, 2, 3]} intensity={9} distance={8} color="#4cacc6" />
      <group ref={rotationRef} position={[0, -2.8, 0]} scale={0.63}>
        <AvatarModel poseClip={person.poseClip} highlighted />
      </group>
      <mesh position={[0, -2.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.05, 64]} />
        <meshStandardMaterial
          color="#071116"
          emissive="#12333d"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </>
  )
}

function PersonRecordWindow({ person, onClose }) {
  const closeRef = useRef(null)
  const tier = ABOUT_TIERS.find(item => item.id === person.tier)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="about-record-backdrop"
      onPointerDown={event => {
        if (event.currentTarget === event.target) onClose()
      }}
    >
      <section
        className="about-record-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-record-name"
      >
        <header className="about-record-header">
          <span>CONTRIBUTOR RECORD / {tier.index}</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close contributor record">
            CLOSE ×
          </button>
        </header>

        <div className="about-record-content">
          <div className="about-record-information">
            <p className="about-record-kicker">{tier.label} / ACTIVE IDENTITY</p>
            <h2 id="about-record-name">{person.name}</h2>
            <p className="about-record-role">{person.role}</p>
            <div className="about-record-rule" />
            <p className="about-record-copy">{person.contribution}</p>

            <dl className="about-record-data">
              <div>
                <dt>Layer</dt>
                <dd>{tier.index} · {tier.label}</dd>
              </div>
              <div>
                <dt>Pose</dt>
                <dd>{person.poseClip.replaceAll('_', ' ')}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd><span className="about-status-dot" /> Active</dd>
              </div>
            </dl>
          </div>

          <div className="about-record-model" aria-label={`Rotating 3D representation of ${person.name}`}>
            <Canvas
              camera={{ position: [0, 0.5, 11], fov: 34, near: 0.1, far: 40 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <RotatingRecordModel person={person} />
              </Suspense>
            </Canvas>
            <span>ROTATION / RIGHT · 0.48 RAD/S</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function TowerAbout() {
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const selectedPerson = selectedId ? ABOUT_PEOPLE_BY_ID[selectedId] : null

  useEffect(() => () => {
    document.body.style.cursor = ''
  }, [])

  return (
    <main className="about-page">
      <div className="about-canvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 3.25, 16.5], fov: 41, near: 0.1, far: 80 }}
          dpr={[1, 1.5]}
          shadows
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          onPointerMissed={() => setHoveredId(null)}
        >
          <TowerScene
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onOpen={setSelectedId}
          />
        </Canvas>
      </div>

      <div className="about-atmosphere" aria-hidden="true" />

      <header className="about-header">
        <Link to="/" className="about-home-link" aria-label="Return to BOLTFORGED home">
          <span className="about-home-mark">BF</span>
          <span>BOLTFORGED / ABOUT</span>
        </Link>
        <span className="about-build-label">BABEL STRUCTURE · LIVE LEDGER</span>
      </header>

      <section className="about-intro" aria-labelledby="about-title">
        <p className="about-eyebrow">MEET THE PEOPLE BEHIND THE STRUCTURE</p>
        <h1 id="about-title">OUR<br />TEAM</h1>
        <p className="about-deck">
          The people behind the work. Every name remains visible.
        </p>
      </section>

      <nav className="about-tier-nav" aria-label="Tower hierarchy">
        {ABOUT_TIERS.map(tier => (
          <div key={tier.id} className="about-tier-key">
            <span>{tier.index}</span>
            <strong>{tier.label}</strong>
          </div>
        ))}
      </nav>

      <div className="about-instruction">
        <span className="about-instruction-line" />
        SLOW ORBIT · DRAG TO INSPECT · SCROLL TO ZOOM
      </div>

      <div className="about-access-roster">
        {ABOUT_PEOPLE.map(person => (
          <button
            key={person.id}
            type="button"
            onFocus={() => setHoveredId(person.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => setSelectedId(person.id)}
          >
            Open {person.name}, {person.role}
          </button>
        ))}
      </div>

      {selectedPerson && (
        <PersonRecordWindow
          person={selectedPerson}
          onClose={() => setSelectedId(null)}
        />
      )}
    </main>
  )
}

useGLTF.preload(AVATAR_URL)
useTexture.preload(PYRAMID_PATTERN_URL)
useTexture.preload(RING_PATTERN_URL)
