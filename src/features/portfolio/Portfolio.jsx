import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, ScrollControls, useProgress, useScroll } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import SceneLoader from './SceneLoader'
import VHSInstances from './VHSInstances'
import { MetaballCursorR3F, buildMetaballObjects } from './MetaballCursor'
import { MetaballCursorOverlay } from './MetaballCursorOverlay'
import {
  DEFAULT_POST_COMPOSITE,
  PostCompositeOverlay,
  buildPostCompositeFilter,
} from './PortfolioCompositeEffects'
import { INTERACTIVE_OBJECT_SCROLL_TARGETS } from './PortfolioFocusTargets'
import RetroTitle from './RetroTitle'   // adjust path as needed
import { resolveVhsProjectId } from './vhsProjects'
import { scheduleRouteWarmup, warmRoute } from '../../shared/performance/routePreloader'
import { getPortfolioPerformanceProfile } from './performanceProfile'
import { signalRouteReady, startRouteTransition } from '../../app/routeTransition'

const CONFIG = {
  modelPath: 'scenes/vhs/InitialScene.glb',
  vhsScale: 9, // uniform scale-up factor applied to every placed VHS unit
  cameraPathObjectName: 'CameraPath',
  startMarkerName: 'Path_Start',
  endMarkerName: 'Path_End',
  reverseDirection: true,
  enableOrbitControls: false,
  backgroundColor: '#111122',
  environmentPreset: null,           // disable preset
  hdriPath: '/hdri/vhs/Soft 2RingHighContrast.exr', // your HDRI file — lighting only, no skybox (Environment background stays false)
  environmentIntensity: 0.28,      // controlled reflection source; the shaft lights establish the visible hierarchy
  vhsEnvMapIntensity: 0.9,          // enough plastic response without turning every cover into chrome
  ambientIntensity: 0.12,
  directionalLightIntensity: 1.35,
  directionalLightPosition: [8, 14, 6],
  directionalLightColor: '#dcece8',
  fillLightEnabled: true,           // soft opposite-side fill so the HDRI's key side isn't the only source of shape definition
  fillLightIntensity: 0.22,
  fillLightPosition: [-7, 3, -8],
  fillLightColor: '#efc79f',
  cameraFOV: 60,
  cameraDefaultPosition: [0, 2, 5],
  pathLookAheadDistance: 2.5,
  curveTension: 0.5,
  curveSampleMultiplier: 5,
  markerSearchSamples: 1500,
  pathInnerMarginStartPercent: 1,
  pathInnerMarginEndPercent: 0,
  enableCameraSmoothing: true,
  cameraLerpSharpness: 10,
  cameraInertiaEnabled: true,
  cameraInertiaStrength: 60,
  cameraInertiaDamping: 14,
  showScrollIndicator: false,
  scrollIndicatorText: 'SCROLL TO EXPLORE',
  showProgressHUD: false,
  showMetaballCursor: true,
  enableClickToFocusObject: true,
  focusScrollDurationMs: 1200,
  cursorCommitDurationMs: 520,
  transitionFadeStartProgress: 0.6,
  transitionFadeMinMs: 500,
  transitionFadeMaxMs: 1000,
  logScrollProgress: false,
  debugMode: false,
  useGradientSkybox: true,
  skyboxRadius: 500,
  startCenterColor: '#0a100f',
  startEdgeColor: '#1c1916',
  endCenterColor: '#3c4440',
  endEdgeColor: '#111816',
  skyboxIntensity: 0.82,
  useStaticVignette: true,
  vignetteStrength: 0.16,
  vignetteSoftness: [0.36, 1.18],
  vignetteScale: [1.06, 1.0],
  vignetteOffset: [0.0, -0.02],
  vignetteCenterLift: 0.025,
  vignetteFollowCamera: true,
  vignetteFollowStrength: 0.055,
  vignetteFollowLerp: 3.5,
  extraAmbientColor: '#c0c0d0',
  extraAmbientIntensity: 0.24,
  fogColor: '#0b100f',
  fogDensity: 0.032,
  rendererExposure: 0.92,
  hoverExposureDip: 0.07,
  cameraBreathingFov: 0.12,
  hoverAccentIntensity: 14,
  hoverAccentDistance: 4.8,
  usePostComposite: true,
  postComposite: DEFAULT_POST_COMPOSITE,
}

const PROGRESS_EPSILON = 0.001
const INITIAL_SCROLL_PERCENT = 0.01
const PORTFOLIO_SCROLL_CLASS = 'portfolio-scroll-controls'
const ARCHIVE_FRAME_LEVELS = [-1.5, 0.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5]
const ARCHIVE_HALF_WIDTH = 7.2
const ARCHIVE_LIGHT_LIMIT = 4

function configureArchiveScene(scene) {
  const practicalLights = []
  let sphereIndex = 0

  scene.updateMatrixWorld(true)
  scene.traverse((child) => {
    if (!child.isMesh || !/^Sphere\d*$/.test(child.name)) return

    const sourceMaterials = Array.isArray(child.material)
      ? child.material
      : [child.material]
    const styledMaterials = sourceMaterials.map((sourceMaterial) => {
      if (!sourceMaterial) return sourceMaterial
      if (sourceMaterial.userData?.portfolioArchiveStyled) return sourceMaterial

      const material = sourceMaterial.clone()
      const authoredColor = material.color?.clone() ?? new THREE.Color('#8ca49e')
      const practicalColor = authoredColor.lerp(new THREE.Color('#aeb9b2'), 0.38)

      if (material.color) material.color.copy(practicalColor).multiplyScalar(0.72)
      if (material.emissive) {
        material.emissive.copy(practicalColor)
        material.emissiveIntensity = 1.45
      }
      if ('roughness' in material) material.roughness = 0.34
      if ('metalness' in material) material.metalness = 0.06
      material.toneMapped = true
      material.userData.portfolioArchiveStyled = true
      material.needsUpdate = true
      return material
    })

    child.material = Array.isArray(child.material)
      ? styledMaterials
      : styledMaterials[0]
    child.castShadow = false
    child.receiveShadow = false

    const worldPosition = new THREE.Vector3()
    child.getWorldPosition(worldPosition)
    const materialColor = styledMaterials.find((material) => material?.emissive)?.emissive
      ?? styledMaterials.find((material) => material?.color)?.color
      ?? new THREE.Color('#8ca49e')

    if (sphereIndex % 2 === 0 && practicalLights.length < ARCHIVE_LIGHT_LIMIT) {
      practicalLights.push({
        key: child.uuid,
        position: worldPosition.toArray(),
        color: `#${materialColor.getHexString()}`,
      })
    }
    sphereIndex += 1
  })

  return practicalLights
}

function PortfolioScrollSurface() {
  const scroll = useScroll()

  useEffect(() => {
    const element = scroll?.el
    if (!element) return undefined
    element.classList.add(PORTFOLIO_SCROLL_CLASS)
    return () => element.classList.remove(PORTFOLIO_SCROLL_CLASS)
  }, [scroll])

  return null
}

function buildCurveFromPoints(points) {
  if (!points || points.length < 2) return null

  const unique = [points[0]]
  for (let i = 1; i < points.length; i += 1) {
    if (points[i].distanceTo(points[i - 1]) > 0.01) {
      unique.push(points[i])
    }
  }

  const baseCurve = new THREE.CatmullRomCurve3(
    unique,
    false,
    'catmullrom',
    CONFIG.curveTension,
  )
  const spacedPoints = baseCurve.getSpacedPoints(
    Math.max(200, unique.length * CONFIG.curveSampleMultiplier),
  )

  return new THREE.CatmullRomCurve3(
    spacedPoints,
    false,
    'catmullrom',
    CONFIG.curveTension,
  )
}

