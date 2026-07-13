import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'
import {
  DEFAULT_VHS_MODEL_PATH,
  VHS_PRIMARY_MASK_PATH,
  VHS_SECONDARY_MASK_PATH,
  VHS_LABEL_DIR,
  buildVhsPaletteEntry,
  makeBlankMaskTexture,
  loadMaskTextureInto,
  makeBlankLabelTexture,
  loadLabelTextureInto,
  collectVhsSourceMaterials,
  applyVhsMaterials,
  fixCutoutTransparency,
} from './vhsMaterials'
import { INTERACTIVE_OBJECT_SCROLL_TARGETS } from './PortfolioFocusTargets'
import ScreenSurface from './ScreenSurface'
import CRTGlass from './CRTGlass'
import ScrollPathCamera from './ScrollPathCamera'

// ═══════════════════════════════════════════════════════════════════════════════
// ENTRY SCENE
// ═══════════════════════════════════════════════════════════════════════════════
//
// EntryScene.glb ships three simultaneous, play-once animations: "Entry_Camera"
// (Camera move + look), "Entry_VHS" (the VHSPoint empty flying to rest) and
// "Entry_VHSPlayer" (the player tray rotating open). One AnimationMixer rooted
// at the loaded scene resolves all three by node name and plays them together
// — all .play()'d in the same tick, so they start on the exact same frame.
//
// The VHS unit clicked in Portfolio.jsx is carried over via router state
// (vhsIndex/vhsCount) and spawned as a child of the VHSPoint node, so it
// inherits VHSPoint's animated transform for free through the normal
// three.js scene graph — no per-frame syncing needed.
//
// The room's Camera node has no animated FOV (only translation/rotation are
// keyframed) — GLTFLoader already converts its authored yfov (radians) to
// three.js's degrees convention. The only adjustment this scene needs is
// recomputing `camera.aspect` from the live viewport instead of the glTF's
// baked 16:9, so the framing isn't stretched on other aspect ratios.
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  modelPath: 'scenes/vhs/EntryScene.glb',
  vhsModelPath: DEFAULT_VHS_MODEL_PATH,
  vhsScale: 1,
  cameraNodeName: 'Camera',
  vhsPointNodeName: 'VHSPoint',
  backgroundColor: '#111122',
  hdriPath: '/hdri/vhs/Soft 2RingHighContrast.exr',
  environmentIntensity: 0.15,
  vhsEnvMapIntensity: 1.1,
  ambientIntensity: 0.4,
  directionalLightIntensity: 0.8,
  directionalLightPosition: [10, 20, 5],
  directionalLightColor: '#ffffff',
  fadeOverlayColor: '#ffffff',
  fadeOutDurationMs: 450,
  screenNodeName: 'Screen',
  // The hosted placeholder page (NotFound), served on its own route so it runs
  // fully sandboxed inside the ScreenSurface iframe.
  screenEmbedPath: '/__vhs_screen',
  // The Screen only powers on this long after every "Entry_" animation finishes.
  screenActivationDelayMs: 500,
}

function findNamedNode(root, name) {
  let found = null
  root.traverse((child) => {
    if (!found && child.name === name) found = child
  })
  return found
}

// ─── ROOM: camera + all three baked animations ───────────────────────────────

