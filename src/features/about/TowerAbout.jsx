import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  CameraShake,
  Center,
  MeshTransmissionMaterial,
  OrbitControls,
  Text3D,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { ChromaticAberrationEffect } from 'postprocessing'
import { Link } from 'react-router-dom'
import {
  AnimationMixer,
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  FrontSide,
  LoopOnce,
  MathUtils,
  RepeatWrapping,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import helvetiker from 'three/examples/fonts/helvetiker_bold.typeface.json'
import { ABOUT_PEOPLE, ABOUT_PEOPLE_BY_ID, ABOUT_TIERS } from './towerTeam'
import './tower-about.css'

const AVATAR_URL = '/models/about/crazygger-rigged.glb'
const PYRAMID_PATTERN_URL = '/images/about/tilemaps/boltforged-pattern-neutral.png'
const RING_PATTERN_URL = '/images/about/tilemaps/boltforged-pattern-steel-blue.png'
const FIELD_SOURCE_PERSON = ABOUT_PEOPLE_BY_ID['shaheer-ul-islam']
const FIELD_SOURCE_POSITION = [
  FIELD_SOURCE_PERSON.position[0],
  FIELD_SOURCE_PERSON.position[1] + 0.78,
  FIELD_SOURCE_PERSON.position[2],
]

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

const fieldVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = cameraPosition - worldPosition.xyz;
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const fieldFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  varying vec3 vWorldPosition;

  float hash31(vec3 point) {
    point = fract(point * 0.1031);
    point += dot(point, point.yzx + 33.33);
    return fract((point.x + point.y) * point.z);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewDirection);
    float rim = pow(1.0 - abs(dot(normal, viewDirection)), 2.7);
    float innerVeil = pow(1.0 - abs(dot(normal, viewDirection)), 0.7) * 0.035;
    float grain = hash31(floor(vWorldPosition * 15.0) + floor(uTime * 4.0));
    float movingBreakup = 0.5 + 0.5 * sin(
      dot(vWorldPosition, vec3(5.7, 8.3, 4.9)) + uTime * 2.4
    );
    float dissolve = smoothstep(0.46, 0.78, grain * 0.68 + movingBreakup * 0.32);
    float surface = mix(0.3, 1.0, dissolve);
    float alpha = (rim * 0.92 + innerVeil) * uOpacity * surface;

    if (alpha < 0.0015) discard;
    gl_FragColor = vec4(uColor * (0.92 + rim * 1.75), alpha);
  }
`

const recordDitherVertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const recordDitherFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;

  float bayer4(vec2 pixel) {
    vec2 cell = mod(floor(pixel), 4.0);

    if (cell.y < 1.0) {
      if (cell.x < 1.0) return 0.0 / 16.0;
      if (cell.x < 2.0) return 8.0 / 16.0;
      if (cell.x < 3.0) return 2.0 / 16.0;
      return 10.0 / 16.0;
    }

    if (cell.y < 2.0) {
      if (cell.x < 1.0) return 12.0 / 16.0;
      if (cell.x < 2.0) return 4.0 / 16.0;
      if (cell.x < 3.0) return 14.0 / 16.0;
      return 6.0 / 16.0;
    }

    if (cell.y < 3.0) {
      if (cell.x < 1.0) return 3.0 / 16.0;
      if (cell.x < 2.0) return 11.0 / 16.0;
      if (cell.x < 3.0) return 1.0 / 16.0;
      return 9.0 / 16.0;
    }

    if (cell.x < 1.0) return 15.0 / 16.0;
    if (cell.x < 2.0) return 7.0 / 16.0;
    if (cell.x < 3.0) return 13.0 / 16.0;
    return 5.0 / 16.0;
  }

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    vec2 resolution = max(uResolution, vec2(1.0));
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 centered = uv - 0.5;
    float aspect = resolution.x / resolution.y;
    centered.x *= aspect;

    float slowBand = 0.5 + 0.5 * sin(uv.y * 12.0 - uTime * 0.62);
    float crossBand = 0.5 + 0.5 * sin((uv.x + uv.y) * 18.0 + uTime * 0.34);
    float bloom = exp(-3.2 * dot(centered, centered));
    float field = 0.11 + slowBand * 0.055 + crossBand * 0.035 + bloom * 0.105;

    vec2 ditherOffset = floor(vec2(uTime * 5.0, uTime * 2.5));
    float orderedDither = step(bayer4(gl_FragCoord.xy + ditherOffset), field);
    float grain = hash21(floor(gl_FragCoord.xy * 0.5) + floor(uTime * 3.0));
    float flicker = step(0.986, grain) * (0.35 + bloom * 0.65);
    float edge = smoothstep(0.78, 1.0, abs(uv.x * 2.0 - 1.0));

    vec3 cyan = vec3(0.18, 0.66, 0.79);
    vec3 deepBlue = vec3(0.035, 0.16, 0.22);
    vec3 color = mix(deepBlue, cyan, slowBand * 0.44 + bloom * 0.3);
    color *= 0.4 + orderedDither * 0.9 + flicker * 1.8;

    float alpha = 0.035 + orderedDither * (0.12 + bloom * 0.08) + flicker * 0.16 + edge * 0.025;
    gl_FragColor = vec4(color, alpha);
  }
`

