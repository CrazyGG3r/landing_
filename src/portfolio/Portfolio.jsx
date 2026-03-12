import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useScroll, Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'

// ============= CONFIGURATION =============
const CONFIG = {
  // Model - FIXED PATH: Move your GLB to public folder!
  modelPath: "./src/assets/scenes/Scene1.glb", 
  
  // Camera Path
  cameraPathObjectName: "CameraPath",
  defaultLookAt: null,
  cameraSpeed: 1.0,
  cameraOffset: 0.0,
  
  // Controls
  enableOrbitControls: false,
  
  // Visual
  backgroundColor: "#111122",
  environmentPreset: "city",
  
  // Lighting - Ambient
  ambientIntensity: 0.5,
  
  // Lighting - Directional
  directionalLightIntensity: 1.0,
  directionalLightPosition: [10, 20, 5],
  fillLightIntensity: 0.3,
  fillLightPosition: [-5, 5, 10],
  backLightIntensity: 0.2,
  backLightPosition: [0, 5, -15],
  
  // Lighting - Hemisphere
  hemisphereLightEnabled: true,
  hemisphereSkyColor: "#446688",
  hemisphereGroundColor: "#223322",
  hemisphereIntensity: 0.5,
  
  // Lighting - Point Lights
  pointLights: [],
  
  // Shadow
  shadowsEnabled: true,
  shadowMapSize: 2048,
  
  // Camera
  cameraFOV: 60,
  cameraDefaultPosition: [0, 2, 5],
  
  // Path
  pathLookAheadSteps: 3,
  pathLookAheadDistance: 2.5,
  pathUnitsPerPage: 2, // Reduced from 6 to make scrolling more sensitive
  curveTension: 0.5,
  useFallbackPath: true,
  minScrollPages: 5, // Increased from 2 to ensure scroll works
  
  // UI
  showScrollIndicator: true,
  scrollIndicatorText: "Scroll to move camera along path",
  showProgressHUD: true,
  showSectionTitle: true,
  enableKeyboardControls: true,
  enableTouchDrag: true,
  
  // Debug
  debugMode: true // Set to false to disable logs
}

// ============= PATH-BASED CAMERA CONTROLLER =============
function PathCameraController({
  curve,
  pathLength,
  speed = 1,
  offset = 0,
  lookAtTarget = null,
  lookAheadSteps = 3,
  lookAheadDistance = 2.5,
  manualOffsetRef,
  anchorTargets
}) {
  const scroll = useScroll()
  const { camera } = useThree()
  const positionRef = useRef(new THREE.Vector3())
  const lookRef = useRef(new THREE.Vector3())
  const tangentRef = useRef(new THREE.Vector3())
  const lastProgressRef = useRef(0)
  
  useFrame(() => {
    // Debug scroll object
    if (!scroll) {
      if (CONFIG.debugMode) console.log('❌ Scroll object is null')
      return
    }
    
    if (typeof scroll.offset !== 'number') {
      if (CONFIG.debugMode) console.log('❌ scroll.offset is not a number:', scroll.offset)
      return
    }
    
    if (!curve) {
      if (CONFIG.debugMode) console.log('❌ Curve is null')
      return
    }
    
    // Debug scroll value
    if (CONFIG.debugMode && Math.abs(scroll.offset - lastProgressRef.current) > 0.01) {
      console.log('📊 scroll.offset:', scroll.offset.toFixed(3))
      lastProgressRef.current = scroll.offset
    }
    
    // Progress based on scroll (0 to 1)
    const manualOffset = manualOffsetRef?.current || 0
    let progress = scroll.offset * speed + offset + manualOffset
    progress = Math.max(0, Math.min(1, progress))
    
    // Find position on curve
    curve.getPointAt(progress, positionRef.current)
    camera.position.copy(positionRef.current)
    
    // Handle camera look-at
    if (lookAtTarget) {
      camera.lookAt(lookAtTarget)
    } else if (anchorTargets && anchorTargets.length > 0) {
      const nextAnchor = anchorTargets.find((a) => a.t >= progress) || anchorTargets[anchorTargets.length - 1]
      if (nextAnchor && nextAnchor.position) {
        camera.lookAt(nextAnchor.position)
      }
    } else {
      const distance = Math.max(0.001, lookAheadDistance)
      const delta = Math.min(1, distance / Math.max(0.001, pathLength))
      const lookT = Math.min(1, progress + delta)
      curve.getPointAt(lookT, lookRef.current)
      curve.getTangentAt(Math.min(1, progress + delta * 0.5), tangentRef.current)
      if (lookAheadSteps > 1) {
        lookRef.current.addScaledVector(tangentRef.current, lookAheadSteps * 0.1)
      }
      camera.lookAt(lookRef.current)
    }
  })
  
  return null
}