function findClosestTOnCurve(curve, targetPos) {
  if (!curve || !targetPos) return 0

  const tempPoint = new THREE.Vector3()
  let closestT = 0
  let minDistance = Infinity

  for (let i = 0; i <= CONFIG.markerSearchSamples; i += 1) {
    const t = i / CONFIG.markerSearchSamples
    curve.getPointAt(t, tempPoint)

    const distance = tempPoint.distanceTo(targetPos)
    if (distance < minDistance) {
      minDistance = distance
      closestT = t
    }
  }

  return closestT
}

function mapCurveTToScrollOffset(curveT) {
  const startMargin = THREE.MathUtils.clamp(
    CONFIG.pathInnerMarginStartPercent ?? 0,
    0,
    99.9,
  ) / 100
  const endMargin = THREE.MathUtils.clamp(
    CONFIG.pathInnerMarginEndPercent ?? 0,
    0,
    99.9,
  ) / 100

  const innerStart = CONFIG.reverseDirection ? endMargin : startMargin
  const innerEnd = 1 - (CONFIG.reverseDirection ? startMargin : endMargin)

  if (innerStart >= innerEnd) return 0.5

  const normalized = THREE.MathUtils.clamp(
    (curveT - innerStart) / (innerEnd - innerStart),
    0,
    1,
  )

  return CONFIG.reverseDirection ? 1 - normalized : normalized
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function getTransitionFadeDuration(distance) {
  const normalizedDistance = THREE.MathUtils.clamp(Math.abs(distance), 0, 1)
  return THREE.MathUtils.lerp(
    CONFIG.transitionFadeMinMs,
    CONFIG.transitionFadeMaxMs,
    normalizedDistance,
  )
}

function buildTrimmedCurve(curve, rawStartT, rawEndT) {
  if (!curve) return null

  const startT = Math.min(rawStartT, rawEndT)
  const endT = Math.max(rawStartT, rawEndT)
  const sampleCount = Math.max(200, Math.round(curve.getLength() * 5))
  const points = []

  for (let i = 0; i <= sampleCount; i += 1) {
    const t = startT + (endT - startT) * (i / sampleCount)
    points.push(curve.getPointAt(t))
  }

  return new THREE.CatmullRomCurve3(
    points,
    false,
    'catmullrom',
    CONFIG.curveTension,
  )
}

function extractPathFromObject(scene, pathObject, startMarkerName, endMarkerName) {
  const markers = { start: null, end: null }

  scene.traverse((child) => {
    if (!markers.start && child.name === startMarkerName) {
      const position = new THREE.Vector3()
      child.getWorldPosition(position)
      markers.start = position
      console.log('🎯 Start marker at:', position)
    }

    if (!markers.end && child.name === endMarkerName) {
      const position = new THREE.Vector3()
      child.getWorldPosition(position)
      markers.end = position
      console.log('🎯 End marker at:', position)
    }
  })

  const pathPoints = []
  const geometry = pathObject?.geometry

  if (geometry?.attributes?.position) {
    pathObject.visible = false

    const positions = geometry.attributes.position
    const indices = geometry.index?.array ?? null
    pathObject.updateWorldMatrix(true, false)

    const pushPoint = (index) => {
      const point = new THREE.Vector3(
        positions.getX(index),
        positions.getY(index),
        positions.getZ(index),
      )
      pathObject.localToWorld(point)
      pathPoints.push(point)
    }

    if (indices && indices.length > 1) {
      for (let i = 0; i < indices.length; i += 1) {
        pushPoint(indices[i])
      }
    } else {
      for (let i = 0; i < positions.count; i += 1) {
        pushPoint(i)
      }
    }

    console.log(
      `📍 Path: ${pathPoints.length} points from "${pathObject.name}" (${pathObject.type})`,
    )
  } else if (pathObject) {
    console.warn(`⚠️ Path object "${pathObject.name}" (${pathObject.type}) has no geometry.`)

    pathObject.traverse((child) => {
      if (child === pathObject) return

      const childGeometry = child.geometry
      if (!childGeometry?.attributes?.position) return

      child.updateWorldMatrix(true, false)
      const positions = childGeometry.attributes.position

      for (let i = 0; i < positions.count; i += 1) {
        const point = new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i),
        )
        child.localToWorld(point)
        pathPoints.push(point)
      }

      console.log(`   → ${pathPoints.length} points from child "${child.name}"`)
    })
  } else {
    console.warn('⚠️ No path object found. Check CONFIG.cameraPathObjectName.')
  }

  return { pathPoints, markers }
}

