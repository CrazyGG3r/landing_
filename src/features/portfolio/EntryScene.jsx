import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLocation, useNavigationType } from 'react-router-dom'
import {
  FastForward,
  Play,
  Rewind,
  SkipBack,
  SkipForward,
  Snail,
  Square,
} from 'lucide-react'
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
import { resolveVhsProjectId } from './vhsProjects'
import { warmRoute } from '../../shared/performance/routePreloader'

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
// keyframed). Its established FOV is applied explicitly so a model re-export
// cannot silently alter the lens, while `camera.aspect` still follows the live
// viewport instead of the glTF's baked 16:9.
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  modelPath: 'scenes/vhs/EntryScene.glb',
  vhsModelPath: DEFAULT_VHS_MODEL_PATH,
  vhsScale: 1,
  cameraNodeName: 'Camera',
  // Keep the established framing independent from incidental lens changes in
  // future Blender exports. ScrollPathCamera captures this as its start FOV
  // and narrows it toward 32 degrees along the path.
  cameraFov: 37.29907897795257,
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
  // Overall VHS post-composite intensity (0 = clean AMP signal, 1 = full VHS).
  // This blends the treatment itself; it does not change the Screen's opacity.
  vhsIntensity: .3,
  // Soft optical bevel strength. The glass stays thin/clear in the center and
  // bends the live screen plus the room more strongly toward its curved edges.
  crtRefraction: 0.82,
  // The hosted AMP reader, served on its own route so its runtime remains
  // fully sandboxed inside the ScreenSurface iframe.
  screenEmbedPath: '/__vhs_screen',
  readerFpsCap: 8,
  readerResolution: 640,
  // The Screen only powers on this long after every "Entry_" animation finishes.
  screenActivationDelayMs: 500,
}

const VHS_BUTTONS = [
  { name: 'VHSPlayer_Rev', label: 'REV', Icon: Rewind },
  { name: 'VHSPlayer_Play', label: 'PLAY', Icon: Play },
  { name: 'VHSPlayer_Slow', label: 'SLOW', Icon: Snail },
  { name: 'VHSPlayer_Stop', label: 'STOP', Icon: Square },
  { name: 'VHSPlayer_Fast', label: 'FAST', Icon: FastForward },
  { name: 'VHSPlayer_Prev', label: 'PREV', Icon: SkipBack },
  { name: 'VHSPlayer_Next', label: 'NEXT', Icon: SkipForward },
]

const VHS_SPEEDS = [
  { label: 'Very Slow', viewportRate: 0.03 },
  { label: 'Slow', viewportRate: 0.05 },
  // One viewport every 12.5 seconds: intentionally calm enough to read.
  { label: 'Normal', viewportRate: 0.08 },
  { label: 'Fast', viewportRate: 0.14 },
  { label: 'Very Fast', viewportRate: 0.24 },
]
const NORMAL_SPEED_INDEX = 2
const BUTTON_FADE_START = 0.72
const BUTTON_FADE_END = 0.78

function findNamedNode(root, name) {
  let found = null
  root.traverse((child) => {
    if (!found && child.name === name) found = child
  })
  return found
}

function smoothstep(min, max, value) {
  const t = THREE.MathUtils.clamp((value - min) / Math.max(0.0001, max - min), 0, 1)
  return t * t * (3 - 2 * t)
}

// ─── ROOM: camera + all three baked animations ───────────────────────────────