// ============= SCENE LOADER =============
function BlenderScene({ modelPath, onLoad }) {
  const gltf = useLoader(GLTFLoader, modelPath)
  
  React.useEffect(() => {
    if (gltf && onLoad) {
      const sceneData = {
        scene: gltf.scene,
        cameras: gltf.cameras,
        animations: gltf.animations
      }
      onLoad(sceneData)
    }
  }, [gltf, onLoad])
  
  return <primitive object={gltf.scene} />
}

// ============= PATH DATA EXTRACTOR =============
function extractPathFromScene(scene, pathObjectName = 'CameraPath') {
  const pathPoints = []
  const anchors = []
  let pathIsFallback = false
  
  scene.traverse((child) => {
    if (child.name === pathObjectName || child.name.includes('path') || child.name.includes('Path')) {
      if (child.geometry && child.geometry.attributes.position) {
        const positions = child.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          pathPoints.push(new THREE.Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          ))
        }
      }
    }
    
    const lowerName = child.name?.toLowerCase?.() || ''
    if (lowerName.startsWith('lookat_') || lowerName.startsWith('section_') || lowerName.startsWith('anchor_')) {
      const worldPos = new THREE.Vector3()
      child.getWorldPosition(worldPos)
      anchors.push({ name: child.name, position: worldPos })
    }
  })
  
  // Fallback circular path if none found
  if (pathPoints.length === 0 && CONFIG.useFallbackPath) {
    if (CONFIG.debugMode) console.log('Using fallback circular path')
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const angle = t * Math.PI * 2
      pathPoints.push(new THREE.Vector3(
        Math.cos(angle) * 5,
        Math.sin(angle) * 2,
        Math.sin(angle * 2) * 3
      ))
    }
    pathIsFallback = true
  }
  
  return { pathPoints, anchors, pathIsFallback }
}