function MarkerPathCamera({ curve, ready, onInitialPoseApplied }) {
  const scroll = useScroll()
  const { camera } = useThree()

  const lookAheadRef = useRef(new THREE.Vector3())
  const tempPointRef = useRef(new THREE.Vector3())
  const prevPointRef = useRef(new THREE.Vector3())
  const directionRef = useRef(new THREE.Vector3())
  const fallbackTargetRef = useRef(new THREE.Vector3())

  const lastTRef = useRef(null)
  const currentTRef = useRef(null)
  const velocityTRef = useRef(0)
  const initializedRef = useRef(false)
  const notifiedRef = useRef(false)
  const scrollPrimedRef = useRef(false)

  const mapScrollToCurveT = useCallback((rawT) => {
    const normalized = THREE.MathUtils.clamp(
      CONFIG.reverseDirection ? 1 - rawT : rawT,
      0,
      1,
    )

    const startMargin = THREE.MathUtils.clamp(
      CONFIG.pathInnerMarginStartPercent ?? 0,
      0,
      99.9,
    ) / 100
    const endMargin = THREE.MathUtils.clamp(
      CONFIG.pathInnerMarginEndPercent ?? 0,
      0,
      99.9,
    ) / 100

    const innerStart = CONFIG.reverseDirection ? endMargin : startMargin
    const innerEnd = 1 - (CONFIG.reverseDirection ? startMargin : endMargin)

    if (innerStart >= innerEnd) return 0.5
    return innerStart + (innerEnd - innerStart) * normalized
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

    if (scroll.horizontal) {
      scroll.el.scrollLeft =
        Math.max(0, scroll.el.scrollWidth - scroll.el.clientWidth) * INITIAL_SCROLL_PERCENT
    } else {
      scroll.el.scrollTop =
        Math.max(0, scroll.el.scrollHeight - scroll.el.clientHeight) * INITIAL_SCROLL_PERCENT
    }

    scrollPrimedRef.current = true
  }, [scroll])

  const applyPoseAtT = useCallback((t) => {
    if (!curve) return

    const position = curve.getPointAt(t, tempPointRef.current)
    camera.position.copy(position)

    const curveLength = Math.max(0.0001, curve.getLength())
    const lookDelta = CONFIG.pathLookAheadDistance / curveLength
    const lookT = Math.min(1, t + lookDelta)

    if (lookT !== t) {
      camera.lookAt(curve.getPointAt(lookT, lookAheadRef.current))
      return
    }

    const prevT = Math.max(0, t - lookDelta)
    const prevPoint = curve.getPointAt(prevT, prevPointRef.current)
    directionRef.current.copy(position).sub(prevPoint)

    if (directionRef.current.lengthSq() > 1e-12) {
      directionRef.current.normalize()
      fallbackTargetRef.current.copy(position).add(directionRef.current)
      camera.lookAt(fallbackTargetRef.current)
    }
  }, [camera, curve])

  useLayoutEffect(() => {
    if (!curve || !ready || !scroll) return

    primeScroll()

    const targetT = mapScrollToCurveT(getRawScrollOffset())
    currentTRef.current = targetT
    velocityTRef.current = 0
    lastTRef.current = targetT
    initializedRef.current = true

    applyPoseAtT(targetT)

    if (!notifiedRef.current) {
      notifiedRef.current = true
      onInitialPoseApplied?.()
    }
  }, [
    applyPoseAtT,
    curve,
    getRawScrollOffset,
    mapScrollToCurveT,
    onInitialPoseApplied,
    primeScroll,
    ready,
    scroll,
  ])

  useEffect(() => {
    if (ready) return

    initializedRef.current = false
    notifiedRef.current = false
    scrollPrimedRef.current = false
    lastTRef.current = null
    currentTRef.current = null
    velocityTRef.current = 0
  }, [curve, ready])

  useFrame((_, delta) => {
    if (!scroll || !curve || !ready || !initializedRef.current) return

    const targetT = mapScrollToCurveT(getRawScrollOffset())

    if (currentTRef.current === null) {
      currentTRef.current = targetT
    }

    let nextT = targetT

    if (CONFIG.enableCameraSmoothing) {
      if (CONFIG.cameraInertiaEnabled) {
        let velocity = velocityTRef.current
        velocity += (targetT - currentTRef.current) * CONFIG.cameraInertiaStrength * delta
        velocity *= Math.exp(-CONFIG.cameraInertiaDamping * delta)

        nextT = THREE.MathUtils.clamp(currentTRef.current + velocity * delta, 0, 1)
        velocityTRef.current = velocity
      } else {
        const alpha = 1 - Math.exp(-CONFIG.cameraLerpSharpness * delta)
        nextT = THREE.MathUtils.lerp(currentTRef.current, targetT, alpha)
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

function ProgressTracker({ onProgress, logToConsole = false, maxFps = 30 }) {
  const scroll = useScroll()
  const lastProgressRef = useRef(-1)
  const lastUpdateAtRef = useRef(-Infinity)

  useFrame(() => {
    if (!scroll || typeof scroll.offset !== 'number') return

    const nextProgress = scroll.offset
    if (Math.abs(nextProgress - lastProgressRef.current) < PROGRESS_EPSILON) return
    const now = performance.now()
    if (now - lastUpdateAtRef.current < 1000 / Math.max(1, maxFps)) return

    lastProgressRef.current = nextProgress
    lastUpdateAtRef.current = now
    onProgress(nextProgress)

    if (logToConsole) {
      console.log(`[portfolio] scroll: ${(nextProgress * 100).toFixed(2)}%`)
    }
  })

  return null
}

function VisibilityFrameLoop() {
  const { invalidate, setFrameloop } = useThree()

  useEffect(() => {
    const sync = () => {
      const visible = document.visibilityState === 'visible'
      setFrameloop(visible ? 'always' : 'never')
      if (visible) invalidate()
    }

    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      document.removeEventListener('visibilitychange', sync)
      setFrameloop('always')
    }
  }, [invalidate, setFrameloop])

  return null
}

function ShadowUpdateController({ stateRef, maxFps = 15 }) {
  const { gl } = useThree()
  const lastUpdateAtRef = useRef(-Infinity)
  const lastActiveIdRef = useRef(0)

  useEffect(() => {
    const previousAutoUpdate = gl.shadowMap.autoUpdate
    gl.shadowMap.autoUpdate = false
    gl.shadowMap.needsUpdate = true
    return () => {
      gl.shadowMap.autoUpdate = previousAutoUpdate
      gl.shadowMap.needsUpdate = true
    }
  }, [gl])

  useFrame(() => {
    const activeId = stateRef.current?.cs?.activeId ?? 0
    const now = performance.now()
    const activeChanged = activeId !== lastActiveIdRef.current
    const animationDue = activeId > 0 && now - lastUpdateAtRef.current >= 1000 / maxFps

    if (activeChanged || animationDue) {
      gl.shadowMap.needsUpdate = true
      lastUpdateAtRef.current = now
      lastActiveIdRef.current = activeId
    }
  }, -1)

  return null
}

function InitialScrollPrimer({ enabled, percent = INITIAL_SCROLL_PERCENT, onDone }) {
  const scroll = useScroll()
  const doneRef = useRef(false)

  useEffect(() => {
    if (!enabled || doneRef.current || !scroll?.el) return undefined

    let frameA = 0
    let frameB = 0

    const apply = () => {
      const ratio = THREE.MathUtils.clamp(percent, 0, 1)

      if (scroll.horizontal) {
        scroll.el.scrollLeft =
          Math.max(0, scroll.el.scrollWidth - scroll.el.clientWidth) * ratio
      } else {
        scroll.el.scrollTop =
          Math.max(0, scroll.el.scrollHeight - scroll.el.clientHeight) * ratio
      }

      doneRef.current = true
      onDone?.()
    }

    frameA = requestAnimationFrame(() => {
      frameB = requestAnimationFrame(apply)
    })

    return () => {
      cancelAnimationFrame(frameA)
      cancelAnimationFrame(frameB)
    }
  }, [enabled, onDone, percent, scroll])

  useEffect(() => {
    if (!enabled) {
      doneRef.current = false
    }
  }, [enabled])

  return null
}

function PortfolioCinematicRenderer({ progress, stateRef }) {
  const { camera, gl, scene } = useThree()
  const previousStateRef = useRef(null)

  useLayoutEffect(() => {
    previousStateRef.current = {
      fog: scene.fog,
      toneMapping: gl.toneMapping,
      toneMappingExposure: gl.toneMappingExposure,
    }

    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = CONFIG.rendererExposure
    scene.fog = new THREE.FogExp2(CONFIG.fogColor, CONFIG.fogDensity)

    return () => {
      const previous = previousStateRef.current
      if (!previous) return
      scene.fog = previous.fog
      gl.toneMapping = previous.toneMapping
      gl.toneMappingExposure = previous.toneMappingExposure
    }
  }, [gl, scene])

  useFrame(({ clock }, delta) => {
    const cursorState = stateRef.current?.cs
    const isHovering = (cursorState?.activeId ?? 0) > 0
    const hoverAmount = isHovering
      ? THREE.MathUtils.clamp(cursorState?.alpha ?? 0, 0, 1)
      : 0
    const progressLift = Math.sin(THREE.MathUtils.clamp(progress, 0, 1) * Math.PI) * 0.025
    const targetExposure = CONFIG.rendererExposure
      + progressLift
      - hoverAmount * CONFIG.hoverExposureDip

    gl.toneMappingExposure = THREE.MathUtils.damp(
      gl.toneMappingExposure,
      targetExposure,
      4.2,
      delta,
    )

    if (scene.fog?.isFogExp2) {
      const targetDensity = CONFIG.fogDensity * THREE.MathUtils.lerp(0.92, 1.08, progress)
      scene.fog.density = THREE.MathUtils.damp(
        scene.fog.density,
        targetDensity,
        2.2,
        delta,
      )
    }

    const breathing = Math.sin(clock.elapsedTime * 0.24) * CONFIG.cameraBreathingFov
    const targetFov = CONFIG.cameraFOV + breathing * (1 - hoverAmount * 0.55)
    const nextFov = THREE.MathUtils.damp(camera.fov, targetFov, 2.4, delta)
    if (Math.abs(nextFov - camera.fov) > 0.0005) {
      camera.fov = nextFov
      camera.updateProjectionMatrix()
    }
  })

  return null
}

function ArchiveShaft({ practicalLights }) {
  const frameMeshRef = useRef(null)
  const lightBarMeshRef = useRef(null)
  const lightBarMaterialRef = useRef(null)
  const dustRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const frameTransforms = useMemo(() => {
    const transforms = []
    const centerX = 0.5
    const centerZ = -0.3
    const span = ARCHIVE_HALF_WIDTH * 2

    ARCHIVE_FRAME_LEVELS.forEach((y) => {
      transforms.push(
        { position: [centerX, y, centerZ - ARCHIVE_HALF_WIDTH], scale: [span, 0.09, 0.13] },
        { position: [centerX, y, centerZ + ARCHIVE_HALF_WIDTH], scale: [span, 0.09, 0.13] },
        { position: [centerX - ARCHIVE_HALF_WIDTH, y, centerZ], scale: [0.13, 0.09, span] },
        { position: [centerX + ARCHIVE_HALF_WIDTH, y, centerZ], scale: [0.13, 0.09, span] },
      )
    })

    ;[-1, 1].forEach((xDirection) => {
      ;[-1, 1].forEach((zDirection) => {
        transforms.push({
          position: [
            centerX + xDirection * ARCHIVE_HALF_WIDTH,
            5.25,
            centerZ + zDirection * ARCHIVE_HALF_WIDTH,
          ],
          scale: [0.12, 14.5, 0.12],
        })
      })
    })

    return transforms
  }, [])

  const lightBarTransforms = useMemo(() => {
    const transforms = []
    for (let y = -0.2; y <= 12.4; y += 2.1) {
      transforms.push(
        { position: [-2.2, y, -9.08], scale: [2.25, 0.045, 0.055] },
        { position: [3.2, y, -9.08], scale: [2.25, 0.045, 0.055] },
      )
    }
    return transforms
  }, [])

  const dustGeometry = useMemo(() => {
    const count = 180
    const positions = new Float32Array(count * 3)
    let seed = 918273
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0
      return seed / 4294967296
    }

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (random() - 0.5) * 13
      positions[i * 3 + 1] = random() * 15 - 2
      positions[i * 3 + 2] = (random() - 0.5) * 13
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.computeBoundingSphere()
    return geometry
  }, [])

  useLayoutEffect(() => {
    const frameMesh = frameMeshRef.current
    const lightBarMesh = lightBarMeshRef.current

    if (frameMesh) {
      frameTransforms.forEach((transform, index) => {
        dummy.position.fromArray(transform.position)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.fromArray(transform.scale)
        dummy.updateMatrix()
        frameMesh.setMatrixAt(index, dummy.matrix)
      })
      frameMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage)
      frameMesh.instanceMatrix.needsUpdate = true
      frameMesh.computeBoundingSphere()
    }

    if (lightBarMesh) {
      lightBarTransforms.forEach((transform, index) => {
        dummy.position.fromArray(transform.position)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.fromArray(transform.scale)
        dummy.updateMatrix()
        lightBarMesh.setMatrixAt(index, dummy.matrix)
      })
      lightBarMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage)
      lightBarMesh.instanceMatrix.needsUpdate = true
      lightBarMesh.computeBoundingSphere()
    }
  }, [dummy, frameTransforms, lightBarTransforms])

  useEffect(() => () => {
    dustGeometry.dispose()
  }, [dustGeometry])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    if (dustRef.current) {
      dustRef.current.rotation.y = Math.sin(time * 0.035) * 0.018
      dustRef.current.position.y = Math.sin(time * 0.08) * 0.07
    }
    if (lightBarMaterialRef.current) {
      const lowPulse = Math.sin(time * 1.4) * 0.035
      const rareInstability = Math.pow(Math.max(0, Math.sin(time * 0.47) - 0.985), 2) * 42
      lightBarMaterialRef.current.emissiveIntensity = 1.8 + lowPulse - rareInstability
    }
  })

  return (
    <group>
      <mesh position={[0.5, 5.25, -0.3]} receiveShadow renderOrder={-30}>
        <boxGeometry args={[18.8, 19.5, 18.8]} />
        <meshStandardMaterial
          color="#111816"
          roughness={0.92}
          metalness={0.025}
          envMapIntensity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh position={[0.5, -1.9, -0.3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[17.5, 17.5]} />
        <meshStandardMaterial
          color="#171a18"
          roughness={0.48}
          metalness={0.16}
          envMapIntensity={0.34}
        />
      </mesh>

      <instancedMesh
        ref={frameMeshRef}
        args={[undefined, undefined, frameTransforms.length]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#252b29"
          roughness={0.68}
          metalness={0.24}
          envMapIntensity={0.28}
        />
      </instancedMesh>

      <instancedMesh
        ref={lightBarMeshRef}
        args={[undefined, undefined, lightBarTransforms.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={lightBarMaterialRef}
          color="#d9e1da"
          emissive="#b8cec6"
          emissiveIntensity={1.8}
          roughness={0.34}
          toneMapped={false}
        />
      </instancedMesh>

      <points ref={dustRef} geometry={dustGeometry} frustumCulled={false}>
        <pointsMaterial
          color="#d8d2c2"
          size={0.024}
          opacity={0.2}
          transparent
          depthWrite={false}
          sizeAttenuation
          fog
        />
      </points>

      {practicalLights.map((light) => (
        <pointLight
          key={light.key}
          position={light.position}
          color={light.color}
          intensity={8}
          distance={5.5}
          decay={2}
        />
      ))}
    </group>
  )
}

function HoverAccentLight({ objects, stateRef }) {
  const lightRef = useRef(null)
  const targetPositionRef = useRef(new THREE.Vector3())
  const desiredPositionRef = useRef(new THREE.Vector3())
  const cameraDirectionRef = useRef(new THREE.Vector3())
  const targetColorRef = useRef(new THREE.Color('#d7ebe4'))
  const neutralColorRef = useRef(new THREE.Color('#d7ebe4'))
  const { camera } = useThree()

  useFrame((_, delta) => {
    const light = lightRef.current
    if (!light) return

    const cursorState = stateRef.current?.cs
    const activeIndex = (cursorState?.activeId ?? 0) - 1
    const activeObject = activeIndex >= 0 ? objects[activeIndex] : null

    if (!activeObject?.renderRoot) {
      light.intensity = THREE.MathUtils.damp(light.intensity, 0, 8, delta)
      return
    }

    activeObject.renderRoot.updateWorldMatrix(true, false)
    activeObject.renderRoot.getWorldPosition(targetPositionRef.current)
    cameraDirectionRef.current
      .copy(camera.position)
      .sub(targetPositionRef.current)
      .normalize()
      .multiplyScalar(1.15)
    desiredPositionRef.current
      .copy(targetPositionRef.current)
      .add(cameraDirectionRef.current)
    desiredPositionRef.current.y += 0.45
    light.position.lerp(desiredPositionRef.current, 1 - Math.exp(-8 * delta))

    targetColorRef.current
      .copy(activeObject.blobColor ?? neutralColorRef.current)
      .lerp(neutralColorRef.current, 0.46)
    light.color.lerp(targetColorRef.current, 1 - Math.exp(-6 * delta))

    const hoverAmount = THREE.MathUtils.clamp(cursorState?.alpha ?? 0, 0, 1)
    const targetIntensity = CONFIG.hoverAccentIntensity * hoverAmount
    light.intensity = THREE.MathUtils.damp(
      light.intensity,
      targetIntensity,
      7,
      delta,
    )
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={0}
      distance={CONFIG.hoverAccentDistance}
      decay={2}
    />
  )
}

function InteractiveObjectFocusScroller({
  enabled,
  objects,
  curve,
  stateRef,
  eventTarget,
  onFocusStart,
  onPageTransition,
  durationMs = 1200,
}) {
  const scroll = useScroll()
  const animationRef = useRef(null)
  const clickLockedRef = useRef(false)

  const focusTargets = useMemo(() => {
    if (!curve || !objects?.length) return []

    const worldPosition = new THREE.Vector3()

    return objects.map((object, index) => {
      const manualTarget = INTERACTIVE_OBJECT_SCROLL_TARGETS[index] ?? {}

      object.mesh?.updateWorldMatrix(true, false)
      object.mesh?.getWorldPosition(worldPosition)

      const curveT = findClosestTOnCurve(curve, worldPosition)
      const manualScrollPercent = manualTarget.scrollPercent
      const hasManualTarget = typeof manualScrollPercent === 'number'
      const scrollOffset = hasManualTarget
        ? THREE.MathUtils.clamp(manualScrollPercent / 100, 0, 1)
        : mapCurveTToScrollOffset(curveT)

      return {
        curveT,
        scrollOffset,
        hasManualTarget,
        routePath: manualTarget.routePath,
      }
    })
  }, [curve, objects])

  useEffect(() => () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !scroll?.el || !eventTarget?.current || !focusTargets.length) {
      return undefined
    }

    const getCurrentOffset = () => {
      if (scroll.horizontal) {
        const max = Math.max(1, scroll.el.scrollWidth - scroll.el.clientWidth)
        return scroll.el.scrollLeft / max
      }

      const max = Math.max(1, scroll.el.scrollHeight - scroll.el.clientHeight)
      return scroll.el.scrollTop / max
    }

    const setOffset = (offset) => {
      const nextOffset = THREE.MathUtils.clamp(offset, 0, 1)

      if (scroll.horizontal) {
        const max = Math.max(1, scroll.el.scrollWidth - scroll.el.clientWidth)
        scroll.el.scrollLeft = max * nextOffset
        return
      }

      const max = Math.max(1, scroll.el.scrollHeight - scroll.el.clientHeight)
      scroll.el.scrollTop = max * nextOffset
    }

    const animateToOffset = (target, activeIndex) => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      const targetOffset = target.scrollOffset
      const startOffset = getCurrentOffset()
      const delta = targetOffset - startOffset
      const fadeDurationMs = getTransitionFadeDuration(delta)
      let transitionStarted = false

      if (Math.abs(delta) < 0.001) {
        setOffset(targetOffset)
        if (target.routePath) {
          onPageTransition?.(target.routePath, fadeDurationMs, activeIndex)
        }
        return
      }

      const startedAt = performance.now()
      const duration = Math.max(1, durationMs)

      const tick = (now) => {
        const t = THREE.MathUtils.clamp((now - startedAt) / duration, 0, 1)
        setOffset(startOffset + delta * easeInOutCubic(t))

        if (!transitionStarted && target.routePath && t >= CONFIG.transitionFadeStartProgress) {
          transitionStarted = true
          onPageTransition?.(target.routePath, fadeDurationMs, activeIndex)
        }

        if (t < 1) {
          animationRef.current = requestAnimationFrame(tick)
        } else {
          animationRef.current = null
          if (!transitionStarted && target.routePath) {
            onPageTransition?.(target.routePath, fadeDurationMs, activeIndex)
          }
        }
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    const handleClick = async () => {
      if (clickLockedRef.current) return

      const activeIndex = (stateRef.current?.cs?.activeId ?? 0) - 1
      const target = focusTargets[activeIndex]

      if (!target) return

      clickLockedRef.current = true
      await onFocusStart?.(activeIndex)
      animateToOffset(target, activeIndex)
    }

    const targetElement = eventTarget.current
    targetElement.addEventListener('click', handleClick)

    return () => {
      targetElement.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [durationMs, enabled, eventTarget, focusTargets, onFocusStart, onPageTransition, scroll, stateRef])

  return null
}


function GradientSkybox({
  radius = 500,
  startCenterColor = '#ffffff',
  startEdgeColor = '#d0d0d0',
  endCenterColor = '#2a2a2a',
  endEdgeColor = '#0a0a0a',
  intensity = 1,
  progress = 0,
  direction = 'vertical',
  vignetteEnabled = true,
  vignetteStrength = 0.26,
  vignetteSoftness = [0.28, 1.08],
  vignetteScale = [1.12, 1.02],
  vignetteOffset = [0, -0.02],
  vignetteCenterLift = 0.06,
  vignetteFollowCamera = true,
  vignetteFollowStrength = 0.12,
  vignetteFollowLerp = 4.5,
}) {
  const { size, camera } = useThree()

  const geometry = useMemo(() => new THREE.SphereGeometry(radius, 64, 32), [radius])
  const followRef = useRef(new THREE.Vector2())
  const targetInfluenceRef = useRef(new THREE.Vector2())
  const lookDirectionRef = useRef(new THREE.Vector3())

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
        gradientAxis: { value: direction === 'horizontal' ? 1 : 0 },
        vignetteEnabled: { value: vignetteEnabled ? 1 : 0 },
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
    direction,
    endCenterColor,
    endEdgeColor,
    intensity,
    size.height,
    size.width,
    startCenterColor,
    startEdgeColor,
    vignetteCenterLift,
    vignetteEnabled,
    vignetteOffset,
    vignetteScale,
    vignetteSoftness,
    vignetteStrength,
  ])

  useEffect(() => {
    material.uniforms.startCenter.value.set(startCenterColor)
    material.uniforms.startEdge.value.set(startEdgeColor)
    material.uniforms.endCenter.value.set(endCenterColor)
    material.uniforms.endEdge.value.set(endEdgeColor)
    material.uniforms.intensity.value = intensity
    material.uniforms.progress.value = progress
    material.uniforms.aspect.value = size.height > 0 ? size.width / size.height : 1
    material.uniforms.gradientAxis.value = direction === 'horizontal' ? 1 : 0
    material.uniforms.vignetteEnabled.value = vignetteEnabled ? 1 : 0
    material.uniforms.vignetteStrength.value = vignetteStrength
    material.uniforms.vignetteSoftness.value.set(...vignetteSoftness)
    material.uniforms.vignetteScale.value.set(...vignetteScale)
    material.uniforms.vignetteOffset.value.set(...vignetteOffset)
    material.uniforms.vignetteCenterLift.value = vignetteCenterLift
  }, [
    direction,
    endCenterColor,
    endEdgeColor,
    intensity,
    material,
    progress,
    size.height,
    size.width,
    startCenterColor,
    startEdgeColor,
    vignetteCenterLift,
    vignetteEnabled,
    vignetteOffset,
    vignetteScale,
    vignetteSoftness,
    vignetteStrength,
  ])

  useFrame((_, delta) => {
    const lerpAlpha = 1 - Math.exp(-vignetteFollowLerp * delta)

    if (!vignetteEnabled || !vignetteFollowCamera) {
      targetInfluenceRef.current.set(0, 0)
      followRef.current.lerp(targetInfluenceRef.current, lerpAlpha)
      material.uniforms.cameraInfluence.value.copy(followRef.current)
      return
    }

    camera.getWorldDirection(lookDirectionRef.current)

    targetInfluenceRef.current.set(
      -lookDirectionRef.current.x * vignetteFollowStrength,
      -lookDirectionRef.current.y * vignetteFollowStrength,
    )

    followRef.current.lerp(targetInfluenceRef.current, lerpAlpha)
    material.uniforms.cameraInfluence.value.copy(followRef.current)
  })

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  return (
    <mesh material={material} renderOrder={0}>
      <primitive object={geometry} attach="geometry" />
    </mesh>
  )
}

function DebugPanel({
  cameraReady,
  effectiveProgress,
  markers,
  metaballCount,
  pathPointCount,
  progress,
  trimInfo,
}) {
  return (
    <div
      style={{
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
      }}
    >
      <style>{`
        .${PORTFOLIO_SCROLL_CLASS} {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .${PORTFOLIO_SCROLL_CLASS}::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      <div><strong>PORTFOLIO DEBUG</strong></div>
      <div>Path points: {pathPointCount}</div>
      <div>Start marker: {markers.start ? 'YES' : 'NO'}</div>
      <div>End marker: {markers.end ? 'YES' : 'NO'}</div>
      <div>Interactive meshes: {metaballCount}</div>
      <div>Camera ready: {cameraReady ? 'YES' : 'WAITING'}</div>

      {CONFIG.reverseDirection && (
        <div style={{ color: '#ffaa00' }}>Direction: REVERSED</div>
      )}

      {trimInfo.startT !== undefined && trimInfo.endT !== undefined && (
        <>
          <div>
            Range: {(trimInfo.startT * 100).toFixed(1)}%
            {' → '}
            {(trimInfo.endT * 100).toFixed(1)}%
          </div>

          {trimInfo.rawStartT > trimInfo.rawEndT && (
            <div style={{ color: '#ffaa00' }}>Markers auto-swapped</div>
          )}

          <div>Scroll: {(progress * 100).toFixed(1)}%</div>

          {CONFIG.reverseDirection && (
            <div>Camera t: {(effectiveProgress * 100).toFixed(1)}%</div>
          )}

          <div style={{ marginTop: 8 }}>
            <div
              style={{
                width: 200,
                height: 4,
                background: '#333',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: `${trimInfo.startT * 100}%`,
                  width: `${(trimInfo.endT - trimInfo.startT) * 100}%`,
                  height: '100%',
                  background: '#4caf50',
                  borderRadius: 2,
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `${effectiveProgress * 100}%`,
                  width: 4,
                  height: 12,
                  background: 'yellow',
                  transform: 'translateX(-2px) translateY(-4px)',
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function CursorCommitFlash({ point }) {
  const x = point?.x ?? window.innerWidth / 2
  const y = point?.y ?? window.innerHeight / 2

  return (
    <>
      <style>
        {`
          @keyframes portfolioCursorCommitFlash {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.08) rotate(0deg);
              filter: blur(0px);
            }
            18% {
              opacity: 0.92;
            }
            52% {
              opacity: 0.44;
              filter: blur(1px);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.45) rotate(38deg);
              filter: blur(10px);
            }
          }

          @keyframes portfolioCursorCommitCore {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.18);
            }
            18% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.02);
            }
          }
        `}
      </style>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: 'min(78vw, 780px)',
          aspectRatio: '1',
          zIndex: 4600,
          pointerEvents: 'none',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          opacity: 0,
          animation: 'portfolioCursorCommitFlash 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          background: [
            'radial-gradient(circle, rgba(255,255,255,0.98) 0 2%, transparent 7%)',
            'radial-gradient(circle, transparent 0 16%, rgba(159,232,255,0.8) 17%, transparent 25%)',
            'conic-gradient(from 20deg, transparent 0 14%, rgba(255,120,202,0.78) 17%, transparent 25%, rgba(126,241,203,0.72) 32%, transparent 42%, rgba(255,255,255,0.58) 48%, transparent 60%)',
          ].join(', '),
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: 'min(18vw, 180px)',
          aspectRatio: '1',
          zIndex: 4601,
          pointerEvents: 'none',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          opacity: 0,
          animation: 'portfolioCursorCommitCore 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0 18%, rgba(159,232,255,0.68) 36%, transparent 72%)',
        }}
      />
    </>
  )
}

export default function Portfolio() {
  const navigate = useNavigate()
  const performanceProfile = useMemo(getPortfolioPerformanceProfile, [])
  const metaballConfig = useMemo(() => ({
    pickingFps: performanceProfile.pickingFps,
  }), [performanceProfile])
  const postComposite = useMemo(() => ({
    ...CONFIG.postComposite,
    animate: performanceProfile.animateComposite,
  }), [performanceProfile])
  // Efficient preloader: useProgress taps three.js's DefaultLoadingManager,
  // which every loader in this scene already reports to (GLTFLoader via
  // useLoader, EXRLoader, and the plain TextureLoader calls VHSInstances uses
  // for its masks/labels) — no hand-rolled asset tracking needed. The canvas
  // stays fully transparent until the camera has its first pose *and* every
  // queued asset has actually finished decoding, then reveals with a single
  // CSS opacity fade — no separate "Loading scene..." screen at all.
  const { active: assetsLoading, progress: assetsProgress } = useProgress()
  const [pathPoints, setPathPoints] = useState([])
  const [markers, setMarkers] = useState({ start: null, end: null })
  const [trimInfo, setTrimInfo] = useState({ startT: 0, endT: 1 })
  const [trimmedCurve, setTrimmedCurve] = useState(null)
  const [initialScrollPrimed, setScrollPrimed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [cameraReady, setCameraReady] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [error, setError] = useState(null)
  const [metaballObjects, setMetaballObjects] = useState([])
  const [vhsEmptyTransforms, setVhsEmptyTransforms] = useState([])
  const [practicalLights, setPracticalLights] = useState([])
  const [pageTransition, setPageTransition] = useState({
    mounted: false,
    visible: false,
    durationMs: CONFIG.transitionFadeMinMs,
  })
  const [metaballCursorCommitting, setMetaballCursorCommitting] = useState(false)
  const [metaballCursorDismissed, setMetaballCursorDismissed] = useState(false)
  const [metaballCommitPoint, setMetaballCommitPoint] = useState(null)

  const metaballStateRef = useRef(null)
  const vhsControllerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const pageTransitionFrameRef = useRef(null)
  const pageTransitionTimeoutRef = useRef(null)
  const metaballCommitTimeoutRef = useRef(null)

  const fullCurve = useMemo(() => buildCurveFromPoints(pathPoints), [pathPoints])
  const compositeFilter = useMemo(
    () => buildPostCompositeFilter(CONFIG.postComposite),
    [],
  )

  useEffect(() => {
    if (!trimmedCurve || isLoading) {
      setScrollPrimed(false)
      setCameraReady(false)
    }
  }, [isLoading, trimmedCurve])

  useEffect(() => {
    if (!fullCurve || !markers.start || !markers.end) return

    const rawStartT = findClosestTOnCurve(fullCurve, markers.start)
    const rawEndT = findClosestTOnCurve(fullCurve, markers.end)
    const normalizedStart = Math.min(rawStartT, rawEndT)
    const normalizedEnd = Math.max(rawStartT, rawEndT)

    setTrimInfo({
      startT: normalizedStart,
      endT: normalizedEnd,
      rawStartT,
      rawEndT,
    })
    setTrimmedCurve(buildTrimmedCurve(fullCurve, rawStartT, rawEndT))
    console.log(
      `📐 Path trimmed: ${(normalizedStart * 100).toFixed(1)}% → ${(normalizedEnd * 100).toFixed(1)}%`,
    )
    setIsLoading(false)
  }, [fullCurve, markers])

  const handleSceneLoad = useCallback((loadedScene, _gltf, meshInfo) => {
    const { pathObject, interactiveMeshes } = meshInfo

    let resolvedPath = pathObject

    if (!resolvedPath) {
      const needle = CONFIG.cameraPathObjectName.toLowerCase().trim()

      loadedScene.traverse((child) => {
        if (resolvedPath) return
        if (child.name.toLowerCase().trim() === needle) {
          resolvedPath = child
        }
      })

      if (resolvedPath) {
        console.log(`🔍 Path found via fallback: "${resolvedPath.name}" (${resolvedPath.type})`)
      }
    }

    const { pathPoints: extractedPoints, markers: extractedMarkers } = extractPathFromObject(
      loadedScene,
      resolvedPath,
      CONFIG.startMarkerName,
      CONFIG.endMarkerName,
    )

    setPathPoints(extractedPoints)
    setMarkers(extractedMarkers)
    setPracticalLights(configureArchiveScene(loadedScene))

    // Filter interactiveMeshes: keep only those with name starting with "I_"
    const filteredMeshes = (interactiveMeshes || []).filter(
      (mesh) => mesh && mesh.name && mesh.name.startsWith('I_')
    )

    // "I_" empties (no geometry of their own) mark where a VHSUnit.glb clone
    // should be spawned — collect their world transforms for <VHSInstances>.
    const vhsTransforms = []
    loadedScene.traverse((child) => {
      if (child.isMesh) return
      if (!child.name || !child.name.startsWith('I_')) return

      child.updateWorldMatrix(true, false)
      const position = new THREE.Vector3()
      const quaternion = new THREE.Quaternion()
      const scale = new THREE.Vector3()
      child.getWorldPosition(position)
      child.getWorldQuaternion(quaternion)
      child.getWorldScale(scale)
      vhsTransforms.push({ name: child.name, position, quaternion, scale })
    })

    if (filteredMeshes.length > 0) {
      const objects = buildMetaballObjects(filteredMeshes)
      setMetaballObjects(objects)

      console.log(`🫧 MetaballCursor: ${objects.length} interactive objects registered`)
      objects.forEach((object, index) => {
        console.log(
          `   [${index}] "${object.label}" → title="${object.title}" desc="${object.desc}"` +
          ` (${object.geometry.attributes.position.count} verts, stride ${object.stride})`,
        )
      })
    } else if (vhsTransforms.length > 0) {
      setVhsEmptyTransforms(vhsTransforms)
      console.log(`📼 ${vhsTransforms.length} VHS empties found — spawning VHSUnit.glb instances`)
    } else {
      console.warn('⚠️ No interactive meshes (with "I_" prefix) found — MetaballCursor will be inactive.')
    }

    if (extractedPoints.length < 2) {
      console.error(
        `❌ Path extraction failed (${extractedPoints.length} points).\n` +
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

    const fallbackPoints = []
    for (let i = 0; i <= 100; i += 1) {
      const t = i / 100
      const angle = t * Math.PI * 2
      fallbackPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * 5,
          Math.sin(angle) * 2,
          Math.sin(angle * 2) * 3,
        ),
      )
    }

    setPathPoints(fallbackPoints)
    setMarkers({
      start: fallbackPoints[0],
      end: fallbackPoints[fallbackPoints.length - 1],
    })
  }, [])

  const handleInitialPoseApplied = useCallback(() => {
    setCameraReady(true)
  }, [])

  const handleInitialScrollPrimed = useCallback(() => {
    setScrollPrimed(true)
  }, [])

  const handleMetaballReady = useCallback((state) => {
    metaballStateRef.current = state
  }, [])

  const handleVhsInstancesReady = useCallback((meshes) => {
    if (!meshes?.length) return
    const objects = buildMetaballObjects(meshes)
    setMetaballObjects(objects)

    console.log(`📼 VHSInstances: ${objects.length} interactive VHS units registered`)
    objects.forEach((object, index) => {
      console.log(
        `   [${index}] "${object.label}" → title="${object.title}" desc="${object.desc}"`,
      )
    })
  }, [])

  const handleVhsControllerReady = useCallback((api) => {
    vhsControllerRef.current = api
  }, [])

  const handleInteractiveObjectFocusStart = useCallback(async (activeIndex) => {
    if (typeof activeIndex === 'number' && activeIndex >= 0) {
      void warmRoute('/entry', {
        includeAssets: true,
        intent: true,
        projectId: resolveVhsProjectId(activeIndex),
      })
      await vhsControllerRef.current?.playClick(activeIndex)
    }

    if (metaballCommitTimeoutRef.current) {
      clearTimeout(metaballCommitTimeoutRef.current)
    }

    const cursorState = metaballStateRef.current
    const commitPoint = cursorState?.pipeline?.getCommitPoint?.()

    setMetaballCommitPoint(commitPoint)
    setMetaballCursorCommitting(true)
    cursorState?.cs?.commitDismiss?.()

    metaballCommitTimeoutRef.current = setTimeout(() => {
      setMetaballCursorDismissed(true)
      setMetaballCursorCommitting(false)
      metaballCommitTimeoutRef.current = null
    }, CONFIG.cursorCommitDurationMs)
  }, [])

  const beginPageTransition = useCallback((routePath, durationMs, vhsIndex) => {
    if (!routePath) return

    if (pageTransitionFrameRef.current) {
      cancelAnimationFrame(pageTransitionFrameRef.current)
    }
    if (pageTransitionTimeoutRef.current) {
      clearTimeout(pageTransitionTimeoutRef.current)
    }

    setPageTransition({
      mounted: true,
      visible: false,
      durationMs,
    })

    pageTransitionFrameRef.current = requestAnimationFrame(() => {
      setPageTransition({
        mounted: true,
        visible: true,
        durationMs,
      })
    })

    pageTransitionTimeoutRef.current = setTimeout(() => {
      // Hand ownership of the already-black viewport to the app-level overlay
      // before this route unmounts. The destination will reveal only after it
      // has loaded and painted a stable frame behind that cover.
      startRouteTransition({
        label: metaballObjects[vhsIndex]?.title || 'ENTRY',
        pathname: routePath,
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navigate(routePath, {
            state: {
              vhsIndex,
              vhsCount: metaballObjects.length,
              transition: 'portfolio-vhs',
              // EntryScene uses this together with a PUSH navigation to distinguish
              // a deliberate Portfolio handoff from a reload/direct/history visit.
              fromPortfolio: true,
            },
          })
        })
      })
    }, durationMs)
  }, [navigate, metaballObjects])

  useEffect(() => () => {
    if (pageTransitionFrameRef.current) {
      cancelAnimationFrame(pageTransitionFrameRef.current)
    }
    if (pageTransitionTimeoutRef.current) {
      clearTimeout(pageTransitionTimeoutRef.current)
    }
    if (metaballCommitTimeoutRef.current) {
      clearTimeout(metaballCommitTimeoutRef.current)
    }
  }, [])

  const effectiveProgress = CONFIG.reverseDirection ? 1 - progress : progress
  const initialRevealReady = cameraReady && !assetsLoading && assetsProgress >= 100

  useEffect(() => {
    if (initialRevealReady) {
      setHasRevealed(true)
    }
  }, [initialRevealReady])

  useEffect(() => {
    if (!hasRevealed) return undefined
    let paintedFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      paintedFrame = requestAnimationFrame(() => signalRouteReady('/portfolio'))
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(paintedFrame)
    }
  }, [hasRevealed])

  useEffect(() => {
    if (!hasRevealed) return undefined

    return scheduleRouteWarmup('/entry', {
      includeAssets: true,
      timeoutMs: 1600,
    })
  }, [hasRevealed])

  // Later route warmups also report through Three's global LoadingManager.
  // Keep an already-ready canvas visible while those background requests run.
  const revealReady = hasRevealed

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        background: CONFIG.backgroundColor,
      }}
    >
      {CONFIG.debugMode && (
        <DebugPanel
          cameraReady={cameraReady}
          effectiveProgress={effectiveProgress}
          markers={markers}
          metaballCount={metaballObjects.length}
          pathPointCount={pathPoints.length}
          progress={progress}
          trimInfo={trimInfo}
        />
      )}

      {error && (
        <div
          style={{
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
          }}
        >
          Error: {error}
        </div>
      )}

      {CONFIG.showProgressHUD && (
        <div
          style={{
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
          }}
        >
          <div>Scroll: {(progress * 100).toFixed(1)}%</div>
          {CONFIG.reverseDirection && (
            <div>Camera: {(effectiveProgress * 100).toFixed(1)}%</div>
          )}
          <div
            style={{
              width: 200,
              height: 4,
              background: '#333',
              marginTop: 8,
              borderRadius: 2,
            }}
          >
            <div
              style={{
                width: `${effectiveProgress * 100}%`,
                height: '100%',
                background: '#4caf50',
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}

      {CONFIG.showScrollIndicator && (
        <div
          style={{
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
          }}
        >
          ↓ {CONFIG.scrollIndicatorText} ↓
        </div>
      )}

      <div
        ref={scrollContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: CONFIG.showMetaballCursor ? 'none' : 'auto',
          isolation: 'isolate',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            filter: CONFIG.usePostComposite ? compositeFilter : 'none',
            transform: CONFIG.usePostComposite ? 'translateZ(0)' : 'none',
            willChange: CONFIG.usePostComposite ? 'filter' : 'auto',
          }}
        >
          <Canvas
            camera={{
              position: CONFIG.cameraDefaultPosition,
              fov: CONFIG.cameraFOV,
            }}
            style={{
              background: CONFIG.useGradientSkybox ? 'transparent' : CONFIG.backgroundColor,
              width: '100%',
              height: '100%',
              opacity: revealReady ? 1 : 0,
              transition: 'none',
              display: 'block',
            }}
            frameloop="always"
            shadows
            dpr={[1, performanceProfile.maxDpr]}
            gl={{
              antialias: performanceProfile.antialias,
              alpha: CONFIG.useGradientSkybox,
              powerPreference: 'high-performance',
            }}
          >
            <VisibilityFrameLoop />
            <ShadowUpdateController
              stateRef={metaballStateRef}
              maxFps={performanceProfile.level === 'high' ? 24 : 12}
            />
            <ScrollControls
              pages={5}
              damping={0.1}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <PortfolioScrollSurface />
              <InitialScrollPrimer
                enabled={!isLoading && !initialScrollPrimed}
                percent={INITIAL_SCROLL_PERCENT}
                onDone={handleInitialScrollPrimed}
              />
              <PortfolioCinematicRenderer
                progress={effectiveProgress}
                stateRef={metaballStateRef}
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
              <ArchiveShaft practicalLights={practicalLights} />

              <ambientLight intensity={CONFIG.ambientIntensity} />
              {CONFIG.useGradientSkybox && (
                <ambientLight
                  color={CONFIG.extraAmbientColor}
                  intensity={CONFIG.extraAmbientIntensity}
                />
              )}

              <Environment
                files={CONFIG.hdriPath}
                background={false}
                intensity={CONFIG.environmentIntensity}
              />

              <directionalLight
                position={CONFIG.directionalLightPosition}
                intensity={CONFIG.directionalLightIntensity}
                color={CONFIG.directionalLightColor}
                castShadow
                shadow-mapSize={[
                  performanceProfile.shadowMapSize,
                  performanceProfile.shadowMapSize,
                ]}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-camera-near={0.5}
                shadow-camera-far={40}
                shadow-bias={-0.00035}
              />
              {CONFIG.fillLightEnabled && (
                <directionalLight
                  position={CONFIG.fillLightPosition}
                  intensity={CONFIG.fillLightIntensity}
                  color={CONFIG.fillLightColor}
                />
              )}

              <Suspense fallback={null}>
                <SceneLoader
                  modelPath={CONFIG.modelPath}
                  pathObjectName={CONFIG.cameraPathObjectName}
                  onLoad={handleSceneLoad}
                  onError={handleError}
                />
              </Suspense>

              {vhsEmptyTransforms.length > 0 && (
                <Suspense fallback={null}>
                  <VHSInstances
                    emptyTransforms={vhsEmptyTransforms}
                    modelPath={performanceProfile.vhsModelPath}
                    scale={CONFIG.vhsScale}
                    envMapIntensity={CONFIG.vhsEnvMapIntensity}
                    stateRef={metaballStateRef}
                    maxShadowCasters={performanceProfile.shadowCasters}
                    onInstancesReady={handleVhsInstancesReady}
                    onControllerReady={handleVhsControllerReady}
                  />
                </Suspense>
              )}

              {trimmedCurve && (
                <MarkerPathCamera
                  curve={trimmedCurve}
                  ready={!isLoading && initialScrollPrimed}
                  onInitialPoseApplied={handleInitialPoseApplied}
                />
              )}

              <ProgressTracker
                onProgress={setProgress}
                logToConsole={CONFIG.logScrollProgress}
                maxFps={performanceProfile.level === 'high' ? 30 : 20}
              />

              {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
                <>
                  <HoverAccentLight
                    objects={metaballObjects}
                    stateRef={metaballStateRef}
                  />
                  <MetaballCursorR3F
                    objects={metaballObjects}
                    eventTarget={scrollContainerRef}
                    disabled={metaballCursorDismissed}
                    config={metaballConfig}
                    onStateReady={handleMetaballReady}
                  />
                </>
              )}

              {CONFIG.showMetaballCursor && metaballObjects.length > 0 && trimmedCurve && (
                <InteractiveObjectFocusScroller
                  enabled={CONFIG.enableClickToFocusObject}
                  objects={metaballObjects}
                  curve={trimmedCurve}
                  stateRef={metaballStateRef}
                  eventTarget={scrollContainerRef}
                  onFocusStart={handleInteractiveObjectFocusStart}
                  onPageTransition={beginPageTransition}
                  durationMs={CONFIG.focusScrollDurationMs}
                />
              )}

              {CONFIG.enableOrbitControls && <OrbitControls makeDefault />}
            </ScrollControls>
          </Canvas>
        </div>

        {CONFIG.usePostComposite && (
          <div
            style={{
              opacity: revealReady ? 1 : 0,
              transition: 'none',
            }}
          >
            <PostCompositeOverlay
              composite={postComposite}
              progress={effectiveProgress}
            />
          </div>
        )}
      </div>

      {metaballCursorCommitting && (
        <CursorCommitFlash point={metaballCommitPoint} />
      )}

      {CONFIG.showMetaballCursor && metaballObjects.length > 0 && !metaballCursorCommitting && !metaballCursorDismissed && (
        <MetaballCursorOverlay
          objects={metaballObjects}
          stateRef={metaballStateRef}
          cardWidth={400}                // generous width for the retro text
          render={({ object, visible }) => {
            // Only render when the cursor has fully locked on (visible===true)
            if (!visible || !object) return null;

            // Force remount when the hovered object changes → animation replays
            return (
              <RetroTitle
                key={object.title}
                title={object.title}
                description={object.desc ?? ''}
              />
            );
          }}
        />
      )}

      {pageTransition.mounted && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            pointerEvents: 'none',
            background: '#000000',
            opacity: pageTransition.visible ? 1 : 0,
            transition: `opacity ${pageTransition.durationMs}ms ease-in-out`,
          }}
        />
      )}
    </div>
  )
}