function EntrySceneRoom({
  playEntryAnimation,
  onReady,
  onEntryAnimationsComplete,
  buttonControllerRef,
}) {
  const gltf = useLoader(GLTFLoader, CONFIG.modelPath)
  const mixerRef = useRef(null)
  const entryActionsRef = useRef(null)
  const buttonActionsRef = useRef(new Map())
  const lockedButtonsRef = useRef(new Set())
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
    cameraNode.fov = CONFIG.cameraFov
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
    const lockedButtons = lockedButtonsRef.current
    entryActionsRef.current = entryClips.map((clip) => {
      const action = mixer.clipAction(clip)
      action.clampWhenFinished = true
      action.setLoop(THREE.LoopOnce, 1)
      action.play()
      return action
    })

    const buttonActions = new Map()
    VHS_BUTTONS.forEach(({ name }) => {
      // Blender may split one authored button motion into identically named
      // clips with numeric suffixes (the current Slow button does this).
      const clips = gltf.animations.filter(
        (clip) => clip.name === name || clip.name.startsWith(`${name}.`),
      )
      const actions = clips.map((clip) => {
        const action = mixer.clipAction(clip)
        action.enabled = true
        action.clampWhenFinished = true
        action.setLoop(THREE.LoopOnce, 1)
        action.weight = 0
        action.paused = true
        action.play()
        return action
      })
      buttonActions.set(name, actions)
    })
    buttonActionsRef.current = buttonActions
    mixerRef.current = mixer

    const buttonController = {
      press(name) {
        if (lockedButtons.has(name)) return false
        const actions = buttonActionsRef.current.get(name)
        if (!actions?.length) return false

        lockedButtons.add(name)
        actions.forEach((action) => {
          action.reset()
          action.enabled = true
          action.weight = 1
          action.paused = false
          action.timeScale = 1
          action.play()
        })
        return true
      },
    }
    buttonControllerRef.current = buttonController

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

    if (!playEntryAnimation) {
      // Direct/reload/history entry: apply every authored Entry_ clip at its
      // clamped final pose in one mixer update, without visibly playing it.
      const finalTime = Math.max(...entryClips.map((clip) => clip.duration))
      mixer.update(finalTime)
      fireCompleteRef.current()
    }

    return () => {
      if (buttonControllerRef.current === buttonController) {
        buttonControllerRef.current = null
      }
      mixer.stopAllAction()
      mixerRef.current = null
      entryActionsRef.current = null
      buttonActionsRef.current = new Map()
      lockedButtons.clear()
      fireCompleteRef.current = null
    }
  }, [gltf, playEntryAnimation, onEntryAnimationsComplete, buttonControllerRef])

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
    const hasActiveButton = lockedButtonsRef.current.size > 0
    if (entryDoneRef.current && !hasActiveButton) return
    mixerRef.current?.update(Math.min(rawDelta, 0.1))

    const entryActions = entryActionsRef.current
    if (!entryDoneRef.current && entryActions?.length && entryActions.every((action) => action.paused)) {
      fireCompleteRef.current?.()
    }

    if (hasActiveButton) {
      lockedButtonsRef.current.forEach((name) => {
        const actions = buttonActionsRef.current.get(name)
        if (!actions?.length || !actions.every((action) => action.paused)) return
        actions.forEach((action) => {
          action.weight = 0
        })
        lockedButtonsRef.current.delete(name)
      })
    }
  })

  if (!gltf?.scene) return null

  // The "Floor" plane ships with no material assigned in the glTF, so it
  // already falls back to three's single-sided default — intentional
  // (visible from one side only). Left untouched here on purpose.
  return <primitive object={gltf.scene} />
}

