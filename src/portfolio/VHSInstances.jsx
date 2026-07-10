import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// VHS INSTANCES
// ═══════════════════════════════════════════════════════════════════════════════
//
// Takes the "I_" empties extracted from InitialScene.glb and spawns one clone of
// VHSUnit.glb per empty, copying name / position / rotation exactly. Each clone
// gets its own dedicated primary/secondary tint (via mask-driven color blend on
// the shared "VHS" material) and its own AnimationMixer driving four action
// sets: VHS_Idle (rest pose), VHS_HoverClick (frame 1→30 hover, 30→100 click,
// eased) and Reel_Play / VHS_Play, which each play once — linearly, no easing —
// forward on hover-in and in reverse on hover-out, independently of the
// hover/click frame scrub.
//
// The resulting proxy meshes (one per instance, named exactly like their empty)
// are handed back to Portfolio so the existing MetaballCursor / focus-scroll /
// click-to-navigate pipeline can register them exactly like any other "I_" mesh.
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_VHS_MODEL_PATH = 'models/vhs/VHSUnit.glb'
const VHS_PRIMARY_MASK_PATH = 'models/vhs/masks/VHS_PrimaryMask.png'
const VHS_SECONDARY_MASK_PATH = 'models/vhs/masks/VHS_SecondaryMask.png'

const TINT_MATERIAL_NAME = 'VHS'
const REEL_SUPPORT_MATERIAL_NAME = 'ReelSupport'
const GLASS_MATERIAL_NAME = 'Glass'

// The exported alpha-blended materials (VHS, ReelSupport, Glass) all default
// to `depthWrite: false` once three.js marks them transparent — the standard
// behavior for blended materials, but wrong here: their opacity maps are
// mostly *opaque* with only small genuinely-translucent regions (a window
// cutout, a worn edge), so skipping depth writes made even the fully-opaque
// areas fail to occlude what's behind them — the "see-through" artifact.
// Fix: keep `depthWrite` on and use `alphaTest` to discard only the truly
// transparent texels. Above the threshold (including fully-opaque texels)
// the pixel still blends normally but *does* write depth, so it correctly
// hides geometry behind it regardless of draw order; below the threshold it
// never draws or writes depth at all, so whatever's behind shows through
// exactly where the map says it should.
const TRANSPARENCY_ALPHA_TEST = 0.04

function fixCutoutTransparency(material) {
  material.transparent = true
  material.depthWrite = true
  material.alphaTest = TRANSPARENCY_ALPHA_TEST
  material.needsUpdate = true
}

// Minimalistic stand-in for a full glass shader (the project's existing
// Glass.jsx is a much heavier, bespoke effect not meant for a small prop like
// this): a standard PBR material reusing the "VHS" material's own albedo /
// normal / roughness+metalness maps — VHSGlass sits directly over the same
// printed-label UVs — with the same alpha-tested, depth-writing transparency
// fix applied so it composites correctly against ReelSupport/Reel behind it.
function createVhsGlassMaterial(sourceVhsMaterial) {
  const material = new THREE.MeshStandardMaterial({
    map: sourceVhsMaterial.map ?? null,
    normalMap: sourceVhsMaterial.normalMap ?? null,
    roughnessMap: sourceVhsMaterial.roughnessMap ?? null,
    metalnessMap: sourceVhsMaterial.metalnessMap ?? null,
    roughness: sourceVhsMaterial.roughness ?? 0.3,
    metalness: sourceVhsMaterial.metalness ?? 0,
    side: THREE.DoubleSide,
  })
  fixCutoutTransparency(material)
  return material
}

const FPS = 30
const FRAME_1_TIME = 1 / FPS
const FRAME_30_TIME = 30 / FPS
const FRAME_100_TIME = 100 / FPS

// Hover-in/out (frame 1→30) plays as a fixed-duration eased tween rather than
// an exponential decay — the decay approach snapped almost all the way there
// in the first couple of frames ("hyper fast") and only crawled for the
// remaining fraction. A linear phase eased through easeInOutCubic gives a
// smooth start and a smooth finish instead.
const HOVER_TWEEN_DURATION_S = 0.5

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

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

// ─── DEDICATED COLOR PALETTE ─────────────────────────────────────────────────
// Primary = extremely dark shade of the hue, Secondary = bright shade of the
// (slightly offset) hue. One dedicated pair per VHS unit.