function EntrySceneRoom({ onReady, onEntryAnimationsComplete }) {
  const gltf = useLoader(GLTFLoader, CONFIG.modelPath)
  const mixerRef = useRef(null)
  const entryActionsRef = useRef(null)
  const fireCompleteRef = useRef(null)
  const notifiedRef = useRef(false)
  const entryDoneRef = useRef(false)
  const { size } = useThree()
  const setDefault = useThree((state) => state.set)

  const { cameraNode, vhsPointNode, screenNode } = useMemo(() => {
    if (!gltf?.scene) return { cameraNode: null, vhsPointNode: null, screenNode: null }
    return {
      cameraNode: findNamedNode(gltf.scene, CONFIG.cameraNodeName),
      vhsPointNode: findNamedNode(gltf.scene, CONFIG.vhsPointNodeName),
      screenNode: findNamedNode(gltf.scene, CONFIG.screenNodeName),
    }
  }, [gltf])

  // Use the glTF's baked camera when present; if the scene ships without one
  // (e.g. a re-export that dropped the Camera node), silently fall back to the
  // Canvas's default camera so the scene still renders.
  useEffect(() => {
    if (!cameraNode) return
    cameraNode.manual = true
    cameraNode.aspect = size.width / size.height
    cameraNode.updateProjectionMatrix()
    setDefault({ camera: cameraNode })
  }, [cameraNode, setDefault, size.width, size.height])

  // Only "Entry_"-prefixed clips ever play in the entry scene — explicitly
  // scoped (not "whatever's in the glb") so a future re-export that adds an
  // unrelated clip can't start auto-playing here. All actions are created and
  // .play()'d in this same synchronous pass, before the mixer's first update()
  // — so they all begin advancing from the very first animation frame
  // together, at their own natural authored speed/length. LoopOnce +
  // clampWhenFinished holds each one's final pose instead of resetting, and
  // (just as importantly) makes three.js auto-set that action's `.paused` the
  // instant it truly reaches its own end.
  //
  // Completion — which gates both the Screen's power-on AND ScrollPathCamera
  // taking over the camera — is detected by polling that `.paused` flag every
  // frame in the useFrame below, NOT by a wall-clock setTimeout. A timeout
  // guess is a race: the mixer's playback is driven by clamped, frame-by-frame
  // delta accumulation (see the useFrame below), which can fall behind real
  // wall-clock time under any slowdown — and ScrollPathCamera's own per-frame
  // work (curve sampling, slerp, FOV lerp, wheel handling) is exactly the kind
  // of extra cost that can cause that. A timeout firing before the mixer's
  // simulated time actually caught up would cut the intro short and hand the
  // camera to the scroll mechanism early. Polling the mixer's own state instead
  // ties completion strictly to what has actually finished simulating/
  // rendering, so entry animations are always allowed to finish playing in
  // full before the scroll-tracking mechanism is ever allowed to engage.
  useEffect(() => {
    if (!gltf?.scene || !gltf.animations?.length) return undefined

    const entryClips = gltf.animations.filter((c) => c.name.startsWith('Entry_'))
    if (!entryClips.length) return undefined

    entryDoneRef.current = false

    const mixer = new THREE.AnimationMixer(gltf.scene)
    entryActionsRef.current = entryClips.map((clip) => {
      const action = mixer.clipAction(clip)
      action.clampWhenFinished = true
      action.setLoop(THREE.LoopOnce, 1)
      action.play()
      return action
    })
    mixerRef.current = mixer

    let firedComplete = false
    fireCompleteRef.current = () => {
      if (firedComplete) return
      firedComplete = true
      // Stop advancing the mixer once every Entry_ clip has finished — its
      // last-applied camera pose stays exactly as-is (three.js doesn't revert
      // values just because update() stops being called), and from here on
      // ScrollPathCamera becomes the sole thing writing camera position/
      // rotation. Without this, both would keep writing to the same camera
      // every frame and whichever's useFrame happened to run last each frame
      // would silently win, fighting/flickering against the other.
      entryDoneRef.current = true
      onEntryAnimationsComplete?.()
    }

    return () => {
      mixer.stopAllAction()
      mixerRef.current = null
      entryActionsRef.current = null
      fireCompleteRef.current = null
    }
  }, [gltf, onEntryAnimationsComplete])

  // Ready as soon as the scene graph is available — do NOT require a Camera
  // node (the glb may not include one). vhsPointNode gates the reveal; if it is
  // ever absent too, fall back to the scene root so the page never gets stuck
  // behind the loading fade.
  useEffect(() => {
    if (notifiedRef.current || !gltf?.scene) return
    if (!vhsPointNode && !screenNode) return
    notifiedRef.current = true
    onReady?.({ vhsPointNode, screenNode, sceneRoot: gltf.scene })
  }, [vhsPointNode, screenNode, gltf, onReady])

  useFrame((_, rawDelta) => {
    if (entryDoneRef.current) return
    mixerRef.current?.update(Math.min(rawDelta, 0.1))

    const actions = entryActionsRef.current
    if (actions?.length && actions.every((action) => action.paused)) {
      fireCompleteRef.current?.()
    }
  })

  if (!gltf?.scene) return null

  // The "Floor" plane ships with no material assigned in the glTF, so it
  // already falls back to three's single-sided default — intentional
  // (visible from one side only). Left untouched here on purpose.
  return <primitive object={gltf.scene} />
}

// ─── SELECTED VHS UNIT: spawned as a child of VHSPoint ───────────────────────