function VhsPlayerControls({
  sceneRoot,
  enabled,
  cameraScrollStateRef,
  onPress,
  transportSnapshot,
  vhsIndex,
  vhsCount,
}) {
  const { gl, camera } = useThree()
  const anchorRefs = useRef([])
  const iconRefs = useRef([])
  const labelRefs = useRef([])
  const revealRef = useRef(0)
  const raycasterRef = useRef(new THREE.Raycaster())
  const pointerRef = useRef(new THREE.Vector2())
  const worldPositionRef = useRef(new THREE.Vector3())

  const buttons = useMemo(() => VHS_BUTTONS.map((spec) => {
    const matches = []
    sceneRoot?.traverse((child) => {
      if (child.name === spec.name) matches.push(child)
    })
    // The glTF uses an outer transform node and an inner mesh with the same
    // name. Anchor to the transform so the label follows the button animation.
    const anchor = matches.find((node) => !node.isMesh) ?? matches[0] ?? null
    const hitMeshes = []
    anchor?.traverse((child) => {
      if (child.isMesh) hitMeshes.push(child)
    })
    return { ...spec, anchor, hitMeshes }
  }), [sceneRoot])

  useEffect(() => {
    if (!enabled) revealRef.current = 0
  }, [enabled])

  useEffect(() => {
    if (!enabled) return undefined
    const canvas = gl.domElement
    const hitMeshes = buttons.flatMap((button) => button.hitMeshes)
    const nameByMesh = new Map()
    buttons.forEach((button) => {
      button.hitMeshes.forEach((mesh) => nameByMesh.set(mesh, button.name))
    })

    const handlePointerDown = (event) => {
      if (event.button !== 0 || !hitMeshes.length) return
      const bounds = canvas.getBoundingClientRect()
      pointerRef.current.set(
        ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1,
        -((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 + 1,
      )
      raycasterRef.current.setFromCamera(pointerRef.current, camera)
      const hit = raycasterRef.current.intersectObjects(hitMeshes, false)[0]
      const name = hit ? nameByMesh.get(hit.object) : null
      if (name) onPress(name)
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    return () => canvas.removeEventListener('pointerdown', handlePointerDown)
  }, [buttons, camera, enabled, gl, onPress])

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    revealRef.current = enabled
      ? Math.min(1, revealRef.current + delta / 0.36)
      : 0

    const progress = THREE.MathUtils.clamp(
      cameraScrollStateRef?.current?.progress ?? 0,
      0,
      1,
    )
    const textMix = smoothstep(BUTTON_FADE_START, BUTTON_FADE_END, progress)
    const reveal = smoothstep(0, 1, revealRef.current)

    buttons.forEach((button, index) => {
      const group = anchorRefs.current[index]
      if (group && button.anchor) {
        button.anchor.getWorldPosition(worldPositionRef.current)
        group.position.copy(worldPositionRef.current)
      }

      const icon = iconRefs.current[index]
      if (icon) {
        icon.style.opacity = String(reveal * (1 - textMix))
        icon.style.transform = `scale(${THREE.MathUtils.lerp(0.82, 1, 1 - textMix)})`
      }
      const label = labelRefs.current[index]
      if (label) {
        label.style.opacity = String(reveal * textMix)
        label.style.transform = `scale(${THREE.MathUtils.lerp(0.82, 1, textMix)})`
      }
    })
  })

  return buttons.map((button, index) => {
    const { name, label } = button
    const isPressed =
      (name === 'VHSPlayer_Play' && transportSnapshot.direction === 1) ||
      (name === 'VHSPlayer_Rev' && transportSnapshot.direction === -1)
    const boundary =
      (name === 'VHSPlayer_Prev' && vhsIndex === 0) ||
      (name === 'VHSPlayer_Next' && vhsIndex === vhsCount - 1)
    const speedTitle =
      name === 'VHSPlayer_Fast' || name === 'VHSPlayer_Slow'
        ? `Current speed: ${VHS_SPEEDS[transportSnapshot.speedIndex].label}`
        : undefined

    return (
      <group
        key={name}
        ref={(node) => {
          anchorRefs.current[index] = node
        }}
      >
        <Html center zIndexRange={[8, 4]}>
          <button
            type="button"
            aria-label={`${label}${boundary ? ' (limit reached)' : ''}`}
            aria-pressed={name === 'VHSPlayer_Play' || name === 'VHSPlayer_Rev' ? isPressed : undefined}
            title={speedTitle ?? label}
            onClick={(event) => {
              event.stopPropagation()
              onPress(name)
            }}
            style={{
              position: 'relative',
              display: 'grid',
              placeItems: 'center',
              width: 34,
              height: 28,
              margin: 0,
              padding: 0,
              border: 0,
              borderRadius: 4,
              outline: 'none',
              boxShadow: 'none',
              WebkitTapHighlightColor: 'transparent',
              background: 'transparent',
              color: isPressed ? '#b8fff1' : boundary ? 'rgba(236, 244, 255, 0.45)' : '#f4f8ff',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.95), 0 0 7px rgba(170, 225, 255, 0.75)',
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.9))',
              cursor: 'pointer',
              pointerEvents: enabled ? 'auto' : 'none',
            }}
          >
            <span
              ref={(node) => {
                iconRefs.current[index] = node
              }}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                opacity: 0,
                willChange: 'opacity, transform',
              }}
            >
              {React.createElement(button.Icon, {
                size: 15,
                strokeWidth: 2.2,
                fill: name === 'VHSPlayer_Play' ? 'currentColor' : 'none',
              })}
            </span>
            <span
              ref={(node) => {
                labelRefs.current[index] = node
              }}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                font: '700 8px/1 ui-monospace, SFMono-Regular, Consolas, monospace',
                letterSpacing: '0.055em',
                opacity: 0,
                willChange: 'opacity, transform',
              }}
            >
              {label}
            </span>
          </button>
        </Html>
      </group>
    )
  })
}

