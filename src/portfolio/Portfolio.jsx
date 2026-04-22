import React, {
  useState, useMemo, useRef, useEffect,
  useLayoutEffect, Suspense, useCallback,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScroll, Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'
import SceneLoader from './SceneLoader'
import { MetaballHalftone } from './Metaballhalftone'
import { MetaballCursorR3F, buildMetaballObjects } from './MetaballCursor'
import { MetaballCursorOverlay } from './MetaballCursorOverlay'

// ============= CONFIGURATION =============
const CONFIG = {
  // Model
  modelPath: 'scenes/Scene1.glb',

  // Camera path — must match exact object name in the GLB (case-insensitive)
  cameraPathObjectName: 'CameraPath',
  startMarkerName: 'Path_Start',
  endMarkerName: 'Path_End',

  // Direction: true = travel end→start
  reverseDirection: true,

  // Controls
  enableOrbitControls: false,

  // Visual
  backgroundColor: '#111122',
  environmentPreset: 'city',

  // Lighting
  ambientIntensity: 0.5,
  directionalLightIntensity: 1.0,
  directionalLightPosition: [10, 20, 5],

  // Camera
  cameraFOV: 60,
  cameraDefaultPosition: [0, 2, 5],

  // Path
  pathLookAheadDistance: 2.5,
  curveTension: 0.5,
  curveSampleMultiplier: 5,
  markerSearchSamples: 1500,
  pathInnerMarginStartPercent: 1,
  pathInnerMarginEndPercent: 0,

  // Camera smoothing
  enableCameraSmoothing: true,
  cameraLerpSharpness: 10,
  cameraInertiaEnabled: true,
  cameraInertiaStrength: 60,
  cameraInertiaDamping: 14,

  // UI
  showScrollIndicator: false,
  scrollIndicatorText: 'SCROLL TO EXPLORE',
  showProgressHUD: false,

  // MetaballCursor
  showMetaballCursor: true,

  // Debug
  debugMode: false,

  // Skybox — dynamic linear gradient
  useGradientSkybox: true,
  skyboxRadius: 500,
  startCenterColor: '#ccfff0',
  startEdgeColor: '#006b4f',
  endCenterColor: '#cfff99',
  endEdgeColor: '#2a9e00',
  skyboxIntensity: 1,

  // Static vignette — brightness only, preserves color character better
  useStaticVignette: true,
  vignetteStrength: 0.26,
  vignetteSoftness: [0.28, 1.08],
  vignetteScale: [1.12, 1.02],
  vignetteOffset: [0.0, -0.02],
  vignetteCenterLift: 0.06,

  // New: camera-aware vignette drift
  vignetteFollowCamera: true,
  vignetteFollowStrength: 0.12,
  vignetteFollowLerp: 4.5,


  // Additional ambient light to complement gradient feel
  extraAmbientColor: '#c0c0d0',
  extraAmbientIntensity: 2.0,
}

// ============= CURVE UTILITIES =============
function buildCurveFromPoints(points) {
  if (!points || points.length < 2) return null
  const unique = [points[0]]
  for (let i = 1; i < points.length; i++) {
    if (points[i].distanceTo(points[i - 1]) > 0.01) unique.push(points[i])
  }
  const base = new THREE.CatmullRomCurve3(unique, false, 'catmullrom', CONFIG.curveTension)
  const spaced = base.getSpacedPoints(Math.max(200, unique.length * CONFIG.curveSampleMultiplier))
  return new THREE.CatmullRomCurve3(spaced, false, 'catmullrom', CONFIG.curveTension)
}

function findClosestTOnCurve(curve, targetPos) {
  if (!curve || !targetPos) return 0
  const tmp = new THREE.Vector3()
  let closestT = 0
  let minDist = Infinity

  for (let i = 0; i <= CONFIG.markerSearchSamples; i++) {
    const t = i / CONFIG.markerSearchSamples
    curve.getPointAt(t, tmp)
    const d = tmp.distanceTo(targetPos)
    if (d < minDist) {
      minDist = d
      closestT = t
    }
  }

  return closestT
}

function buildTrimmedCurve(curve, rawStartT, rawEndT) {
  if (!curve) return null
  const startT = Math.min(rawStartT, rawEndT)
  const endT = Math.max(rawStartT, rawEndT)
  const len = Math.max(200, Math.round(curve.getLength() * 5))
  const pts = []

  for (let i = 0; i <= len; i++) {
    const t = startT + (endT - startT) * (i / len)
    pts.push(curve.getPointAt(t))
  }

  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', CONFIG.curveTension)
}

// ============= PATH EXTRACTOR =============
function extractPathFromObject(scene, pathObject, startMarkerName, endMarkerName) {
  const markers = { start: null, end: null }

  scene.traverse((child) => {
    if (!markers.start && child.name === startMarkerName) {
      const p = new THREE.Vector3()
      child.getWorldPosition(p)
      markers.start = p
      console.log('🎯 Start marker at:', p)
    }
    if (!markers.end && child.name === endMarkerName) {
      const p = new THREE.Vector3()
      child.getWorldPosition(p)
      markers.end = p
      console.log('🎯 End marker at:', p)
    }
  })

  const pathPoints = []
  const geom = pathObject?.geometry

  if (geom?.attributes?.position) {
    pathObject.visible = false

    const pos = geom.attributes.position
    const idx = geom.index?.array ?? null
    pathObject.updateWorldMatrix(true, false)

    const push = (i) => {
      const pt = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
      pathObject.localToWorld(pt)
      pathPoints.push(pt)
    }

    if (idx && idx.length > 1) {
      for (let i = 0; i < idx.length; i++) push(idx[i])
    } else {
      for (let i = 0; i < pos.count; i++) push(i)
    }

    console.log(`📍 Path: ${pathPoints.length} points from "${pathObject.name}" (${pathObject.type})`)
  } else if (pathObject) {
    console.warn(`⚠️ Path object "${pathObject.name}" (${pathObject.type}) has no geometry.`)
    pathObject.traverse((child) => {
      if (child === pathObject) return
      const cg = child.geometry
      if (!cg?.attributes?.position) return
      child.updateWorldMatrix(true, false)
      const pos = cg.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const pt = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        child.localToWorld(pt)
        pathPoints.push(pt)
      }
      console.log(`   → ${pathPoints.length} points from child "${child.name}"`)
    })
  } else {
    console.warn('⚠️ No path object found. Check CONFIG.cameraPathObjectName.')
  }

  return { pathPoints, markers }
}