function RecordWindowShader() {
  const materialRef = useRef(null)
  const { gl, size } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
    }),
    [],
  )

  useEffect(() => {
    const pixelRatio = gl.getPixelRatio()
    uniforms.uResolution.value.set(size.width * pixelRatio, size.height * pixelRatio)
  }, [gl, size.height, size.width, uniforms])

  useFrame((_, delta) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={recordDitherVertexShader}
        fragmentShader={recordDitherFragmentShader}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  )
}

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

function BackdropTeamTitle() {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const liveNoise = Math.sin(clock.elapsedTime * 0.72) * 0.004

    groupRef.current.position.x = liveNoise
    groupRef.current.position.y = 4.4
    groupRef.current.rotation.z = liveNoise * 0.035
  })

  const material = (
    <meshStandardMaterial
      color="#9ff5ff"
      emissive="#4bb9c9"
      emissiveIntensity={1.35}
      metalness={0.5}
      roughness={0.24}
      depthTest
      toneMapped={false}
    />
  )

  return (
    <group ref={groupRef} position={[0, 4.4, -4.2]} renderOrder={-2}>
      <Center position={[0, 1.55, 0]}>
        <Text3D
          font={helvetiker}
          size={4.1}
          height={0.12}
          curveSegments={3}
          bevelEnabled
          bevelSize={0.016}
          bevelThickness={0.02}
        >
          OUR
          {material}
        </Text3D>
      </Center>
      <Center position={[0, -1.55, 0]}>
        <Text3D
          font={helvetiker}
          size={4.1}
          height={0.12}
          curveSegments={3}
          bevelEnabled
          bevelSize={0.016}
          bevelThickness={0.02}
        >
          TEAM
          {material}
        </Text3D>
      </Center>
    </group>
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

function PsionicField({ pulseId, onScreenOrigin }) {
  const liquidShellRef = useRef(null)
  const spectralShellRefs = useRef([])
  const startedAtRef = useRef(-10000)
  const projectedOriginRef = useRef(new Vector3())
  const lastScreenOriginRef = useRef({ x: -1000, y: -1000 })

  const spectralUniforms = useMemo(
    () => ['#ff3157', '#55eaff'].map(color => ({
      uColor: { value: new Color(color) },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
    })),
    [],
  )

  useEffect(() => {
    if (pulseId === 0) return undefined
    startedAtRef.current = performance.now()
    return undefined
  }, [pulseId])

  useFrame(({ camera, clock, size }) => {
    const elapsed = (performance.now() - startedAtRef.current) / 1000
    const local = elapsed / 4.2
    const progress = MathUtils.clamp(local, 0, 1)
    const eased = 1 - Math.pow(1 - progress, 2)
    const waveScale = MathUtils.lerp(0.2, 8.5, eased)
    const isReleased = pulseId > 0 && local > 0
    const isSettled = local >= 1
    const liquidVibration = isSettled
      ? 1 + Math.sin(clock.elapsedTime * 1.55) * 0.009
      : 1

    if (liquidShellRef.current) {
      liquidShellRef.current.scale.setScalar(waveScale * liquidVibration)
      liquidShellRef.current.rotation.y = progress * 0.12
        + (isSettled ? Math.sin(clock.elapsedTime * 0.82) * 0.008 : 0)
      liquidShellRef.current.rotation.z = isSettled
        ? Math.sin(clock.elapsedTime * 1.12) * 0.01
        : 0
    }

    projectedOriginRef.current.fromArray(FIELD_SOURCE_POSITION).project(camera)
    const screenX = (projectedOriginRef.current.x * 0.5 + 0.5) * size.width
    const screenY = (-projectedOriginRef.current.y * 0.5 + 0.5) * size.height
    const lastOrigin = lastScreenOriginRef.current
    if (
      onScreenOrigin
      && (Math.abs(screenX - lastOrigin.x) > 0.5 || Math.abs(screenY - lastOrigin.y) > 0.5)
    ) {
      lastOrigin.x = screenX
      lastOrigin.y = screenY
      onScreenOrigin(screenX, screenY)
    }

    spectralShellRefs.current.forEach((shell, index) => {
      if (!shell) return
      const spectralVibration = isSettled
        ? 1 + Math.sin(clock.elapsedTime * (1.85 + index * 0.16) + index * 1.7) * 0.012
        : 1
      const spectralScale = waveScale
        * spectralVibration
        * (index === 0 ? 0.992 : 1.012)
      shell.visible = isReleased
      shell.scale.setScalar(spectralScale)
      shell.rotation.y = progress * 0.08
        + (isSettled ? Math.sin(clock.elapsedTime * 0.68 + index) * 0.01 : 0)
      shell.rotation.z = isSettled
        ? Math.cos(clock.elapsedTime * 0.74 + index) * 0.008
        : 0
      shell.position.x = (index === 0 ? -0.024 : 0.024)
        + (isSettled ? Math.sin(clock.elapsedTime * 1.32 + index) * 0.01 : 0)
      shell.material.uniforms.uOpacity.value = isReleased ? 0.024 : 0
      shell.material.uniforms.uTime.value = Math.max(elapsed, 0) * 0.18
    })
  })

  return (
    <group position={FIELD_SOURCE_POSITION}>
      <pointLight color="#73dce8" intensity={3.2} distance={7.2} decay={2} />

      {pulseId > 0 && (
        <mesh ref={liquidShellRef} renderOrder={8}>
          <sphereGeometry args={[1, 96, 64]} />
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            transmission={1}
            roughness={0.04}
            thickness={0.14}
            ior={1.1}
            chromaticAberration={0.15}
            anisotropicBlur={0.04}
            distortion={0.08}
            distortionScale={0.35}
            temporalDistortion={0.02}
            attenuationDistance={15}
            attenuationColor="#c7eff0"
            side={DoubleSide}
            backside
            backsideThickness={0.11}
            transparent
          />
        </mesh>
      )}

      {[0, 1].map(index => (
        <mesh
          key={index}
          ref={element => { spectralShellRefs.current[index] = element }}
          visible={false}
          renderOrder={9 + index}
        >
          <sphereGeometry args={[1, 72, 44]} />
          <shaderMaterial
            uniforms={spectralUniforms[index]}
            vertexShader={fieldVertexShader}
            fragmentShader={fieldFragmentShader}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function PulsePostEffects() {
  const chromaticEffect = useMemo(
    () => new ChromaticAberrationEffect({
      offset: new Vector2(0.00035, -0.000195),
      radialModulation: false,
      modulationOffset: 0.15,
    }),
    [],
  )

  useEffect(() => () => chromaticEffect.dispose(), [chromaticEffect])

  return (
    <EffectComposer multisampling={0}>
      <primitive object={chromaticEffect} />
    </EffectComposer>
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

function PyramidControls({ pulseId }) {
  const controlsRef = useRef(null)
  const { camera, size } = useThree()
  const compactView = size.width < 760
  const focusY = compactView ? 3.05 : 3.52
  const fieldStartedAtRef = useRef(-10000)

  useEffect(() => {
    fieldStartedAtRef.current = performance.now()
  }, [pulseId])

  useFrame(() => {
    if (!controlsRef.current) return
    const elapsed = (performance.now() - fieldStartedAtRef.current) / 1000
    controlsRef.current.autoRotate = elapsed > 4.2
  })

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
      zoomSpeed={0.45}
      enablePan={false}
      minDistance={compactView ? 12.8 : 9.7}
      maxDistance={compactView ? 15.4 : 12.4}
      minPolarAngle={Math.PI * 0.32}
      maxPolarAngle={Math.PI * 0.64}
    />
  )
}

function TowerScene({ hoveredId, onHover, onOpen, pulseId, onFieldOrigin }) {
  return (
    <>
      <color attach="background" args={['#020305']} />
      <fog attach="fog" args={['#020305', 14, 31]} />
      <PyramidControls pulseId={pulseId} />
      <CameraShake
        maxYaw={0.00055}
        maxPitch={0.0004}
        maxRoll={0.00022}
        yawFrequency={0.16}
        pitchFrequency={0.19}
        rollFrequency={0.13}
        intensity={1}
        decay={false}
      />

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

      <BackdropTeamTitle />

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

      <PsionicField pulseId={pulseId} onScreenOrigin={onFieldOrigin} />
      <PulsePostEffects />

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

function RecordModelAberration() {
  const effect = useMemo(
    () => new ChromaticAberrationEffect({
      offset: new Vector2(0.0035, -0.0019),
      radialModulation: false,
      modulationOffset: 0.15,
    }),
    [],
  )

  useEffect(() => () => effect.dispose(), [effect])

  useFrame(({ clock }) => {
    const drift = 0.0032 + (0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.35)) * 0.0016
    effect.offset.set(drift, -drift * 0.54)
  })

  return (
    <EffectComposer multisampling={0}>
      <primitive object={effect} />
    </EffectComposer>
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
        <div className="about-record-shader" aria-hidden="true">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 1], zoom: 1 }}
            dpr={[1, 1.25]}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          >
            <RecordWindowShader />
          </Canvas>
        </div>

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
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <RotatingRecordModel person={person} />
              </Suspense>
              <RecordModelAberration />
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
  const [pulseId, setPulseId] = useState(0)
  const [fieldActive, setFieldActive] = useState(false)
  const pageRef = useRef(null)
  const fieldFrameRef = useRef(null)
  const selectedPerson = selectedId ? ABOUT_PEOPLE_BY_ID[selectedId] : null

  const releaseField = useCallback(() => {
    window.cancelAnimationFrame(fieldFrameRef.current)
    setFieldActive(false)

    fieldFrameRef.current = window.requestAnimationFrame(() => {
      setPulseId(value => value + 1)
      setFieldActive(true)
    })
  }, [])

  const updateFieldOrigin = useCallback((x, y) => {
    if (!pageRef.current) return
    pageRef.current.style.setProperty('--field-x', `${x}px`)
    pageRef.current.style.setProperty('--field-y', `${y}px`)
  }, [])

  useEffect(() => () => {
    window.cancelAnimationFrame(fieldFrameRef.current)
    document.body.style.cursor = ''
  }, [])

  return (
    <main ref={pageRef} className={`about-page${fieldActive ? ' about-page--field-active' : ''}`}>
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
            pulseId={pulseId}
            onFieldOrigin={updateFieldOrigin}
          />
        </Canvas>
      </div>

      <div className="about-atmosphere" aria-hidden="true" />

      {fieldActive && (
        <div key={pulseId} className="about-field-overlay" aria-hidden="true">
          <span className="about-field-overlay__veil" />
          <span className="about-field-overlay__wave" />
        </div>
      )}

      <header className="about-header">
        <Link to="/" className="about-home-link" aria-label="Return to BOLTFORGED home">
          <span className="about-home-mark">BF</span>
          <span>BOLTFORGED / ABOUT</span>
        </Link>
        <span className="about-build-label">BABEL STRUCTURE · LIVE LEDGER</span>
      </header>

      <nav className="about-tier-nav" aria-label="Tower hierarchy">
        {ABOUT_TIERS.map(tier => (
          <div key={tier.id} className="about-tier-key">
            <span>{tier.index}</span>
            <strong>{tier.label}</strong>
          </div>
        ))}
      </nav>

      <div className="about-instruction">
        <div className="about-instruction-copy">
          <span className="about-instruction-line" />
          FIELD HELD FROM SHAHEER · DRAG TO INSPECT
        </div>
        <button type="button" className="about-field-trigger" onClick={releaseField}>
          RELEASE FIELD
        </button>
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