// ============= MAIN COMPONENT =============
export default function Portfolio() {
  const [pathPoints, setPathPoints] = useState([])
  const [cameraPathReady, setCameraPathReady] = useState(false)
  const [pathAvailable, setPathAvailable] = useState(true)
  const [pathIsFallback, setPathIsFallback] = useState(false)
  const [anchors, setAnchors] = useState([])
  const [progress, setProgress] = useState(0)
  const manualOffsetRef = useRef(0)
  const dragStateRef = useRef({ active: false, startY: 0, lastY: 0 })
  
  const lookAtVector = useMemo(() => {
    if (CONFIG.defaultLookAt && Array.isArray(CONFIG.defaultLookAt)) {
      return new THREE.Vector3(...CONFIG.defaultLookAt)
    }
    return CONFIG.defaultLookAt
  }, [])
  
  const curve = useMemo(() => {
    if (!pathPoints || pathPoints.length < 2) return null
    return new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', CONFIG.curveTension)
  }, [pathPoints])
  
  const pathLength = useMemo(() => (curve ? curve.getLength() : 0), [curve])
  
  const anchorTargets = useMemo(() => {
    if (!curve || !anchors || anchors.length === 0) return []
    const samples = 200
    const points = []
    for (let i = 0; i <= samples; i++) {
      points.push(curve.getPointAt(i / samples, new THREE.Vector3()))
    }
    return anchors.map((a) => {
      let bestT = 0
      let bestDist = Infinity
      for (let i = 0; i <= samples; i++) {
        const d = points[i].distanceTo(a.position)
        if (d < bestDist) {
          bestDist = d
          bestT = i / samples
        }
      }
      return { ...a, t: bestT }
    }).sort((a, b) => a.t - b.t)
  }, [curve, anchors])
  
  const sectionTargets = useMemo(() => {
    return anchorTargets.filter((a) => a.name.toLowerCase().startsWith('section_'))
  }, [anchorTargets])
  
  const currentSection = useMemo(() => {
    if (!sectionTargets || sectionTargets.length === 0) return null
    let current = sectionTargets[0]
    for (const s of sectionTargets) {
      if (s.t <= progress) current = s
    }
    return current
  }, [sectionTargets, progress])
  
  const handleSceneLoad = (data) => {
    if (CONFIG.debugMode) console.log('Scene loaded:', data)
    const result = extractPathFromScene(data.scene, CONFIG.cameraPathObjectName)
    setPathPoints(result.pathPoints)
    setAnchors(result.anchors)
    setCameraPathReady(result.pathPoints.length > 1)
    setPathAvailable(result.pathPoints.length > 1 && !result.pathIsFallback)
    setPathIsFallback(!!result.pathIsFallback)
  }
  
  useEffect(() => {
    if (!CONFIG.enableKeyboardControls) return
    const onKey = (e) => {
      const step = 0.01
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'PageUp') {
        manualOffsetRef.current = Math.min(1, manualOffsetRef.current + step)
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'PageDown') {
        manualOffsetRef.current = Math.max(-1, manualOffsetRef.current - step)
      } else if (e.key === 'Home') {
        manualOffsetRef.current = -1
      } else if (e.key === 'End') {
        manualOffsetRef.current = 1
      } else {
        return
      }
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey, { passive: false })
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  
  const onPointerDown = (e) => {
    if (!CONFIG.enableTouchDrag) return
    dragStateRef.current.active = true
    dragStateRef.current.startY = e.clientY
    dragStateRef.current.lastY = e.clientY
  }
  
  const onPointerMove = (e) => {
    if (!CONFIG.enableTouchDrag) return
    if (!dragStateRef.current.active) return
    const delta = dragStateRef.current.lastY - e.clientY
    dragStateRef.current.lastY = e.clientY
    const step = delta / 600
    manualOffsetRef.current = Math.max(-1, Math.min(1, manualOffsetRef.current + step))
  }
  
  const onPointerUp = () => {
    if (!CONFIG.enableTouchDrag) return
    dragStateRef.current.active = false
  }
  
  const pages = useMemo(() => {
    if (!pathLength || pathLength <= 0) return CONFIG.minScrollPages
    return Math.max(
      CONFIG.minScrollPages,
      Math.ceil(pathLength / Math.max(1, CONFIG.pathUnitsPerPage))
    )
  }, [pathLength])
  
  // Add style to ensure scrolling works
  useEffect(() => {
    // Force body to be scrollable
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])
  
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Add debug info */}
      {CONFIG.debugMode && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.8)',
          padding: '10px',
          borderRadius: 8,
          fontSize: 12,
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          <div>Pages: {pages}</div>
          <div>Path Ready: {cameraPathReady ? '✅' : '❌'}</div>
          <div>Progress: {(progress * 100).toFixed(1)}%</div>
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: CONFIG.cameraDefaultPosition, 
          fov: CONFIG.cameraFOV 
        }}
        style={{ background: CONFIG.backgroundColor }}
        shadows={CONFIG.shadowsEnabled}
      >
        <ScrollControls pages={pages} damping={0.1}>
          {/* Lighting */}
          <ambientLight intensity={CONFIG.ambientIntensity} />
          <Environment preset={CONFIG.environmentPreset} background={false} />
          
          <directionalLight
            position={CONFIG.directionalLightPosition}
            intensity={CONFIG.directionalLightIntensity}
            castShadow={CONFIG.shadowsEnabled}
            shadow-mapSize={[CONFIG.shadowMapSize, CONFIG.shadowMapSize]}
          />
          
          <directionalLight 
            position={CONFIG.fillLightPosition} 
            intensity={CONFIG.fillLightIntensity} 
          />
          
          <directionalLight 
            position={CONFIG.backLightPosition} 
            intensity={CONFIG.backLightIntensity} 
          />
          
          {CONFIG.hemisphereLightEnabled && (
            <hemisphereLight
              args={[
                CONFIG.hemisphereSkyColor, 
                CONFIG.hemisphereGroundColor, 
                CONFIG.hemisphereIntensity
              ]}
            />
          )}
          
          {CONFIG.pointLights.map((light, index) => (
            <pointLight
              key={index}
              position={light.position}
              intensity={light.intensity || 0.5}
              color={light.color || '#ffffff'}
              distance={light.distance || 10}
              decay={light.decay || 2}
            />
          ))}
          
          {/* Blender Scene */}
          {CONFIG.modelPath && (
            <BlenderScene modelPath={CONFIG.modelPath} onLoad={handleSceneLoad} />
          )}
          
          {/* Path-Based Camera */}
          {cameraPathReady && !CONFIG.enableOrbitControls && (
            <PathCameraController
              curve={curve}
              pathLength={pathLength}
              speed={CONFIG.cameraSpeed}
              offset={CONFIG.cameraOffset}
              lookAtTarget={lookAtVector}
              lookAheadSteps={CONFIG.pathLookAheadSteps}
              lookAheadDistance={CONFIG.pathLookAheadDistance}
              manualOffsetRef={manualOffsetRef}
              anchorTargets={anchorTargets}
            />
          )}
          
          {/* Orbit Controls */}
          {(CONFIG.enableOrbitControls || (!pathAvailable && !cameraPathReady)) && (
            <OrbitControls makeDefault />
          )}
          
          <ProgressTracker onProgress={setProgress} />
        </ScrollControls>
      </Canvas>
      
      {/* UI Overlay */}
      {CONFIG.showScrollIndicator && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: 20,
          fontSize: 14,
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
          zIndex: 100
        }}>
          {CONFIG.scrollIndicatorText}
        </div>
      )}
      
      {CONFIG.showProgressHUD && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: 'white',
          background: 'rgba(0,0,0,0.45)',
          padding: '10px 14px',
          borderRadius: 12,
          fontSize: 13,
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
          zIndex: 100,
          minWidth: 120
        }}>
          <div style={{ marginBottom: 6 }}>Progress: {Math.round(progress * 100)}%</div>
          <div style={{
            height: 6,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 6,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.round(progress * 100)}%`,
              background: 'linear-gradient(90deg, #8ab4ff, #c4f0c5)'
            }} />
          </div>
          {CONFIG.showSectionTitle && currentSection && (
            <div style={{ marginTop: 8, fontSize: 12 }}>
              Section: {currentSection.name.replace(/^section_/i, '')}
            </div>
          )}
        </div>
      )}
      
      {!pathAvailable && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          background: 'rgba(120,0,0,0.5)',
          padding: '8px 12px',
          borderRadius: 8,
          fontSize: 13,
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
          zIndex: 100
        }}>
          Camera path not found. Orbit controls enabled.
        </div>
      )}
      
      {pathIsFallback && (
        <div style={{
          position: 'absolute',
          top: 56,
          left: 20,
          color: 'white',
          background: 'rgba(80,80,0,0.5)',
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 12,
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
          zIndex: 100
        }}>
          Using fallback camera path.
        </div>
      )}
      
      {CONFIG.enableTouchDrag && (
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 20,
            transform: 'translateX(-50%)',
            padding: '10px 18px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.35)',
            color: 'white',
            fontSize: 12,
            fontFamily: 'sans-serif',
            pointerEvents: 'auto',
            touchAction: 'none',
            zIndex: 100
          }}
        >
          Drag to navigate
        </div>
      )}
    </div>
  )
}

function ProgressTracker({ onProgress }) {
  const scroll = useScroll()
  useFrame(() => {
    if (!scroll || typeof scroll.offset !== 'number') return
    onProgress(scroll.offset)
  })
  return null
}