// ============= MARKER PATH CAMERA =============
function MarkerPathCamera({ curve, ready, onInitialPoseApplied }) {
  const scroll = useScroll()
  const { camera } = useThree()

  const lookAheadRef = useRef(new THREE.Vector3())
  const tempRef = useRef(new THREE.Vector3())
  const prevRef = useRef(new THREE.Vector3())
  const dirRef = useRef(new THREE.Vector3())
  const fallbackTargetRef = useRef(new THREE.Vector3())
  const lastTRef = useRef(null)
  const currentTRef = useRef(null)
  const velocityTRef = useRef(0)
  const initializedRef = useRef(false)
  const notifiedRef = useRef(false)
  const scrollPrimedRef = useRef(false)

  const mapScrollToCurveT = useCallback((rawT) => {
    const normalized = THREE.MathUtils.clamp(CONFIG.reverseDirection ? 1 - rawT : rawT, 0, 1)
    const sm = THREE.MathUtils.clamp(CONFIG.pathInnerMarginStartPercent ?? 0, 0, 99.9) / 100
    const em = THREE.MathUtils.clamp(CONFIG.pathInnerMarginEndPercent ?? 0, 0, 99.9) / 100
    const ism = CONFIG.reverseDirection ? em : sm
    const iem = CONFIG.reverseDirection ? sm : em
    const is = ism
    const ie = 1 - iem
    if (is >= ie) return 0.5
    return is + (ie - is) * normalized
  }, [])

  const getRawScrollOffset = useCallback(() => {
    if (scroll?.el) {
      if (scroll.horizontal) {
        const max = Math.max(1, scroll.el.scrollWidth - scroll.el.clientWidth)
        return scroll.el.scrollLeft / max
      }
      const max = Math.max(1, scroll.el.scrollHeight - scroll.el.clientHeight)
      return scroll.el.scrollTop / max
    }
    return typeof scroll?.offset === 'number' ? scroll.offset : 0
  }, [scroll])

  const primeScroll = useCallback(() => {
    if (!scroll?.el || scrollPrimedRef.current) return
    const ratio = 0.01
    if (scroll.horizontal) {
      scroll.el.scrollLeft = Math.max(0, scroll.el.scrollWidth - scroll.el.clientWidth) * ratio
    } else {
      scroll.el.scrollTop = Math.max(0, scroll.el.scrollHeight - scroll.el.clientHeight) * ratio
    }
    scrollPrimedRef.current = true
  }, [scroll])

  const applyPoseAtT = useCallback((t) => {
    if (!curve) return
    const pos = curve.getPointAt(t, tempRef.current)
    camera.position.copy(pos)

    const len = Math.max(0.0001, curve.getLength())
    const delta = CONFIG.pathLookAheadDistance / len
    const lookT = Math.min(1, t + delta)

    if (lookT !== t) {
      camera.lookAt(curve.getPointAt(lookT, lookAheadRef.current))
      return
    }

    const prevT = Math.max(0, t - delta)
    const prevPt = curve.getPointAt(prevT, prevRef.current)
    dirRef.current.copy(pos).sub(prevPt)
    if (dirRef.current.lengthSq() > 1e-12) {
      dirRef.current.normalize()
      fallbackTargetRef.current.copy(pos).add(dirRef.current)
      camera.lookAt(fallbackTargetRef.current)
    }
  }, [curve, camera])

  useLayoutEffect(() => {
    if (!curve || !ready || !scroll) return
    primeScroll()
    const rawT = getRawScrollOffset()
    const targetT = mapScrollToCurveT(rawT)
    currentTRef.current = targetT
    velocityTRef.current = 0
    applyPoseAtT(targetT)
    lastTRef.current = targetT
    initializedRef.current = true
    if (!notifiedRef.current) {
      notifiedRef.current = true
      onInitialPoseApplied?.()
    }
  }, [curve, ready, scroll]) // eslint-disable-line

  useEffect(() => {
    if (!ready) {
      initializedRef.current = false
      notifiedRef.current = false
      scrollPrimedRef.current = false
      lastTRef.current = null
      currentTRef.current = null
      velocityTRef.current = 0
    }
  }, [ready, curve])

  useFrame((_, delta) => {
    if (!scroll || !curve || !ready || !initializedRef.current) return

    const rawT = getRawScrollOffset()
    const targetT = mapScrollToCurveT(rawT)

    if (currentTRef.current === null) currentTRef.current = targetT

    let nextT = targetT
    if (CONFIG.enableCameraSmoothing) {
      if (CONFIG.cameraInertiaEnabled) {
        let vel = velocityTRef.current
        vel += (targetT - currentTRef.current) * CONFIG.cameraInertiaStrength * delta
        vel *= Math.exp(-CONFIG.cameraInertiaDamping * delta)
        nextT = THREE.MathUtils.clamp(currentTRef.current + vel * delta, 0, 1)
        velocityTRef.current = vel
      } else {
        const a = 1 - Math.exp(-CONFIG.cameraLerpSharpness * delta)
        nextT = THREE.MathUtils.lerp(currentTRef.current, targetT, a)
        velocityTRef.current = 0
      }
    } else {
      velocityTRef.current = 0
    }

    currentTRef.current = nextT

    if (lastTRef.current === null || Math.abs(nextT - lastTRef.current) > 0.00005) {
      applyPoseAtT(nextT)
      lastTRef.current = nextT
    }
  }, 0)

  return null
}

