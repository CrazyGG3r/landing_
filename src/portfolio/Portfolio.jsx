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
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { Environment, OrbitControls, ScrollControls, useScroll } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import SceneLoader from './SceneLoader'
import { MetaballCursorR3F, buildMetaballObjects } from './MetaballCursor'
import { MetaballCursorOverlay } from './MetaballCursorOverlay'
import {
  DEFAULT_POST_COMPOSITE,
  PostCompositeOverlay,
  buildPostCompositeFilter,
} from './PortfolioCompositeEffects'
import { INTERACTIVE_OBJECT_SCROLL_TARGETS } from './PortfolioFocusTargets'
import RetroTitle from './RetroTitle'   // adjust path as needed

const CONFIG = {
  modelPath: 'scenes/Portfolio.glb',
  cameraPathObjectName: 'CameraPath',
  startMarkerName: 'Path_Start',
  endMarkerName: 'Path_End',
  reverseDirection: true,
  enableOrbitControls: false,
  backgroundColor: '#111122',
  environmentPreset: null,           // disable preset
  hdriPath: '/hdri/StudioHorror.exr', // your HDRI file
  environmentIntensity: 1,         // optional, adjust brightness
  ambientIntensity: 0.4,
  directionalLightIntensity: 0.8,
  directionalLightPosition: [10, 20, 5],
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
  transitionFadeStartProgress: 0.6,
  transitionFadeMinMs: 500,
  transitionFadeMaxMs: 1000,
  logScrollProgress: true,
  debugMode: false,
  useGradientSkybox: true,
  skyboxRadius: 500,
  startCenterColor: '#7df1cb', //'#ccfff0'
  startEdgeColor: '#015230', //'#006b4f'
  endCenterColor: '#f3ca7f', //'#cfff99'
  endEdgeColor: '#fa8541', //'#2a9e00'
  skyboxIntensity: 1,
  useStaticVignette: true,
  vignetteStrength: 0.26,
  vignetteSoftness: [0.28, 1.08],
  vignetteScale: [1.12, 1.02],
  vignetteOffset: [0.0, -0.02],
  vignetteCenterLift: 0.06,
  vignetteFollowCamera: true,
  vignetteFollowStrength: 0.12,
  vignetteFollowLerp: 4.5,
  extraAmbientColor: '#c0c0d0',
  extraAmbientIntensity: 2.0,
  usePostComposite: true,
  postComposite: DEFAULT_POST_COMPOSITE,
}

const PROGRESS_EPSILON = 0.001
const INITIAL_SCROLL_PERCENT = 0.01

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

function ProgressTracker({ onProgress, logToConsole = false }) {
  const scroll = useScroll()
  const lastProgressRef = useRef(-1)

  useFrame(() => {
    if (!scroll || typeof scroll.offset !== 'number') return

    const nextProgress = scroll.offset
    if (Math.abs(nextProgress - lastProgressRef.current) < PROGRESS_EPSILON) return

    lastProgressRef.current = nextProgress
    onProgress(nextProgress)

    if (logToConsole) {
      console.log(`[portfolio] scroll: ${(nextProgress * 100).toFixed(2)}%`)
    }
  })

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

    const animateToOffset = (target) => {
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
          onPageTransition?.(target.routePath, fadeDurationMs)
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
          onPageTransition?.(target.routePath, fadeDurationMs)
        }

        if (t < 1) {
          animationRef.current = requestAnimationFrame(tick)
        } else {
          animationRef.current = null
          if (!transitionStarted && target.routePath) {
            onPageTransition?.(target.routePath, fadeDurationMs)
          }
        }
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    const handleClick = () => {
      if (clickLockedRef.current) return

      const activeIndex = (stateRef.current?.cs?.activeId ?? 0) - 1
      const target = focusTargets[activeIndex]

      if (!target) return

      clickLockedRef.current = true
      onFocusStart?.()
      animateToOffset(target)
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

function LoadingIndicator() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#effff4',
        background: 'rgba(2, 10, 9, 0.78)',
        padding: '20px 32px',
        borderRadius: 14,
        fontFamily: 'monospace',
        fontSize: 14,
        zIndex: 3000,
        letterSpacing: '0.08em',
        border: '1px solid rgba(190, 255, 225, 0.25)',
        boxShadow: '0 0 26px rgba(70, 255, 185, 0.12), inset 0 0 18px rgba(255, 255, 255, 0.05)',
      }}
    >
      Loading scene...
    </div>
  )
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

export default function Portfolio() {
  const navigate = useNavigate()
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
  const [pageTransition, setPageTransition] = useState({
    mounted: false,
    visible: false,
    durationMs: CONFIG.transitionFadeMinMs,
  })

  const metaballStateRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const pageTransitionFrameRef = useRef(null)
  const pageTransitionTimeoutRef = useRef(null)

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

    // Filter interactiveMeshes: keep only those with name starting with "I_"
    const filteredMeshes = (interactiveMeshes || []).filter(
      (mesh) => mesh && mesh.name && mesh.name.startsWith('I_')
    )

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

  const beginPageTransition = useCallback((routePath, durationMs) => {
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
      navigate(routePath)
    }, durationMs)
  }, [navigate])

  useEffect(() => () => {
    if (pageTransitionFrameRef.current) {
      cancelAnimationFrame(pageTransitionFrameRef.current)
    }
    if (pageTransitionTimeoutRef.current) {
      clearTimeout(pageTransitionTimeoutRef.current)
    }
  }, [])

  const effectiveProgress = CONFIG.reverseDirection ? 1 - progress : progress

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

      {(isLoading || !cameraReady) && <LoadingIndicator />}

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
                percent={INITIAL_SCROLL_PERCENT}
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

              <ProgressTracker
                onProgress={setProgress}
                logToConsole={CONFIG.logScrollProgress}
              />

              {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
                <MetaballCursorR3F
                  objects={metaballObjects}
                  eventTarget={scrollContainerRef}
                  onStateReady={handleMetaballReady}
                />
              )}

              {CONFIG.showMetaballCursor && metaballObjects.length > 0 && trimmedCurve && (
                <InteractiveObjectFocusScroller
                  enabled={CONFIG.enableClickToFocusObject}
                  objects={metaballObjects}
                  curve={trimmedCurve}
                  stateRef={metaballStateRef}
                  eventTarget={scrollContainerRef}
                  onPageTransition={beginPageTransition}
                  durationMs={CONFIG.focusScrollDurationMs}
                />
              )}

              {CONFIG.enableOrbitControls && <OrbitControls makeDefault />}
            </ScrollControls>
          </Canvas>
        </div>

        {CONFIG.usePostComposite && (
          <PostCompositeOverlay
            composite={CONFIG.postComposite}
            progress={effectiveProgress}
          />
        )}
      </div>

      {CONFIG.showMetaballCursor && metaballObjects.length > 0 && (
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
            background: '#ffffff',
            opacity: pageTransition.visible ? 1 : 0,
            transition: `opacity ${pageTransition.durationMs}ms ease-in-out`,
          }}
        />
      )}
    </div>
  )
}
