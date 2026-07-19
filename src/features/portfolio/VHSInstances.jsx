import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import {
  DEFAULT_VHS_MODEL_PATH,
  VHS_PRIMARY_MASK_PATH,
  VHS_SECONDARY_MASK_PATH,
  VHS_LABEL_DIR,
  buildVhsPalette,
  makeBlankMaskTexture,
  loadMaskTextureInto,
  makeBlankLabelTexture,
  loadLabelTextureInto,
  collectVhsSourceMaterials,
  applyVhsMaterials,
  fixCutoutTransparency,
} from './vhsMaterials'

// ═══════════════════════════════════════════════════════════════════════════════
// VHS INSTANCES
// ═══════════════════════════════════════════════════════════════════════════════
//
// Takes the "I_" empties extracted from InitialScene.glb and spawns one clone of
// VHSUnit.glb per empty, copying name / position / rotation exactly. Each clone
// gets its own dedicated primary/secondary tint (via mask-driven color blend on
// the shared "VHS" material) and its own AnimationMixer driving four action
// sets: VHS_Idle (rest pose), VHS_HoverClick (frame 1→30 hover, 30→100 click,
// authored-time playback) and Reel_Play / VHS_Play, which each play once — linearly, no easing —
// forward on hover-in and in reverse on hover-out, independently of the
// hover/click frame scrub.
//
// The resulting proxy meshes (one per instance, named exactly like their empty)
// are handed back to Portfolio so the existing MetaballCursor / focus-scroll /
// click-to-navigate pipeline can register them exactly like any other "I_" mesh.
// ═══════════════════════════════════════════════════════════════════════════════

const FPS = 30
const FRAME_1_TIME = 1 / FPS
const FRAME_30_TIME = 30 / FPS
const FRAME_100_TIME = 100 / FPS
const ACTION_EPSILON = 1 / 1000

// VHS_HoverClick rotates the whole rig ~60°+ between frame 1 and frame 30
// (confirmed directly from the glTF keyframes), so a hit region that's frozen
// at the rest pose will occasionally miss for a frame or two while the model
// swings through that motion. Rather than inflating the hit region to try to
// cover the whole swing — which was tried and made the mask balloon far
// beyond the unit — a brief grace period bridges those momentary misses:
// hover only actually drops once a miss has persisted longer than this, so a
// real mouse-away still reads as instant while animation-driven jitter
// doesn't cause the hover to flicker.
const HOVER_MISS_GRACE_S = 0.18

// ─── STATIC HIT-REGION PROXY ─────────────────────────────────────────────────
// Earlier attempts approximated the hit region with a synthetic box (sized
// from a template, or swept across the hover animation, or padded by various
// amounts). All of them measured or framed the unit indirectly, and each
// approximation showed up as a visible mismatch — because the cassette is a
// thin, elongated shape and every VHS empty sits at its own arbitrary 3D
// rotation: an axis-aligned box around a tilted thin rectangle is *never* a
// tight fit, no matter how its size is tuned, and can end up looking
// offset/oversized in ways that don't reduce to a single padding number.
//
// So instead of approximating a shape, this reuses the *real* cassette
// geometry (the same "VHS" mesh that's actually rendered) for hit-testing —
// there is no shape mismatch because it's the same shape. What it does *not*
// reuse is that mesh's live, animated transform: VHS_HoverClick physically
// moves the cassette (frame 1→30 swings the rig ~60°+), and driving hover
// detection from a mesh that hover itself keeps relocating caused a feedback
// loop (hover moves the mesh → mouse is no longer over it → hover drops →
// animation reverses → mesh moves back → hover re-triggers → repeat).
//
// The fix: clone just the local transform the mesh has *right now* (its rest
// pose, before any animation has run) relative to `root`, and bake that once
// into a plain, non-animated proxy that shares the mesh's geometry. It is
// pixel-accurate to the model exactly as it sits at rest, and — being static
// — can never chase its own tail the way the live mesh did.
function createStaticHitProxy(root, shellMesh) {
  root.updateMatrixWorld(true)

  const rootWorldInverse = new THREE.Matrix4().copy(root.matrixWorld).invert()
  const localToRoot = new THREE.Matrix4().multiplyMatrices(rootWorldInverse, shellMesh.matrixWorld)

  const proxy = new THREE.Mesh(shellMesh.geometry)
  proxy.matrixAutoUpdate = false
  proxy.matrix.copy(localToRoot)
  proxy.matrixWorldNeedsUpdate = true
  proxy.visible = false
  return proxy
}