// ============= PROGRESS TRACKER =============
function ProgressTracker({ onProgress }) {
  const scroll = useScroll()
  useFrame(() => {
    if (scroll && typeof scroll.offset === 'number') onProgress(scroll.offset)
  })
  return null
}

// ============= INITIAL SCROLL PRIMER =============
function InitialScrollPrimer({ enabled, percent = 0.01, onDone }) {
  const scroll = useScroll()
  const doneRef = useRef(false)

  useEffect(() => {
    if (!enabled || doneRef.current || !scroll?.el) return
    let r1 = 0
    let r2 = 0

    const apply = () => {
      const el = scroll.el
      const ratio = THREE.MathUtils.clamp(percent, 0, 1)
      if (scroll.horizontal) {
        el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth) * ratio
      } else {
        el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight) * ratio
      }
      doneRef.current = true
      onDone?.()
    }

    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(apply)
    })

    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [enabled, scroll, percent, onDone])

  useEffect(() => {
    if (!enabled) doneRef.current = false
  }, [enabled])

  return null
}

// ============= LOADING INDICATOR =============
function LoadingIndicator() {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      background: 'rgba(0,0,0,0.75)',
      padding: '20px 32px',
      borderRadius: 10,
      fontFamily: 'monospace',
      fontSize: 14,
      zIndex: 3000,
      letterSpacing: '0.05em',
    }}>
      Loading scene…
    </div>
  )
}