function buildVhsPalette(count) {
  const safeCount = Math.max(1, count)
  const palette = []
  for (let i = 0; i < safeCount; i += 1) {
    const hue = i / safeCount
    const primary = new THREE.Color().setHSL(hue, 0.55, 0.065)
    const secondary = new THREE.Color().setHSL((hue + 0.045) % 1, 0.78, 0.62)
    palette.push({ primary, secondary })
  }
  return palette
}

// ─── MASK TEXTURE LOADING (non-suspending, graceful when files are missing) ──

function makeBlankMaskTexture() {
  const tex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat)
  tex.needsUpdate = true
  return tex
}

function loadMaskTextureInto(uniformHolder, path) {
  const loader = new THREE.TextureLoader()
  loader.load(
    path,
    (tex) => {
      tex.colorSpace = THREE.NoColorSpace
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.needsUpdate = true
      uniformHolder.value = tex
    },
    undefined,
    () => {
      // Mask PNG not present yet — keep the blank fallback so the base color
      // texture renders untouched until the real file is dropped in at this path.
    },
  )
}

// ─── DUAL-MASK CONSTANT-COLOR TINT SHADER ────────────────────────────────────
// Injected into the standard/physical material's fragment shader right after
// the base color texture is sampled. Primary mask paints a dedicated dark
// constant color, secondary mask paints a dedicated bright constant color —
// both additive-over on top of the existing base color texture.