function beginClickAction(inst) {
  if (!inst || inst.clicked || !inst.hoverClickAction) return false
  inst.clicked = true
  inst.clickQueued = false
  inst.hoverClickAction.paused = false
  inst.hoverClickAction.timeScale = 1
  inst.hoverClickAction.time = FRAME_30_TIME
  inst.hoverClickAction.weight = 1
  return true
}

function resolveQueuedClick(inst) {
  const resolve = inst.clickResolve
  inst.clickResolve = null
  if (resolve) resolve()
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function VHSInstances({
  emptyTransforms,
  modelPath = DEFAULT_VHS_MODEL_PATH,
  scale = 1,
  envMapIntensity = 1,
  stateRef,
  onInstancesReady,
  onControllerReady,
}) {
  const gltf = useLoader(GLTFLoader, modelPath)
  const groupRef = useRef(null)
  const instancesRef = useRef([])

  const maskUniforms = useMemo(() => {
    const primary = { value: makeBlankMaskTexture() }
    const secondary = { value: makeBlankMaskTexture() }
    loadMaskTextureInto(primary, VHS_PRIMARY_MASK_PATH)
    loadMaskTextureInto(secondary, VHS_SECONDARY_MASK_PATH)
    return { primary, secondary }
  }, [])

  // One numbered label per VHS unit (1-based, matching the unit's position),
  // loaded once and reused across re-renders/instance rebuilds.
  const labelUniforms = useMemo(() => {
    const count = emptyTransforms?.length ?? 0
    const uniforms = []
    for (let i = 0; i < count; i += 1) {
      const holder = { value: makeBlankLabelTexture() }
      loadLabelTextureInto(holder, `${VHS_LABEL_DIR}/${i + 1}.png`)
      uniforms.push(holder)
    }
    return uniforms
  }, [emptyTransforms?.length])

  const palette = useMemo(
    () => buildVhsPalette(emptyTransforms?.length ?? 0),
    [emptyTransforms?.length],
  )

  useEffect(() => {
    const container = groupRef.current
    if (!gltf?.scene || !emptyTransforms?.length || !container) return undefined

    // GLTFLoader clones a glTF material per-mesh whenever that mesh's
    // geometry needs different derivative-tangent / vertex-color / flat-
    // shading handling than whichever mesh first claimed the material (see
    // GLTFLoader's assignFinalMaterial) — so several *distinct* THREE.Material
    // objects can end up sharing the authored name "VHS" (or "ReelSupport").
    // collectVhsSourceMaterials walks the source scene once and gathers every
    // distinct object sharing each name instead of assuming there's only one.
    const { vhsSourceMaterials, reelSupportSourceMaterials, glassSourceMaterials, coverSourceMaterials } =
      collectVhsSourceMaterials(gltf.scene)

    // ReelSupport is shared by reference across every clone (plain
    // `.clone()` doesn't deep-clone materials), so fixing every distinct
    // instance here fixes it for all 11 units.
    reelSupportSourceMaterials.forEach((m) => {
      fixCutoutTransparency(m)
      m.envMapIntensity = envMapIntensity
    })

    const instances = emptyTransforms.map((transform, index) => {
      const root = gltf.scene.clone(true)
      root.name = transform.name
      root.position.copy(transform.position)
      root.quaternion.copy(transform.quaternion)
      // Respect each empty's own authored scale (per-instance size override)
      // and layer the global `scale` factor on top of it as an overall knob.
      if (transform.scale) {
        root.scale.copy(transform.scale).multiplyScalar(scale)
      } else {
        root.scale.setScalar(scale)
      }
      container.add(root)

      const colors = palette[index % palette.length]
      const labelUniform = labelUniforms[index] ?? { value: makeBlankLabelTexture() }
      const shellMesh = applyVhsMaterials(root, {
        vhsSourceMaterials,
        glassSourceMaterials,
        coverSourceMaterials,
        maskUniforms,
        colors,
        labelUniform,
        envMapIntensity,
      })

      const proxyMesh = shellMesh ? createStaticHitProxy(root, shellMesh) : null
      if (proxyMesh) {
        root.add(proxyMesh)
        proxyMesh.name = transform.name
        // The cursor ID proxy is intentionally static and invisible, so retain
        // the animated visual root explicitly for the foreground hover pass.
        proxyMesh.metaballRenderRoot = root
      } else if (shellMesh) {
        shellMesh.name = transform.name
        shellMesh.metaballRenderRoot = root
      }

      const mixer = new THREE.AnimationMixer(root)
      // The shared VHSUnit.glb also ships "Entry_"-prefixed clips (used only by
      // the EntryScene). They must never drive a unit on the portfolio page, so
      // they are excluded from the pool the portfolio ever turns into actions.
      const portfolioClips = gltf.animations.filter((c) => !c.name.startsWith('Entry_'))
      const findClip = (...names) => names.map((name) => portfolioClips.find((c) => c.name === name)).find(Boolean)

      const idleAction = findClip('VHS_Idle') ? mixer.clipAction(findClip('VHS_Idle')) : null
      const hoverClickAction = findClip('VHS_HoverClick') ? mixer.clipAction(findClip('VHS_HoverClick')) : null
      const reelAction = findClip('Reel_Play') ? mixer.clipAction(findClip('Reel_Play')) : null
      const vhsPlayClip = findClip('VHS_Play', 'Play')
      const vhsPlayAction = vhsPlayClip ? mixer.clipAction(vhsPlayClip) : null

      if (idleAction) {
        idleAction.play()
        idleAction.paused = true
        idleAction.time = 0
        idleAction.weight = 1
      }

      if (hoverClickAction) {
        hoverClickAction.play()
        hoverClickAction.paused = true
        hoverClickAction.time = FRAME_1_TIME
        hoverClickAction.weight = 0
        hoverClickAction.timeScale = 1
        hoverClickAction.clampWhenFinished = true
        hoverClickAction.setLoop(THREE.LoopOnce, 1)
      }

      // Reel_Play and VHS_Play: plain, un-eased one-shots gated entirely by
      // hover state (see the useFrame loop below) — play forward once on
      // hover-in, reverse once on hover-out. They start fully inactive
      // (weight 0) so they never compete with idle/hoverClick on shared
      // channels until hover actually triggers them.
      ;[reelAction, vhsPlayAction].forEach((action) => {
        if (!action) return
        action.play()
        action.paused = true
        action.time = 0
        action.weight = 0
        action.timeScale = 1
        action.clampWhenFinished = true
        action.setLoop(THREE.LoopOnce, 1)
      })

      return {
        index,
        name: transform.name,
        root,
        mixer,
        idleAction,
        hoverClickAction,
        reelAction,
        vhsPlayAction,
        proxyMesh: proxyMesh ?? shellMesh,
        crossfade: 0,
        clicked: false,
        clickQueued: false,
        clickResolve: null,
        hoverEngaged: false,
        hoverMissTimer: 0,
        prevHoverEngaged: false,
      }
    })

    instancesRef.current = instances

    const meshes = instances.map((inst) => inst.proxyMesh).filter(Boolean)
    onInstancesReady?.(meshes)
    onControllerReady?.({
      playClick(index) {
        const inst = instancesRef.current[index]
        if (!inst || inst.clicked || !inst.hoverClickAction) return Promise.resolve()

        const alreadyHovered = inst.hoverClickAction.time >= FRAME_30_TIME - ACTION_EPSILON
        if (alreadyHovered) {
          beginClickAction(inst)
          return Promise.resolve()
        }

        inst.clickQueued = true
        inst.hoverEngaged = true
        inst.hoverMissTimer = 0

        return new Promise((resolve) => {
          inst.clickResolve = resolve
        })
      },
    })

    return () => {
      instances.forEach((inst) => {
        resolveQueuedClick(inst)
        inst.mixer.stopAllAction()
        container.remove(inst.root)
      })
      instancesRef.current = []
    }
  }, [gltf, emptyTransforms, palette, maskUniforms, labelUniforms, scale, envMapIntensity, onInstancesReady, onControllerReady])

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const activeId = stateRef?.current?.cs?.activeId ?? 0

    instancesRef.current.forEach((inst) => {
      const rawHovered = activeId === inst.index + 1

      // Debounce hover *loss* only: a hit region frozen at the rest pose can
      // miss for a frame or two while the hover animation itself swings the
      // model through its rotation. Bridging brief misses like this (instead
      // of inflating the hit region to cover the whole swing) keeps it
      // pixel-accurate to the resting unit while still avoiding the old
      // hover/animation feedback-loop jitter.
      if (rawHovered) {
        inst.hoverMissTimer = 0
        inst.hoverEngaged = true
      } else if (inst.hoverEngaged) {
        inst.hoverMissTimer += delta
        if (inst.hoverMissTimer > HOVER_MISS_GRACE_S) {
          inst.hoverEngaged = false
        }
      }
      const isHovered = inst.hoverEngaged || inst.clickQueued

      if (inst.clicked) {
        // A click should read as instant — full hoverClick pose right away,
        // no fade-in wait.
        inst.crossfade = 1
      } else if (inst.hoverClickAction) {
        // Play the authored hover segment directly at normal clip speed:
        // forward to frame 30 on hover-in, reverse to frame 1 on hover-out.
        const hoverAction = inst.hoverClickAction
        const atRest = hoverAction.time <= FRAME_1_TIME + ACTION_EPSILON
        const atHover = hoverAction.time >= FRAME_30_TIME - ACTION_EPSILON

        if (isHovered) {
          if (!atHover || hoverAction.timeScale < 0) {
            hoverAction.paused = false
            hoverAction.timeScale = 1
            hoverAction.weight = 1
            if (hoverAction.time < FRAME_1_TIME) hoverAction.time = FRAME_1_TIME
          }
        } else if (!atRest) {
          hoverAction.paused = false
          hoverAction.timeScale = -1
          hoverAction.weight = 1
          if (hoverAction.time > FRAME_30_TIME) hoverAction.time = FRAME_30_TIME
        }

        inst.crossfade = atRest && !isHovered ? 0 : 1
      }

      if (inst.idleAction) inst.idleAction.weight = 1 - inst.crossfade
      if (inst.hoverClickAction) inst.hoverClickAction.weight = inst.crossfade

      // Reel_Play / VHS_Play: independent of the hoverClick frame scrub
      // above — plain linear one-shots, no easing. Edge-triggered off the
      // debounced hover state: forward once on hover-in, reverse once on
      // hover-out.
      if (isHovered && !inst.prevHoverEngaged) {
        ;[inst.reelAction, inst.vhsPlayAction].forEach((action) => {
          if (!action) return
          action.weight = 1
          action.timeScale = 1
          if (action.paused && action.time >= action.getClip().duration - ACTION_EPSILON) {
            action.time = 0
          }
          action.paused = false
        })
      } else if (!isHovered && inst.prevHoverEngaged) {
        ;[inst.reelAction, inst.vhsPlayAction].forEach((action) => {
          if (!action) return
          action.weight = 1
          action.timeScale = -1
          if (action.paused && action.time <= ACTION_EPSILON) {
            action.time = action.getClip().duration
          }
          action.paused = false
        })
      }
      inst.prevHoverEngaged = isHovered

      inst.mixer.update(delta)

      if (inst.hoverClickAction && !inst.clicked) {
        const hoverAction = inst.hoverClickAction
        if (hoverAction.timeScale > 0 && hoverAction.time >= FRAME_30_TIME - ACTION_EPSILON) {
          hoverAction.time = FRAME_30_TIME
          hoverAction.paused = true
          inst.crossfade = 1
          if (inst.clickQueued) {
            beginClickAction(inst)
            resolveQueuedClick(inst)
          }
        } else if (hoverAction.timeScale < 0 && hoverAction.time <= FRAME_1_TIME + ACTION_EPSILON) {
          hoverAction.time = FRAME_1_TIME
          hoverAction.paused = true
          hoverAction.weight = 0
          inst.crossfade = 0
          if (inst.idleAction) inst.idleAction.weight = 1
        }
      }

      // Once a reverse playback has fully unwound back to the rest pose,
      // three.js auto-pauses it (LoopOnce + clampWhenFinished) — release its
      // weight so it stops contributing to shared channels entirely, rather
      // than sitting at weight 1 indefinitely.
      ;[inst.reelAction, inst.vhsPlayAction].forEach((action) => {
        if (action && action.timeScale < 0 && action.paused) {
          action.weight = 0
        }
      })
    })
  })

  return <group ref={groupRef} />
}

export { FRAME_100_TIME }