function EntrySceneVhsUnit({ vhsPointNode, vhsIndex, vhsCount }) {
  const gltf = useLoader(GLTFLoader, CONFIG.vhsModelPath)
  const attachedRef = useRef(null)

  const maskUniforms = useMemo(() => {
    const primary = { value: makeBlankMaskTexture() }
    const secondary = { value: makeBlankMaskTexture() }
    loadMaskTextureInto(primary, VHS_PRIMARY_MASK_PATH)
    loadMaskTextureInto(secondary, VHS_SECONDARY_MASK_PATH)
    return { primary, secondary }
  }, [])

  const labelUniform = useMemo(() => {
    const holder = { value: makeBlankLabelTexture() }
    loadLabelTextureInto(holder, `${VHS_LABEL_DIR}/${vhsIndex + 1}.png`)
    return holder
  }, [vhsIndex])

  useEffect(() => {
    if (!gltf?.scene || !vhsPointNode) return undefined

    const { vhsSourceMaterials, reelSupportSourceMaterials, glassSourceMaterials, coverSourceMaterials } =
      collectVhsSourceMaterials(gltf.scene)

    reelSupportSourceMaterials.forEach((m) => {
      fixCutoutTransparency(m)
      m.envMapIntensity = CONFIG.vhsEnvMapIntensity
    })

    const root = gltf.scene.clone(true)
    root.scale.setScalar(CONFIG.vhsScale)

    applyVhsMaterials(root, {
      vhsSourceMaterials,
      glassSourceMaterials,
      coverSourceMaterials,
      maskUniforms,
      colors: buildVhsPaletteEntry(vhsIndex, vhsCount),
      labelUniform,
      envMapIntensity: CONFIG.vhsEnvMapIntensity,
    })

    // This is the one unit sitting in the player, not on the shelf — it must
    // stay in its "Entry_VHS" pose always (never the shelf "VHS_Idle" pose).
    // It isn't hoverable/clickable here, so a one-shot pose bake is enough;
    // no per-frame mixer update needed afterward.
    const entryVhsClip = gltf.animations.find((c) => c.name === 'Entry_VHS')
    if (entryVhsClip) {
      const mixer = new THREE.AnimationMixer(root)
      mixer.clipAction(entryVhsClip).play()
      mixer.update(0)
    }

    vhsPointNode.add(root)
    attachedRef.current = root

    return () => {
      vhsPointNode.remove(root)
      attachedRef.current = null
    }
  }, [gltf, vhsPointNode, vhsIndex, vhsCount, maskUniforms, labelUniform])

  return null
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function EntryScene() {
  const location = useLocation()
  const vhsIndex = typeof location.state?.vhsIndex === 'number' ? location.state.vhsIndex : 0
  const vhsCount = location.state?.vhsCount > 0
    ? location.state.vhsCount
    : INTERACTIVE_OBJECT_SCROLL_TARGETS.length

  const { active: assetsLoading, progress: assetsProgress } = useProgress()
  const [vhsPointNode, setVhsPointNode] = useState(null)
  const [screenNode, setScreenNode] = useState(null)
  const [sceneRoot, setSceneRoot] = useState(null)
  const [fadeVisible, setFadeVisible] = useState(true)
  const [screenActive, setScreenActive] = useState(false)
  const [scrollTrackingActive, setScrollTrackingActive] = useState(false)
  const activationTimerRef = useRef(null)

  const embedSrc = useMemo(
    () => (typeof window !== 'undefined'
      ? `${window.location.origin}${CONFIG.screenEmbedPath}`
      : CONFIG.screenEmbedPath),
    [],
  )

  const handleRoomReady = useCallback(({ vhsPointNode: vp, screenNode: sn, sceneRoot: root }) => {
    setVhsPointNode(vp)
    setScreenNode(sn)
    setSceneRoot(root)
  }, [])

  const handleEntryAnimationsComplete = useCallback(() => {
    // Scroll-path camera tracking picks up the instant the intro finishes —
    // no extra delay. The Screen's power-on stays on its own separate delay.
    setScrollTrackingActive(true)

    if (activationTimerRef.current) return
    activationTimerRef.current = setTimeout(() => {
      setScreenActive(true)
    }, CONFIG.screenActivationDelayMs)
  }, [])

  useEffect(() => () => {
    if (activationTimerRef.current) clearTimeout(activationTimerRef.current)
  }, [])

  // Gate the reveal on the scene being ready (root resolved) rather than any one
  // specific node, so a re-export that drops a node can't wedge the loading fade.
  const revealReady = !!sceneRoot && !assetsLoading && assetsProgress >= 100

  useEffect(() => {
    if (!revealReady) return undefined
    const frame = requestAnimationFrame(() => setFadeVisible(false))
    return () => cancelAnimationFrame(frame)
  }, [revealReady])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: CONFIG.backgroundColor,
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 3], fov: 35 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={CONFIG.ambientIntensity} />
        <directionalLight
          position={CONFIG.directionalLightPosition}
          intensity={CONFIG.directionalLightIntensity}
          color={CONFIG.directionalLightColor}
        />
        <Environment
          files={CONFIG.hdriPath}
          background={false}
          intensity={CONFIG.environmentIntensity}
        />

        <Suspense fallback={null}>
          <EntrySceneRoom
            onReady={handleRoomReady}
            onEntryAnimationsComplete={handleEntryAnimationsComplete}
          />
        </Suspense>

        {vhsPointNode && (
          <Suspense fallback={null}>
            <EntrySceneVhsUnit
              vhsPointNode={vhsPointNode}
              vhsIndex={vhsIndex}
              vhsCount={vhsCount}
            />
          </Suspense>
        )}

        {screenNode && (
          <ScreenSurface
            screenNode={screenNode}
            embedSrc={embedSrc}
            active={screenActive}
          />
        )}

        {sceneRoot && <CRTGlass sceneRoot={sceneRoot} />}

        {sceneRoot && (
          <ScrollPathCamera sceneRoot={sceneRoot} active={scrollTrackingActive} />
        )}
      </Canvas>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          background: CONFIG.fadeOverlayColor,
          opacity: fadeVisible ? 1 : 0,
          transition: `opacity ${CONFIG.fadeOutDurationMs}ms ease-out`,
        }}
      />
    </div>
  )
}
