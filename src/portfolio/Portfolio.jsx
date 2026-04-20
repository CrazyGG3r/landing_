import React, { useState, useMemo, useRef, useEffect, useLayoutEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScroll, Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'
import SceneLoader from './SceneLoader'
import { extractSceneObjects, R3FMetaballCursor } from './MetaCursor'

// ============= CONFIGURATION =============
const CONFIG = {
  // Model path (relative to public folder)
  modelPath: "assets/scenes/Scene1.glb",

  // Camera Path
  cameraPathObjectName: "CameraPath",
  startMarkerName: "Path_Start",
  endMarkerName: "Path_End",
  interactiveObjectNames: [],
  maxInteractiveObjects: 4,
  maxInteractiveVertexCount: 12000,
  maxProjectionSamplesPerObject: 180,
  defaultLookAt: null,
  cameraSpeed: 1.0,
  cameraOffset: 0.0,
  
  // SIMPLE TOGGLE - Just set this to false to hide the pathway!
  showCameraPath: false,  // ← THIS IS ALL YOU NEED! Set to false to hide the white pathway

  // Direction
  reverseDirection: true, // set to true to reverse travel (end -> start)

  // Controls
  enableOrbitControls: false,

  // Visual
  backgroundColor: "#111122",
  environmentPreset: "city",

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
  enableCameraSmoothing: true,
  cameraLerpSharpness: 10,
  cameraInertiaEnabled: true,
  cameraInertiaStrength: 60,
  cameraInertiaDamping: 14,

  // UI
  showScrollIndicator: true,
  scrollIndicatorText: "SCROLL TO MOVE CAMERA",
  showProgressHUD: true,

  // Debug
  debugMode: true
}

// ============= MARKER-BASED PATH CAMERA =============
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
  const notifiedReadyRef = useRef(false)
  const scrollPrimedRef = useRef(false)

  const mapScrollToCurveT = useCallback((rawT) => {
    const normalized = THREE.MathUtils.clamp(
      CONFIG.reverseDirection ? 1 - rawT : rawT,
      0,
      1
    )

    const startMargin = THREE.MathUtils.clamp(
      CONFIG.pathInnerMarginStartPercent ?? 0,
      0,
      99.9
    ) / 100
    const endMargin = THREE.MathUtils.clamp(
      CONFIG.pathInnerMarginEndPercent ?? 0,
      0,
      99.9
    ) / 100

    const effectiveStartMargin = CONFIG.reverseDirection ? endMargin : startMargin
    const effectiveEndMargin = CONFIG.reverseDirection ? startMargin : endMargin

    const innerStart = effectiveStartMargin
    const innerEnd = 1 - effectiveEndMargin
    if (innerStart >= innerEnd) return 0.5

    return innerStart + (innerEnd - innerStart) * normalized
  }, [])

  const getRawScrollOffset = useCallback(() => {
    if (scroll?.el) {
      if (scroll.horizontal) {
        const maxX = Math.max(1, scroll.el.scrollWidth - scroll.el.clientWidth)
        return scroll.el.scrollLeft / maxX
      }
      const maxY = Math.max(1, scroll.el.scrollHeight - scroll.el.clientHeight)
      return scroll.el.scrollTop / maxY
    }
    return typeof scroll?.offset === 'number' ? scroll.offset : 0
  }, [scroll])

  const primeInitialScroll = useCallback(() => {
    if (!scroll?.el || scrollPrimedRef.current) return

    const ratio = 0.01
    if (scroll.horizontal) {
      const maxX = Math.max(0, scroll.el.scrollWidth - scroll.el.clientWidth)
      scroll.el.scrollLeft = maxX * ratio
    } else {
      const maxY = Math.max(0, scroll.el.scrollHeight - scroll.el.clientHeight)
      scroll.el.scrollTop = maxY * ratio
    }
    scrollPrimedRef.current = true
  }, [scroll])

  const getTargetFromScroll = useCallback(() => {
    if (!scroll) return null
    const rawT = getRawScrollOffset()
    const targetT = mapScrollToCurveT(rawT)
    return { rawT, targetT }
  }, [scroll, getRawScrollOffset, mapScrollToCurveT])

  const applyPoseAtT = useCallback((t) => {
    if (!curve) return

    const position = curve.getPointAt(t, tempRef.current)
    camera.position.copy(position)

    const len = Math.max(0.0001, curve.getLength())
    const delta = CONFIG.pathLookAheadDistance / len
    const lookT = Math.min(1, t + delta)

    if (lookT !== t) {
      const lookTarget = curve.getPointAt(lookT, lookAheadRef.current)
      camera.lookAt(lookTarget)
      return
    }

    const prevT = Math.max(0, t - delta)
    const prevPoint = curve.getPointAt(prevT, prevRef.current)
    dirRef.current.copy(position).sub(prevPoint)

    if (dirRef.current.lengthSq() > 1e-12) {
      dirRef.current.normalize()
      fallbackTargetRef.current.copy(position).add(dirRef.current)
      camera.lookAt(fallbackTargetRef.current)
    }
  }, [curve, camera])

  useLayoutEffect(() => {
    if (!curve || !ready || !scroll) return

    primeInitialScroll()

    const values = getTargetFromScroll()
    if (!values) return
    currentTRef.current = values.targetT
    velocityTRef.current = 0
    applyPoseAtT(values.targetT)
    lastTRef.current = values.targetT
    initializedRef.current = true

    if (!notifiedReadyRef.current) {
      notifiedReadyRef.current = true
      onInitialPoseApplied?.()
    }
  }, [curve, ready, scroll, primeInitialScroll, getTargetFromScroll, applyPoseAtT, onInitialPoseApplied])

  useEffect(() => {
    if (!ready) {
      initializedRef.current = false
      notifiedReadyRef.current = false
      scrollPrimedRef.current = false
      lastTRef.current = null
      currentTRef.current = null
      velocityTRef.current = 0
    }
  }, [ready, curve])

  useFrame((_, delta) => {
    if (!scroll || !curve || !ready || !initializedRef.current) return

    const values = getTargetFromScroll()
    if (!values) return
    const { rawT, targetT } = values

    if (currentTRef.current === null) {
      currentTRef.current = targetT
    }
    let nextT = targetT
    if (CONFIG.enableCameraSmoothing) {
      if (CONFIG.cameraInertiaEnabled) {
        const stiffness = Math.max(0, CONFIG.cameraInertiaStrength)
        const damping = Math.max(0, CONFIG.cameraInertiaDamping)
        let velocity = velocityTRef.current
        const currentT = currentTRef.current

        velocity += (targetT - currentT) * stiffness * delta
        velocity *= Math.exp(-damping * delta)
        nextT = THREE.MathUtils.clamp(currentT + velocity * delta, 0, 1)

        velocityTRef.current = velocity
      } else {
        const sharpness = Math.max(0.001, CONFIG.cameraLerpSharpness)
        const alpha = 1 - Math.exp(-sharpness * delta)
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

      if (CONFIG.debugMode && Math.abs(nextT - 0.5) < 0.01) {
        console.log(`📍 Scroll: ${(rawT * 100).toFixed(1)}% -> t: ${(nextT * 100).toFixed(1)}%`)
      }
    }
  })

  return null
}

// ============= PATH EXTRACTOR WITH MARKERS =============
function extractPathWithMarkers(scene) {
  const markers = {
    start: null,
    end: null
  }

  let pathObject = null
  const foundObjects = []

  scene.traverse((child) => {
    foundObjects.push(child.name)

    if (!pathObject && child.name === CONFIG.cameraPathObjectName) {
      pathObject = child
      // Apply visibility setting directly when found!
      pathObject.visible = CONFIG.showCameraPath
      console.log('📍 Found path object:', child.name, child.type, `(visible: ${CONFIG.showCameraPath})`)
    }

    if (!markers.start && child.name === CONFIG.startMarkerName) {
      const position = new THREE.Vector3()
      child.getWorldPosition(position)
      markers.start = position
      console.log('🎯 Found Start marker at:', position)
    }

    if (!markers.end && child.name === CONFIG.endMarkerName) {
      const position = new THREE.Vector3()
      child.getWorldPosition(position)
      markers.end = position
      console.log('🎯 Found End marker at:', position)
    }
  })

  if (!markers.start || !markers.end) {
    console.log('Available objects in scene:', foundObjects)
  }

  const pathPoints = []
  if (pathObject && pathObject.geometry && pathObject.geometry.attributes?.position) {
    const geom = pathObject.geometry
    const pos = geom.attributes.position
    const idx = geom.index ? geom.index.array : null

    pathObject.updateWorldMatrix(true, false)

    const pushPoint = (i) => {
      const point = new THREE.Vector3(
        pos.getX(i),
        pos.getY(i),
        pos.getZ(i)
      )
      pathObject.localToWorld(point)
      pathPoints.push(point)
    }

    if (idx && idx.length > 1) {
      for (let i = 0; i < idx.length; i++) {
        pushPoint(idx[i])
      }
    } else {
      for (let i = 0; i < pos.count; i++) {
        pushPoint(i)
      }
    }

    console.log(`   Path points extracted: ${pathPoints.length}`)
  } else if (!pathObject) {
    console.warn('⚠️ Camera path object not found by name:', CONFIG.cameraPathObjectName)
  }

  return { pathPoints, markers }
}

// ============= CURVE UTILITIES =============
function buildCurveFromPoints(points) {
  if (!points || points.length < 2) return null

  const uniquePoints = [points[0]]
  for (let i = 1; i < points.length; i++) {
    if (points[i].distanceTo(points[i - 1]) > 0.01) {
      uniquePoints.push(points[i])
    }
  }

  const base = new THREE.CatmullRomCurve3(uniquePoints, false, 'catmullrom', CONFIG.curveTension)
  const spaced = base.getSpacedPoints(Math.max(200, uniquePoints.length * CONFIG.curveSampleMultiplier))
  return new THREE.CatmullRomCurve3(spaced, false, 'catmullrom', CONFIG.curveTension)
}

function findClosestTOnCurve(curve, targetPosition) {
  if (!curve || !targetPosition) return 0

  const temp = new THREE.Vector3()
  let closestT = 0
  let minDist = Infinity

  for (let i = 0; i <= CONFIG.markerSearchSamples; i++) {
    const t = i / CONFIG.markerSearchSamples
    curve.getPointAt(t, temp)
    const dist = temp.distanceTo(targetPosition)
    if (dist < minDist) {
      minDist = dist
      closestT = t
    }
  }

  return closestT
}

function buildTrimmedCurve(curve, rawStartT, rawEndT) {
  if (!curve) return null

  const startT = Math.min(rawStartT, rawEndT)
  const endT = Math.max(rawStartT, rawEndT)

  console.log(`🔄 Normalized range: ${(startT * 100).toFixed(1)}% -> ${(endT * 100).toFixed(1)}%`)

  const length = Math.max(200, Math.round(curve.getLength() * 5))
  const points = []

  for (let i = 0; i <= length; i++) {
    const t = startT + (endT - startT) * (i / length)
    points.push(curve.getPointAt(t))
  }

  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', CONFIG.curveTension)
}

// ============= PROGRESS TRACKER =============
function ProgressTracker({ onProgress }) {
  const scroll = useScroll()

  useFrame(() => {
    if (scroll && typeof scroll.offset === 'number') {
      onProgress(scroll.offset)
    }
  })

  return null
}

// ============= INITIAL SCROLL PRIMER =============
function InitialScrollPrimer({ enabled, percent = 0.01, onDone }) {
  const scroll = useScroll()
  const doneRef = useRef(false)

  useEffect(() => {
    if (!enabled || doneRef.current || !scroll?.el) return

    let raf1 = 0
    let raf2 = 0

    const apply = () => {
      const el = scroll.el
      const ratio = THREE.MathUtils.clamp(percent, 0, 1)

      if (scroll.horizontal) {
        const maxX = Math.max(0, el.scrollWidth - el.clientWidth)
        el.scrollLeft = maxX * ratio
      } else {
        const maxY = Math.max(0, el.scrollHeight - el.clientHeight)
        el.scrollTop = maxY * ratio
      }

      doneRef.current = true
      onDone?.()
    }

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(apply)
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [enabled, scroll, percent, onDone])

  useEffect(() => {
    if (!enabled) {
      doneRef.current = false
    }
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
      background: 'rgba(0,0,0,0.7)',
      padding: '20px 30px',
      borderRadius: 8,
      fontFamily: 'sans-serif',
      zIndex: 2000
    }}>
      Loading scene...
    </div>
  )
}

// ============= MAIN COMPONENT =============
export default function Portfolio() {
  const containerRef = useRef(null)
  const [pathPoints, setPathPoints] = useState([])
  const [interactiveObjects, setInteractiveObjects] = useState([])
  const [markers, setMarkers] = useState({ start: null, end: null })
  const [trimInfo, setTrimInfo] = useState({ startT: 0, endT: 1 })
  const [trimmedCurve, setTrimmedCurve] = useState(null)
  const [initialScrollPrimed, setInitialScrollPrimed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cameraReady, setCameraReady] = useState(false)

  useEffect(() => {
    if (!trimmedCurve || isLoading) {
      setInitialScrollPrimed(false)
      setCameraReady(false)
    }
  }, [trimmedCurve, isLoading])

  const fullCurve = useMemo(() => {
    return buildCurveFromPoints(pathPoints)
  }, [pathPoints])

  useEffect(() => {
    if (!fullCurve || !markers.start || !markers.end) return

    const rawStartT = findClosestTOnCurve(fullCurve, markers.start)
    const rawEndT = findClosestTOnCurve(fullCurve, markers.end)

    const normalizedStartT = Math.min(rawStartT, rawEndT)
    const normalizedEndT = Math.max(rawStartT, rawEndT)

    setTrimInfo({
      startT: normalizedStartT,
      endT: normalizedEndT,
      rawStartT,
      rawEndT
    })

    const trimmed = buildTrimmedCurve(fullCurve, rawStartT, rawEndT)
    setTrimmedCurve(trimmed)

    console.log(`📐 Path trimmed: ${(normalizedStartT * 100).toFixed(1)}% -> ${(normalizedEndT * 100).toFixed(1)}%`)
    if (rawStartT > rawEndT) {
      console.log('🔄 Note: Start and End markers were automatically swapped to ensure correct path direction')
    }
    setIsLoading(false)
  }, [fullCurve, markers])

  const handleSceneLoad = useCallback((loadedScene) => {
    const { pathPoints: points, markers: markerPositions } = extractPathWithMarkers(loadedScene)
    const includeNames = Array.isArray(CONFIG.interactiveObjectNames) && CONFIG.interactiveObjectNames.length > 0
      ? new Set(CONFIG.interactiveObjectNames)
      : null
    const objects = extractSceneObjects(loadedScene, {
      ignoredNames: new Set([
        CONFIG.cameraPathObjectName,
        CONFIG.startMarkerName,
        CONFIG.endMarkerName
      ]),
      includeNames,
      maxObjects: CONFIG.maxInteractiveObjects,
      maxVertexCount: CONFIG.maxInteractiveVertexCount,
      maxProjectionSamples: CONFIG.maxProjectionSamplesPerObject,
      addWireframes: false,
      description: 'Interactive mesh in the portfolio scene.'
    })
    if (CONFIG.debugMode) {
      console.log('🫧 MetaCursor interactive objects:', objects.map((obj) => obj.mesh?.name || obj.label))
    }
    setPathPoints(points)
    setMarkers(markerPositions)
    setInteractiveObjects(objects)
  }, [])

  const handleError = useCallback((err) => {
    if (err && !err.type?.includes('progress')) {
      console.error('❌ Failed to load scene:', err)
      setError(err.message)
    }
    setIsLoading(false)

    const points = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const angle = t * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(angle) * 5,
        Math.sin(angle) * 2,
        Math.sin(angle * 2) * 3
      ))
    }
    setPathPoints(points)
    setMarkers({
      start: points[0],
      end: points[points.length - 1]
    })
    setInteractiveObjects([])
  }, [])

  const handleInitialPoseApplied = useCallback(() => {
    setCameraReady(true)
  }, [])

  const handleInitialScrollPrimed = useCallback(() => {
    setInitialScrollPrimed(true)
  }, [])

  const effectiveProgress = CONFIG.reverseDirection ? 1 - progress : progress

  return (
    <div ref={containerRef} style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'auto'
    }}>
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
          borderLeft: `4px solid ${markers.start && markers.end ? '#4caf50' : '#ff9800'}`
        }}>
          <div><strong>🔍 PATH ANALYSIS</strong></div>
          <div>Path points: {pathPoints.length}</div>
          <div>Start marker: {markers.start ? '✅' : '❌'}</div>
          <div>End marker: {markers.end ? '✅' : '❌'}</div>
          <div>Pathway visible: {CONFIG.showCameraPath ? '✅' : '❌'}</div>
          {CONFIG.reverseDirection && (
            <div style={{ color: '#ffaa00' }}>🔁 Direction: REVERSED (end {'->'} start)</div>
          )}
          {trimInfo.startT !== undefined && (
            <>
              <div>Active range: {(trimInfo.startT * 100).toFixed(1)}% {'->'} {(trimInfo.endT * 100).toFixed(1)}%</div>
              {trimInfo.rawStartT > trimInfo.rawEndT && (
                <div style={{ color: '#ffaa00' }}>🔄 Markers auto-swapped</div>
              )}
              <div>Scroll: {(progress * 100).toFixed(1)}%</div>
              {CONFIG.reverseDirection && (
                <div>Camera t: {(effectiveProgress * 100).toFixed(1)}%</div>
              )}
              <div style={{ marginTop: 8 }}>
                <div style={{
                  width: 200,
                  height: 4,
                  background: '#333',
                  borderRadius: 2,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#444',
                    borderRadius: 2
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: `${trimInfo.startT * 100}%`,
                    width: `${(trimInfo.endT - trimInfo.startT) * 100}%`,
                    height: '100%',
                    background: '#4caf50',
                    borderRadius: 2,
                    opacity: 0.7
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: `${effectiveProgress * 100}%`,
                    width: 4,
                    height: 12,
                    background: 'yellow',
                    transform: 'translateX(-2px) translateY(-4px)',
                    borderRadius: 2
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
          background: 'rgba(255,0,0,0.8)',
          padding: 20,
          borderRadius: 8,
          zIndex: 2000
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
          pointerEvents: 'none'
        }}>
          <div>Scroll: {(progress * 100).toFixed(1)}%</div>
          {CONFIG.reverseDirection && (
            <div>Camera: {(effectiveProgress * 100).toFixed(1)}%</div>
          )}
          <div style={{
            width: 200,
            height: 4,
            background: '#333',
            marginTop: 8,
            borderRadius: 2
          }}>
            <div style={{
              width: `${effectiveProgress * 100}%`,
              height: '100%',
              background: '#4caf50',
              borderRadius: 2
            }} />
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
          pointerEvents: 'none'
        }}>
          ↓ {CONFIG.scrollIndicatorText} ↓
        </div>
      )}

      <Canvas
        camera={{
          position: CONFIG.cameraDefaultPosition,
          fov: CONFIG.cameraFOV
        }}
        style={{
          background: CONFIG.backgroundColor,
          width: '100%',
          height: '100%',
          opacity: cameraReady ? 1 : 0,
          transition: 'opacity 500ms ease'
        }}
        shadows
      >
        <ScrollControls pages={5} damping={0.1}>
          <InitialScrollPrimer
            enabled={!isLoading && !initialScrollPrimed}
            percent={0.01}
            onDone={handleInitialScrollPrimed}
          />

          <ambientLight intensity={CONFIG.ambientIntensity} />
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

          {interactiveObjects.length > 0 && (
            <R3FMetaballCursor
              objects={interactiveObjects}
              enabled={!isLoading}
              showHint={false}
              overlayRoot={containerRef.current}
            />
          )}

          <ProgressTracker onProgress={setProgress} />

          {CONFIG.enableOrbitControls && <OrbitControls makeDefault />}
        </ScrollControls>
      </Canvas>
    </div>
  )
}