// ─── SELECTED VHS UNIT: spawned as a child of VHSPoint ───────────────────────
//
// Beyond its static "Entry_VHS" pose, this unit's "Play" clip (aka "VHS_Play"
// — the glb sometimes ships it under either name, same fallback lookup
// VHSInstances.jsx already uses) and "Reel_Play" clip are driven live by
// the live AMP scroll state published by ScreenSurface:
//   • "Play"/"VHS_Play" loops continuously after all Entry_ clips finish. It
//     runs forward by default and while scrolling down on the Screen mesh, then
//     reverses while the most recent Screen scroll direction is upward.
//   • "Reel_Play" is scrubbed directly from the AMP document's real
//     scrollTop / (scrollHeight - clientHeight), so it plays exactly once over
//     the complete responsive project and is independent of camera travel.

function EntrySceneVhsUnit({
  vhsPointNode,
  vhsIndex,
  vhsCount,
  playEntryAnimation,
  playbackReady,
  ampScrollStateRef,
  transportStateRef,
}) {
  const gltf = useLoader(GLTFLoader, CONFIG.vhsModelPath)
  const { camera } = useThree()
  const attachedRef = useRef(null)
  const mixerRef = useRef(null)
  const entryVhsActionRef = useRef(null)
  const entryVhsShouldPlayRef = useRef(false)
  const hasAttachedOnceRef = useRef(false)
  const vhsPlayActionRef = useRef(null)
  const reelActionRef = useRef(null)

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
    const sourceMaterials = new Set()
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if (material) sourceMaterials.add(material)
      })
    })

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

    const mixer = new THREE.AnimationMixer(root)
    const findClip = (...names) => names.map((name) => gltf.animations.find((c) => c.name === name)).find(Boolean)
    const shouldPlayEntryVhs = playEntryAnimation && !hasAttachedOnceRef.current
    entryVhsShouldPlayRef.current = shouldPlayEntryVhs

    // This is the one unit sitting in the player, not on the shelf — it must
    // stay in its "Entry_VHS" pose always (never the shelf "VHS_Idle" pose).
    // It isn't hoverable/clickable, so a one-shot pose bake is enough.
    const entryVhsClip = findClip('Entry_VHS')
    if (entryVhsClip) {
      const action = mixer.clipAction(entryVhsClip)
      action.clampWhenFinished = true
      action.setLoop(THREE.LoopOnce, 1)
      action.play()
      if (!shouldPlayEntryVhs) action.time = entryVhsClip.duration
      entryVhsActionRef.current = action
    }

    // "Play" ("VHS_Play") is prepared now, but activated only after every
    // Entry_ clip has finished. From then on it loops forward by default.
    const vhsPlayClip = findClip('VHS_Play', 'Play')
    if (vhsPlayClip) {
      const action = mixer.clipAction(vhsPlayClip)
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.clampWhenFinished = false
      action.weight = 0
      action.paused = true
      action.play()
      vhsPlayActionRef.current = action
    }

    // "Reel_Play": pure scrub target, never itself "played" — its time is set
    // directly from the AMP document's scroll completion every frame below.
    const reelClip = findClip('Reel_Play')
    if (reelClip) {
      const action = mixer.clipAction(reelClip)
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.weight = 1
      action.paused = true
      action.time = 0
      action.play()
      reelActionRef.current = action
    }

    mixer.update(0)
    mixerRef.current = mixer

    vhsPointNode.add(root)
    attachedRef.current = root
    hasAttachedOnceRef.current = true

    return () => {
      mixer.stopAllAction()
      mixerRef.current = null
      entryVhsActionRef.current = null
      entryVhsShouldPlayRef.current = false
      vhsPlayActionRef.current = null
      reelActionRef.current = null
      vhsPointNode.remove(root)
      attachedRef.current = null
      const ownedMaterials = new Set()
      root.traverse((child) => {
        if (!child.isMesh) return
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((material) => {
          if (material && !sourceMaterials.has(material)) ownedMaterials.add(material)
        })
      })
      ownedMaterials.forEach((material) => material.dispose())
    }
  }, [
    gltf,
    vhsPointNode,
    vhsIndex,
    vhsCount,
    playEntryAnimation,
    maskUniforms,
    labelUniform,
  ])

  useFrame((_, rawDelta) => {
    const mixer = mixerRef.current
    if (!mixer) return

    const ampScroll = ampScrollStateRef?.current
    const reelAction = reelActionRef.current
    if (reelAction && ampScroll) {
      const completion = THREE.MathUtils.clamp(ampScroll.progress ?? 0, 0, 1)
      reelAction.time = completion * reelAction.getClip().duration
    }

    const vhsPlayAction = vhsPlayActionRef.current
    const entryVhsAction = entryVhsActionRef.current
    const ownEntryComplete =
      !entryVhsShouldPlayRef.current || !entryVhsAction || entryVhsAction.paused
    const manualDirection =
      ampScroll?.manualPlaybackUntil > performance.now()
        ? ampScroll.playDirection
        : 0
    const playbackDirection = playbackReady
      ? transportStateRef?.current?.direction || manualDirection
      : 0
    if (vhsPlayAction && playbackDirection && ownEntryComplete) {
      vhsPlayAction.timeScale = playbackDirection < 0 ? -1 : 1
      vhsPlayAction.weight = 1
      vhsPlayAction.paused = false
    } else if (vhsPlayAction && !vhsPlayAction.paused) {
      // Stop freezes the transport at its exact current authored pose.
      vhsPlayAction.paused = true
    }

    mixer.update(Math.min(rawDelta, 0.1))

    if (typeof window !== 'undefined') {
      window.__vhsVisDebug = {
        root: attachedRef.current,
        camera,
        vhsPlayAction: vhsPlayActionRef.current,
        reelAction: reelActionRef.current,
        ampScroll: ampScroll ? { ...ampScroll } : null,
      }
    }
  })

  return null
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function EntryScene() {
  const location = useLocation()
  const navigationType = useNavigationType()
  // Only an explicit Portfolio -> Entry PUSH owns the cinematic intro.
  // Reloads, direct URLs, and browser-history visits are POP navigations.
  const playEntryAnimation =
    navigationType === 'PUSH' && location.state?.fromPortfolio === true
  const initialTrackProgress = playEntryAnimation ? 0 : 1
  const vhsCount = location.state?.vhsCount > 0
    ? location.state.vhsCount
    : INTERACTIVE_OBJECT_SCROLL_TARGETS.length
  const initialVhsIndex =
    typeof location.state?.vhsIndex === 'number'
      ? THREE.MathUtils.clamp(Math.trunc(location.state.vhsIndex), 0, vhsCount - 1)
      : 0

  const { active: assetsLoading, progress: assetsProgress } = useProgress()
  const [vhsIndex, setVhsIndex] = useState(initialVhsIndex)
  const [vhsPointNode, setVhsPointNode] = useState(null)
  const [screenNode, setScreenNode] = useState(null)
  const [sceneRoot, setSceneRoot] = useState(null)
  const [fadeVisible, setFadeVisible] = useState(true)
  const [screenActive, setScreenActive] = useState(false)
  const [scrollTrackingActive, setScrollTrackingActive] = useState(false)
  const activationTimerRef = useRef(null)
  const buttonControllerRef = useRef(null)
  const screenControllerRef = useRef(null)
  const transportStateRef = useRef({
    direction: 0,
    speedIndex: NORMAL_SPEED_INDEX,
    viewportRate: VHS_SPEEDS[NORMAL_SPEED_INDEX].viewportRate,
  })
  const [transportSnapshot, setTransportSnapshot] = useState({
    ...transportStateRef.current,
  })
  // Camera travel and AMP reading are separate scroll domains. ScreenSurface
  // publishes the reader's responsive document metrics for the tape animations.
  const cameraScrollStateRef = useRef({ progress: initialTrackProgress })
  const ampScrollStateRef = useRef({
    progress: 0,
    playDirection: 1,
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    manualPlaybackUntil: 0,
  })

  // The Screen's embed is per-tape: the selected VHS (vhsIndex) maps to an AMP
  // project, passed to the reader iframe as `?p=<projectId>`. Changing tapes
  // changes embedSrc, which re-mounts ScreenSurface's iframe with the new document.
  const embedSrc = useMemo(() => {
    const projectId = resolveVhsProjectId(vhsIndex)
    const path = `${CONFIG.screenEmbedPath}?p=${encodeURIComponent(projectId)}`
    return typeof window !== 'undefined' ? `${window.location.origin}${path}` : path
  }, [vhsIndex])

  useEffect(() => {
    // A newly inserted tape starts at the beginning of its own project; do
    // not let one frame of the previous document's metrics scrub its reel.
    Object.assign(ampScrollStateRef.current, {
      progress: 0,
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
      manualPlaybackUntil: 0,
    })
  }, [vhsIndex])

  useEffect(() => {
    void warmRoute('/entry', {
      includeAssets: false,
      intent: true,
      projectId: resolveVhsProjectId(vhsIndex),
    })
  }, [vhsIndex])

  const handleRoomReady = useCallback(({ vhsPointNode: vp, screenNode: sn, sceneRoot: root }) => {
    setVhsPointNode(vp)
    setScreenNode(sn)
    setSceneRoot(root)
  }, [])

  const handleScreenControllerReady = useCallback((controller) => {
    screenControllerRef.current = controller
  }, [])

  const updateTransport = useCallback((changes) => {
    Object.assign(transportStateRef.current, changes)
    const speed = VHS_SPEEDS[transportStateRef.current.speedIndex]
    transportStateRef.current.viewportRate = speed.viewportRate
    setTransportSnapshot({ ...transportStateRef.current })
  }, [])

  const handleButtonPress = useCallback((name) => {
    // A pressed button owns its animation until the authored clip finishes.
    // Other transport buttons remain independent and responsive.
    if (!buttonControllerRef.current?.press(name)) return

    switch (name) {
      case 'VHSPlayer_Play':
        updateTransport({
          direction: transportStateRef.current.direction === 1 ? 0 : 1,
        })
        break
      case 'VHSPlayer_Rev':
        updateTransport({
          direction: transportStateRef.current.direction === -1 ? 0 : -1,
        })
        break
      case 'VHSPlayer_Fast':
        updateTransport({
          speedIndex: Math.min(
            VHS_SPEEDS.length - 1,
            transportStateRef.current.speedIndex + 1,
          ),
        })
        break
      case 'VHSPlayer_Slow':
        updateTransport({
          speedIndex: Math.max(0, transportStateRef.current.speedIndex - 1),
        })
        break
      case 'VHSPlayer_Next':
        setVhsIndex((current) => Math.min(vhsCount - 1, current + 1))
        break
      case 'VHSPlayer_Prev':
        setVhsIndex((current) => Math.max(0, current - 1))
        break
      case 'VHSPlayer_Stop':
        updateTransport({
          direction: 0,
          speedIndex: NORMAL_SPEED_INDEX,
        })
        ampScrollStateRef.current.progress = 0
        ampScrollStateRef.current.scrollTop = 0
        ampScrollStateRef.current.manualPlaybackUntil = 0
        screenControllerRef.current?.scrollToStart()
        break
      default:
        break
    }
  }, [updateTransport, vhsCount])

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
            playEntryAnimation={playEntryAnimation}
            onReady={handleRoomReady}
            onEntryAnimationsComplete={handleEntryAnimationsComplete}
            buttonControllerRef={buttonControllerRef}
          />
        </Suspense>

        {vhsPointNode && (
          <Suspense fallback={null}>
            <EntrySceneVhsUnit
              vhsPointNode={vhsPointNode}
              vhsIndex={vhsIndex}
              vhsCount={vhsCount}
              playEntryAnimation={playEntryAnimation}
              playbackReady={scrollTrackingActive}
              ampScrollStateRef={ampScrollStateRef}
              transportStateRef={transportStateRef}
            />
          </Suspense>
        )}

        {sceneRoot && (
          <VhsPlayerControls
            sceneRoot={sceneRoot}
            enabled={scrollTrackingActive}
            cameraScrollStateRef={cameraScrollStateRef}
            onPress={handleButtonPress}
            transportSnapshot={transportSnapshot}
            vhsIndex={vhsIndex}
            vhsCount={vhsCount}
          />
        )}

        {screenNode && (
          <ScreenSurface
            screenNode={screenNode}
            embedSrc={embedSrc}
            active={screenActive}
            resolution={CONFIG.readerResolution}
            fps={CONFIG.readerFpsCap}
            idleFps={CONFIG.readerFpsCap}
            shaderFps={CONFIG.readerFpsCap}
            interactionShaderFps={CONFIG.readerFpsCap}
            ampScrollStateRef={ampScrollStateRef}
            transportStateRef={transportStateRef}
            onControllerReady={handleScreenControllerReady}
            vhsIntensity={CONFIG.vhsIntensity}
          />
        )}

        {sceneRoot && (
          <CRTGlass
            sceneRoot={sceneRoot}
            refraction={CONFIG.crtRefraction}
          />
        )}

        {sceneRoot && (
          <ScrollPathCamera
            sceneRoot={sceneRoot}
            active={scrollTrackingActive}
            initialProgress={initialTrackProgress}
            scrollStateRef={cameraScrollStateRef}
          />
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