function applyDualMaskTint(material, { primaryMaskUniform, secondaryMaskUniform, primaryColor, secondaryColor }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uVhsPrimaryMask = primaryMaskUniform
    shader.uniforms.uVhsSecondaryMask = secondaryMaskUniform
    shader.uniforms.uVhsPrimaryColor = { value: primaryColor }
    shader.uniforms.uVhsSecondaryColor = { value: secondaryColor }

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      uniform sampler2D uVhsPrimaryMask;
      uniform sampler2D uVhsSecondaryMask;
      uniform vec3 uVhsPrimaryColor;
      uniform vec3 uVhsSecondaryColor;`,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      #ifdef USE_MAP
      {
        float vhsPrimaryMask = texture2D( uVhsPrimaryMask, vMapUv ).r;
        float vhsSecondaryMask = texture2D( uVhsSecondaryMask, vMapUv ).r;
        diffuseColor.rgb = mix( diffuseColor.rgb, uVhsPrimaryColor, vhsPrimaryMask );
        diffuseColor.rgb = mix( diffuseColor.rgb, uVhsSecondaryColor, vhsSecondaryMask );
      }
      #endif`,
    )
  }
  material.needsUpdate = true
}

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

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function VHSInstances({
  emptyTransforms,
  modelPath = DEFAULT_VHS_MODEL_PATH,
  scale = 1,
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

  const palette = useMemo(
    () => buildVhsPalette(emptyTransforms?.length ?? 0),
    [emptyTransforms?.length],
  )

  useEffect(() => {
    const container = groupRef.current
    if (!gltf?.scene || !emptyTransforms?.length || !container) return undefined

    let sourceVhsMaterial = null
    let sourceReelSupportMaterial = null
    let sourceGlassMaterial = null
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      if (!sourceVhsMaterial) {
        const found = mats.find((m) => m?.name === TINT_MATERIAL_NAME)
        if (found) sourceVhsMaterial = found
      }
      if (!sourceReelSupportMaterial) {
        const found = mats.find((m) => m?.name === REEL_SUPPORT_MATERIAL_NAME)
        if (found) sourceReelSupportMaterial = found
      }
      if (!sourceGlassMaterial) {
        const found = mats.find((m) => m?.name === GLASS_MATERIAL_NAME)
        if (found) sourceGlassMaterial = found
      }
    })

    // ReelSupport is shared by reference across every clone (plain
    // `.clone()` doesn't deep-clone materials), so fixing it once here
    // fixes it for all 11 units.
    if (sourceReelSupportMaterial) fixCutoutTransparency(sourceReelSupportMaterial)

    // The Glass replacement material is likewise shared across all
    // instances — it isn't per-instance tinted, so one compiled material/
    // program serves every unit's glass pane.
    const vhsGlassMaterial = sourceVhsMaterial ? createVhsGlassMaterial(sourceVhsMaterial) : null

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
      let shellMesh = null

      if (sourceVhsMaterial) {
        const tinted = sourceVhsMaterial.clone()
        applyDualMaskTint(tinted, {
          primaryMaskUniform: maskUniforms.primary,
          secondaryMaskUniform: maskUniforms.secondary,
          primaryColor: colors.primary,
          secondaryColor: colors.secondary,
        })
        // The "VHS" material (the main cassette shell + ReelHolder_L/R + one
        // Reel primitive) is meant to read as fully solid — its opacity map
        // has no genuinely translucent regions the way ReelSupport/Glass do.
        // Left at the default depthWrite:false for BLEND materials, it was
        // the single biggest source of the see-through artifact, since it's
        // the largest, most visible surface on the unit.
        fixCutoutTransparency(tinted)

        root.traverse((child) => {
          if (!child.isMesh) return
          if (Array.isArray(child.material)) {
            child.material = child.material.map((m) => {
              if (m === sourceVhsMaterial) return tinted
              if (vhsGlassMaterial && m === sourceGlassMaterial) return vhsGlassMaterial
              return m
            })
          } else if (child.material === sourceVhsMaterial) {
            child.material = tinted
          } else if (vhsGlassMaterial && child.material === sourceGlassMaterial) {
            child.material = vhsGlassMaterial
          }
          // userData.name survives clone() and keeps the *original* glTF node
          // name even if GLTFLoader had to de-duplicate `.name` (two nodes in
          // this rig are both authored "VHS" — a group and the cassette mesh).
          if (!shellMesh && child.userData?.name === TINT_MATERIAL_NAME) {
            shellMesh = child
          }
        })
      }

      if (!shellMesh) {
        root.traverse((child) => {
          if (!shellMesh && child.isMesh) shellMesh = child
        })
      }

      const proxyMesh = shellMesh ? createStaticHitProxy(root, shellMesh) : null
      if (proxyMesh) {
        root.add(proxyMesh)
        proxyMesh.name = transform.name
      } else if (shellMesh) {
        shellMesh.name = transform.name
      }

      const mixer = new THREE.AnimationMixer(root)
      const findClip = (name) => gltf.animations.find((c) => c.name === name)

      const idleAction = findClip('VHS_Idle') ? mixer.clipAction(findClip('VHS_Idle')) : null
      const hoverClickAction = findClip('VHS_HoverClick') ? mixer.clipAction(findClip('VHS_HoverClick')) : null
      const reelAction = findClip('Reel_Play') ? mixer.clipAction(findClip('Reel_Play')) : null
      const vhsPlayAction = findClip('VHS_Play') ? mixer.clipAction(findClip('VHS_Play')) : null

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
        hoverPhase: 0,
        crossfade: 0,
        clicked: false,
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
        if (!inst || inst.clicked || !inst.hoverClickAction) return
        inst.clicked = true
        inst.hoverClickAction.paused = false
        inst.hoverClickAction.timeScale = 1
        inst.hoverClickAction.time = FRAME_30_TIME
        inst.hoverClickAction.weight = 1
      },
    })

    return () => {
      instances.forEach((inst) => {
        inst.mixer.stopAllAction()
        container.remove(inst.root)
      })
      instancesRef.current = []
    }
  }, [gltf, emptyTransforms, palette, maskUniforms, scale, onInstancesReady, onControllerReady])

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
      const isHovered = inst.hoverEngaged

      if (inst.clicked) {
        // A click should read as instant — full hoverClick pose right away,
        // no fade-in wait.
        inst.crossfade = 1
      } else if (inst.hoverClickAction) {
        // The idle↔hoverClick blend weight is driven by the *same* eased
        // phase as the frame scrub below (not an independent, faster decay).
        // They used to run on separate clocks: the blend used to snap back
        // to idle in ~200ms while the frame position was still smoothly
        // easing back over 500ms, so the reverse motion was already blended
        // out — invisible — well before it finished. Tying them together
        // guarantees hover-in and hover-out look equally smooth, since the
        // visual blend and the frame position always arrive together.
        const phaseTarget = isHovered ? 1 : 0
        const phaseStep = delta / HOVER_TWEEN_DURATION_S
        if (inst.hoverPhase < phaseTarget) {
          inst.hoverPhase = Math.min(phaseTarget, inst.hoverPhase + phaseStep)
        } else if (inst.hoverPhase > phaseTarget) {
          inst.hoverPhase = Math.max(phaseTarget, inst.hoverPhase - phaseStep)
        }
        const easedProgress = easeInOutCubic(inst.hoverPhase)
        inst.crossfade = easedProgress
        inst.hoverClickAction.time = THREE.MathUtils.lerp(FRAME_1_TIME, FRAME_30_TIME, easedProgress)
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
          action.paused = false
        })
      } else if (!isHovered && inst.prevHoverEngaged) {
        ;[inst.reelAction, inst.vhsPlayAction].forEach((action) => {
          if (!action) return
          action.timeScale = -1
          action.paused = false
        })
      }
      inst.prevHoverEngaged = isHovered

      inst.mixer.update(delta)

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