// ============= DYNAMIC LINEAR GRADIENT SKYBOX =============
function GradientSkybox({
  radius = 500,
  startCenterColor = '#ffffff',
  startEdgeColor = '#d0d0d0',
  endCenterColor = '#2a2a2a',
  endEdgeColor = '#0a0a0a',
  intensity = 1.0,
  progress = 0.0,
  direction = 'vertical',
  vignetteEnabled = true,
  vignetteStrength = 0.26,
  vignetteSoftness = [0.28, 1.08],
  vignetteScale = [1.12, 1.02],
  vignetteOffset = [0.0, -0.02],
  vignetteCenterLift = 0.06,
  vignetteFollowCamera = true,
  vignetteFollowStrength = 0.12,
  vignetteFollowLerp = 4.5,
}) {
  const { size, camera } = useThree()

  const followRef = useRef(new THREE.Vector2())
  const lookDirRef = useRef(new THREE.Vector3())

  const material = useMemo(() => (
    new THREE.ShaderMaterial({
      uniforms: {
        startCenter: { value: new THREE.Color(startCenterColor) },
        startEdge: { value: new THREE.Color(startEdgeColor) },
        endCenter: { value: new THREE.Color(endCenterColor) },
        endEdge: { value: new THREE.Color(endEdgeColor) },
        intensity: { value: intensity },
        progress: { value: progress },
        aspect: { value: size.height > 0 ? size.width / size.height : 1 },
        gradientAxis: { value: direction === 'horizontal' ? 1.0 : 0.0 },
        vignetteEnabled: { value: vignetteEnabled ? 1.0 : 0.0 },
        vignetteStrength: { value: vignetteStrength },
        vignetteSoftness: { value: new THREE.Vector2(...vignetteSoftness) },
        vignetteScale: { value: new THREE.Vector2(...vignetteScale) },
        vignetteOffset: { value: new THREE.Vector2(...vignetteOffset) },
        vignetteCenterLift: { value: vignetteCenterLift },
        cameraInfluence: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = normalize(worldPosition.xyz);
          vLocalPosition = normalize(position.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 startCenter;
        uniform vec3 startEdge;
        uniform vec3 endCenter;
        uniform vec3 endEdge;
        uniform float intensity;
        uniform float progress;
        uniform float aspect;
        uniform float gradientAxis;
        uniform float vignetteEnabled;
        uniform float vignetteStrength;
        uniform vec2 vignetteSoftness;
        uniform vec2 vignetteScale;
        uniform vec2 vignetteOffset;
        uniform float vignetteCenterLift;
        uniform vec2 cameraInfluence;

        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;

        void main() {
          float axis = mix(vWorldPosition.y, vWorldPosition.x, gradientAxis);
          float t = (axis + 1.0) * 0.5;

          vec3 centerColor = mix(startCenter, endCenter, progress);
          vec3 edgeColor = mix(startEdge, endEdge, progress);
          vec3 color = mix(centerColor, edgeColor, t);

          if (vignetteEnabled > 0.5) {
            vec2 uv = vLocalPosition.xy;
            uv.x *= aspect;
            uv = uv * vignetteScale + vignetteOffset + cameraInfluence;

            float d = length(uv);
            float mask = smoothstep(vignetteSoftness.x, vignetteSoftness.y, d);

            float edgeDarken = 1.0 - mask * vignetteStrength;
            float centerBrighten = 1.0 + pow(max(0.0, 1.0 - mask), 1.8) * vignetteCenterLift;

            color *= edgeDarken * centerBrighten;
          }

          gl_FragColor = vec4(max(color, vec3(0.0)) * intensity, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    })
  ), [
    startCenterColor,
    startEdgeColor,
    endCenterColor,
    endEdgeColor,
    intensity,
    progress,
    size.width,
    size.height,
    direction,
    vignetteEnabled,
    vignetteStrength,
    vignetteSoftness,
    vignetteScale,
    vignetteOffset,
    vignetteCenterLift,
  ])

  useEffect(() => {
    material.uniforms.startCenter.value.set(startCenterColor)
    material.uniforms.startEdge.value.set(startEdgeColor)
    material.uniforms.endCenter.value.set(endCenterColor)
    material.uniforms.endEdge.value.set(endEdgeColor)
    material.uniforms.intensity.value = intensity
    material.uniforms.progress.value = progress
    material.uniforms.aspect.value = size.height > 0 ? size.width / size.height : 1
    material.uniforms.gradientAxis.value = direction === 'horizontal' ? 1.0 : 0.0
    material.uniforms.vignetteEnabled.value = vignetteEnabled ? 1.0 : 0.0
    material.uniforms.vignetteStrength.value = vignetteStrength
    material.uniforms.vignetteSoftness.value.set(...vignetteSoftness)
    material.uniforms.vignetteScale.value.set(...vignetteScale)
    material.uniforms.vignetteOffset.value.set(...vignetteOffset)
    material.uniforms.vignetteCenterLift.value = vignetteCenterLift
  }, [
    material,
    startCenterColor,
    startEdgeColor,
    endCenterColor,
    endEdgeColor,
    intensity,
    progress,
    size.width,
    size.height,
    direction,
    vignetteEnabled,
    vignetteStrength,
    vignetteSoftness,
    vignetteScale,
    vignetteOffset,
    vignetteCenterLift,
  ])

  useFrame((_, delta) => {
    if (!vignetteEnabled || !vignetteFollowCamera) {
      followRef.current.lerp(new THREE.Vector2(0, 0), 1 - Math.exp(-vignetteFollowLerp * delta))
      material.uniforms.cameraInfluence.value.copy(followRef.current)
      return
    }

    camera.getWorldDirection(lookDirRef.current)

    const targetX = -lookDirRef.current.x * vignetteFollowStrength
    const targetY = -lookDirRef.current.y * vignetteFollowStrength

    followRef.current.lerp(
      new THREE.Vector2(targetX, targetY),
      1 - Math.exp(-vignetteFollowLerp * delta),
    )

    material.uniforms.cameraInfluence.value.copy(followRef.current)
  })

  useEffect(() => () => material.dispose(), [material])

  return (
    <mesh material={material} renderOrder={0}>
      <sphereGeometry args={[radius, 64, 32]} />
    </mesh>
  )
}

// ============= MAIN COMPONENT =============
export default function Portfolio() {
  const [pathPoints, setPathPoints] = useState([])
  const [markers, setMarkers] = useState({ start: null, end: null })
  const [trimInfo, setTrimInfo] = useState({ startT: 0, endT: 1 })
  const [trimmedCurve, setTrimmedCurve] = useState(null)
  const [initialScrollPrimed, setScrollPrimed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [cameraReady, setCameraReady] = useState(false)
  const [error, setError] = useState(null)

  const [metaballObjects, setMetaballObjects] = useState([])
  const metaballStateRef = useRef(null)

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (!trimmedCurve || isLoading) {
      setScrollPrimed(false)
      setCameraReady(false)
    }
  }, [trimmedCurve, isLoading])

  const fullCurve = useMemo(() => buildCurveFromPoints(pathPoints), [pathPoints])

  useEffect(() => {
    if (!fullCurve || !markers.start || !markers.end) return
    const rawStartT = findClosestTOnCurve(fullCurve, markers.start)
    const rawEndT = findClosestTOnCurve(fullCurve, markers.end)
    const normStart = Math.min(rawStartT, rawEndT)
    const normEnd = Math.max(rawStartT, rawEndT)
    setTrimInfo({ startT: normStart, endT: normEnd, rawStartT, rawEndT })
    setTrimmedCurve(buildTrimmedCurve(fullCurve, rawStartT, rawEndT))
    console.log(`📐 Path trimmed: ${(normStart * 100).toFixed(1)}% → ${(normEnd * 100).toFixed(1)}%`)
    setIsLoading(false)
  }, [fullCurve, markers])

  const handleSceneLoad = useCallback((loadedScene, gltf, meshInfo) => {
    const { pathObject, interactiveMeshes } = meshInfo

    let resolvedPath = pathObject
    if (!resolvedPath) {
      const needle = CONFIG.cameraPathObjectName.toLowerCase().trim()
      loadedScene.traverse((child) => {
        if (resolvedPath) return
        if (child.name.toLowerCase().trim() === needle) resolvedPath = child
      })
      if (resolvedPath) {
        console.log(`🔍 Path found via fallback: "${resolvedPath.name}" (${resolvedPath.type})`)
      }
    }

    const { pathPoints: pts, markers: markerPos } = extractPathFromObject(
      loadedScene,
      resolvedPath,
      CONFIG.startMarkerName,
      CONFIG.endMarkerName,
    )

    setPathPoints(pts)
    setMarkers(markerPos)

    if (interactiveMeshes.length > 0) {
      const objs = buildMetaballObjects(interactiveMeshes)
      setMetaballObjects(objs)
      console.log(`🫧 MetaballCursor: ${objs.length} objects registered`)
      objs.forEach((o, i) => console.log(`   [${i}] "${o.label}" (${o.geometry.attributes.position.count} verts, stride ${o.stride})`))
    } else {
      console.warn('⚠️ No interactive meshes found — MetaballCursor will be inactive.')
    }

    if (pts.length < 2) {
      console.error(
        `❌ Path extraction failed (${pts.length} points).\n` +
        '   Set CONFIG.cameraPathObjectName to match an object listed above.',
      )
      setIsLoading(false)
    }
  }, [])

  const handleError = useCallback((err) => {
    if (err && !err.type?.includes('progress')) {
      console.error('❌ Scene load failed:', err)
      setError(err.message)
    }
    setIsLoading(false)
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const a = t * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * 5, Math.sin(a) * 2, Math.sin(a * 2) * 3))
    }
    setPathPoints(pts)
    setMarkers({ start: pts[0], end: pts[pts.length - 1] })
  }, [])

  const handleInitialPoseApplied = useCallback(() => setCameraReady(true), [])
  const handleInitialScrollPrimed = useCallback(() => setScrollPrimed(true), [])
  const handleMetaballReady = useCallback((state) => {
    metaballStateRef.current = state
  }, [])

  const effectiveProgress = CONFIG.reverseDirection ? 1 - progress : progress

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {CONFIG.debugMode && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.9)',
          padding: 15,
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: 12,
          zIndex: 2000,
          pointerEvents: 'none',
          borderLeft: `4px solid ${markers.start && markers.end ? '#4caf50' : '#ff9800'}`,
        }}>
          <div><strong>🔍 PORTFOLIO DEBUG</strong></div>
          <div>Path points: {pathPoints.length}</div>
          <div>Start marker: {markers.start ? '✅' : '❌'}</div>
          <div>End marker:   {markers.end ? '✅' : '❌'}</div>
          <div>Interactive meshes: {metaballObjects.length}</div>
          <div>Camera ready: {cameraReady ? '✅' : '⏳'}</div>
          {CONFIG.reverseDirection && (
            <div style={{ color: '#ffaa00' }}>🔁 Direction: REVERSED</div>
          )}
          {trimInfo.startT !== undefined && trimInfo.endT !== undefined && (
            <>
              <div>
                Range: {(trimInfo.startT * 100).toFixed(1)}%
                {' → '}
                {(trimInfo.endT * 100).toFixed(1)}%
              </div>
              {trimInfo.rawStartT > trimInfo.rawEndT && (
                <div style={{ color: '#ffaa00' }}>🔄 Markers auto-swapped</div>
              )}
              <div>Scroll: {(progress * 100).toFixed(1)}%</div>
              {CONFIG.reverseDirection && (
                <div>Camera t: {(effectiveProgress * 100).toFixed(1)}%</div>
              )}
              <div style={{ marginTop: 8 }}>
                <div style={{ width: 200, height: 4, background: '#333', borderRadius: 2, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: `${trimInfo.startT * 100}%`,
                    width: `${(trimInfo.endT - trimInfo.startT) * 100}%`,
                    height: '100%',
                    background: '#4caf50',
                    borderRadius: 2,
                    opacity: 0.7,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: `${effectiveProgress * 100}%`,
                    width: 4,
                    height: 12,
                    background: 'yellow',
                    transform: 'translateX(-2px) translateY(-4px)',
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          background: 'rgba(200,0,0,0.85)',
          padding: 20,
          borderRadius: 8,
          zIndex: 3000,
          fontFamily: 'monospace',
        }}>
          Error: {error}
        </div>
      )}

      {(isLoading || !cameraReady) && <LoadingIndicator />}

      {CONFIG.showProgressHUD && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.7)',
          padding: '12px 20px',
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: 14,
          zIndex: 1000,
          pointerEvents: 'none',
        }}>
          <div>Scroll: {(progress * 100).toFixed(1)}%</div>
          {CONFIG.reverseDirection && (
            <div>Camera: {(effectiveProgress * 100).toFixed(1)}%</div>
          )}
          <div style={{ width: 200, height: 4, background: '#333', marginTop: 8, borderRadius: 2 }}>
            <div style={{ width: `${effectiveProgress * 100}%`, height: '100%', background: '#4caf50', borderRadius: 2 }} />
          </div>
        </div>
      )}

      {CONFIG.showScrollIndicator && (
        <div style={{
          position: 'fixed',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          padding: '10px 20px',
          borderRadius: 30,
          fontFamily: 'sans-serif',
          fontSize: 14,
          letterSpacing: 1,
          zIndex: 1000,
          pointerEvents: 'none',
        }}>
          ↓ {CONFIG.scrollIndicatorText} ↓
        </div>
      )}

      <div
        ref={scrollContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: CONFIG.showMetaballCursor ? 'none' : 'auto',
        }}
      >
        <Canvas
          camera={{ position: CONFIG.cameraDefaultPosition, fov: CONFIG.cameraFOV }}
          style={{
            background: CONFIG.useGradientSkybox ? 'transparent' : CONFIG.backgroundColor,
            width: '100%',
            height: '100%',
            opacity: cameraReady ? 1 : 0,
            transition: 'opacity 500ms ease',
            display: 'block',
          }}
          frameloop="always"
          shadows
          gl={{
            antialias: true,
            alpha: CONFIG.useGradientSkybox,
          }}
        >
          <ScrollControls pages={5} damping={0.1}>
            <InitialScrollPrimer
              enabled={!isLoading && !initialScrollPrimed}
              percent={0.01}
              onDone={handleInitialScrollPrimed}
            />

            {CONFIG.useGradientSkybox && (
              <GradientSkybox
                radius={CONFIG.skyboxRadius}
                startCenterColor={CONFIG.startCenterColor}
                startEdgeColor={CONFIG.startEdgeColor}
                endCenterColor={CONFIG.endCenterColor}
                endEdgeColor={CONFIG.endEdgeColor}
                intensity={CONFIG.skyboxIntensity}
                progress={effectiveProgress}
                direction="vertical"
                vignetteEnabled={CONFIG.useStaticVignette}
                vignetteStrength={CONFIG.vignetteStrength}
                vignetteSoftness={CONFIG.vignetteSoftness}
                vignetteScale={CONFIG.vignetteScale}
                vignetteOffset={CONFIG.vignetteOffset}
                vignetteCenterLift={CONFIG.vignetteCenterLift}
                vignetteFollowCamera={CONFIG.vignetteFollowCamera}
                vignetteFollowStrength={CONFIG.vignetteFollowStrength}
                vignetteFollowLerp={CONFIG.vignetteFollowLerp}
              />

            )}

            <ambientLight intensity={CONFIG.ambientIntensity} />
            {CONFIG.useGradientSkybox && (
              <ambientLight color={CONFIG.extraAmbientColor} intensity={CONFIG.extraAmbientIntensity} />
            )}
            <Environment preset={CONFIG.environmentPreset} background={false} />
            <directionalLight
              position={CONFIG.directionalLightPosition}
              intensity={CONFIG.directionalLightIntensity}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />

            <Suspense fallback={null}>
              <SceneLoader
                modelPath={CONFIG.modelPath}
                pathObjectName={CONFIG.cameraPathObjectName}
                onLoad={handleSceneLoad}
                onError={handleError}
              />
            </Suspense>

            {trimmedCurve && (
              <MarkerPathCamera
                curve={trimmedCurve}
                ready={!isLoading && initialScrollPrimed}
                onInitialPoseApplied={handleInitialPoseApplied}
              />
            )}

            <ProgressTracker onProgress={setProgress} />

            {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
              <MetaballCursorR3F
                objects={metaballObjects}
                eventTarget={scrollContainerRef}
                onStateReady={handleMetaballReady}
              />
            )}

            {CONFIG.enableOrbitControls && <OrbitControls makeDefault />}
          </ScrollControls>
        </Canvas>
      </div>

      {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
        <MetaballCursorOverlay
          objects={metaballObjects}
          stateRef={metaballStateRef}
          containerWidth={300}
          containerHeight={120}
        />
      )}
      {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
        <MetaballHalftone
          objects={metaballObjects}
          stateRef={metaballStateRef}
        />
      )}
    </div>
  )
}
