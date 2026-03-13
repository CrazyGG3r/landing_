import React, { useState, useMemo, useRef, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useScroll, Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'

// ============= CONFIGURATION =============
const CONFIG = {
  // Model path (relative to public folder)
  modelPath: "/src/assets/scenes/Scene1.glb",

  // Camera Path
  cameraPathObjectName: "CameraPath",
  startMarkerName: "Path_Start",
  endMarkerName: "Path_End",
  defaultLookAt: null,
  cameraSpeed: 1.0,
  cameraOffset: 0.0,

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
  curveSampleMultiplier: 5, // For higher quality curves
  markerSearchSamples: 1500, // For more precise marker matching

  // UI
  showScrollIndicator: true,
  scrollIndicatorText: "SCROLL TO MOVE CAMERA",
  showProgressHUD: true,

  // Debug
  debugMode: true
}

// ============= MARKER-BASED PATH CAMERA =============
function MarkerPathCamera({ curve }) {
  const scroll = useScroll()
  const { camera } = useThree()
  const lookAheadRef = useRef(new THREE.Vector3())
  const tempRef = useRef(new THREE.Vector3())
  const lastTRef = useRef(0)

  // Initialize camera at start position
  useEffect(() => {
    if (!curve) return
    const startPos = curve.getPointAt(0, tempRef.current)
    camera.position.copy(startPos)

    const len = Math.max(0.0001, curve.getLength())
    const delta = CONFIG.pathLookAheadDistance / len
    const lookPos = curve.getPointAt(Math.min(1, delta), lookAheadRef.current)
    camera.lookAt(lookPos)
  }, [curve, camera])

  useFrame(() => {
    if (!scroll || !curve) return

    const t = Math.min(1, Math.max(0, scroll.offset))
    
    // Only update if t changed significantly
    if (Math.abs(t - lastTRef.current) > 0.001) {
      const position = curve.getPointAt(t, tempRef.current)
      camera.position.copy(position)

      const len = Math.max(0.0001, curve.getLength())
      const delta = CONFIG.pathLookAheadDistance / len
      const lookT = Math.min(1, t + delta)
      const lookTarget = curve.getPointAt(lookT, lookAheadRef.current)
      camera.lookAt(lookTarget)

      lastTRef.current = t

      if (CONFIG.debugMode && Math.abs(t - 0.5) < 0.01) {
        console.log(`📍 Scroll: ${(t * 100).toFixed(1)}%`)
      }
    }
  })

  return null
}

// ============= SCENE LOADER =============
function SceneLoader({ onLoad, onError }) {
  const gltf = useLoader(GLTFLoader, CONFIG.modelPath, undefined, onError)

  useEffect(() => {
    if (gltf) {
      console.log('✅ Scene loaded successfully')
      onLoad(gltf.scene)
    }
  }, [gltf, onLoad])

  return <primitive object={gltf.scene} />
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
      console.log('📍 Found path object:', child.name, child.type)
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

  // Debug: log all objects if markers not found
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
  
  // Remove duplicate points that are too close
  const uniquePoints = [points[0]]
  for (let i = 1; i < points.length; i++) {
    if (points[i].distanceTo(points[i-1]) > 0.01) {
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

function buildTrimmedCurve(curve, startT, endT) {
  if (!curve) return null

  // Ensure startT < endT
  if (startT > endT) {
    [startT, endT] = [endT, startT]
  }

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
  const [pathPoints, setPathPoints] = useState([])
  const [markers, setMarkers] = useState({ start: null, end: null })
  const [trimInfo, setTrimInfo] = useState({ startT: 0, endT: 1 })
  const [trimmedCurve, setTrimmedCurve] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fullCurve = useMemo(() => {
    return buildCurveFromPoints(pathPoints)
  }, [pathPoints])

  useEffect(() => {
    if (!fullCurve || !markers.start || !markers.end) return

    const startT = findClosestTOnCurve(fullCurve, markers.start)
    const endT = findClosestTOnCurve(fullCurve, markers.end)

    setTrimInfo({
      startT,
      endT
    })

    const trimmed = buildTrimmedCurve(fullCurve, startT, endT)
    setTrimmedCurve(trimmed)

    console.log(`📐 Path trimmed: ${(startT * 100).toFixed(1)}% → ${(endT * 100).toFixed(1)}%`)
    setIsLoading(false)
  }, [fullCurve, markers])

  const handleSceneLoad = useCallback((loadedScene) => {
    const { pathPoints: points, markers: markerPositions } = extractPathWithMarkers(loadedScene)
    setPathPoints(points)
    setMarkers(markerPositions)
  }, [])

  const handleError = useCallback((err) => {
    console.error('❌ Failed to load scene:', err)
    setError(err.message)
    setIsLoading(false)

    // Create fallback path for development
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
      start: points[20],
      end: points[80]
    })
  }, [])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'auto'
    }}>
      {/* Debug overlay */}
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
          {trimInfo.startT !== undefined && (
            <>
              <div>Active range: {(trimInfo.startT * 100).toFixed(1)}% → {(trimInfo.endT * 100).toFixed(1)}%</div>
              <div>Current: {(progress * 100).toFixed(1)}%</div>
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
                    left: `${progress * 100}%`,
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

      {/* Error display */}
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

      {/* Loading indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Progress HUD */}
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
          <div>Progress: {(progress * 100).toFixed(1)}%</div>
          <div style={{
            width: 200,
            height: 4,
            background: '#333',
            marginTop: 8,
            borderRadius: 2
          }}>
            <div style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: '#4caf50',
              borderRadius: 2
            }} />
          </div>
        </div>
      )}

      {/* Scroll indicator */}
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
          height: '100%'
        }}
        shadows
      >
        <ScrollControls pages={5} damping={0.1}>
          <ambientLight intensity={CONFIG.ambientIntensity} />
          <Environment preset={CONFIG.environmentPreset} background={false} />

          <directionalLight
            position={CONFIG.directionalLightPosition}
            intensity={CONFIG.directionalLightIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          <Suspense fallback={null}>
            <SceneLoader onLoad={handleSceneLoad} onError={handleError} />
          </Suspense>

          {trimmedCurve && (
            <MarkerPathCamera curve={trimmedCurve} />
          )}

          <ProgressTracker onProgress={setProgress} />

          {CONFIG.enableOrbitControls && <OrbitControls makeDefault />}
        </ScrollControls>
      </Canvas>
    </div>
  )
}