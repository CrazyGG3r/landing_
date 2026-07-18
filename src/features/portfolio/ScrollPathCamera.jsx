import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL PATH CAMERA
// ═══════════════════════════════════════════════════════════════════════════════
//
// Once the Entry_ intro animations finish, the camera hands off from the baked
// "Entry_Camera" clip to a mouse-wheel-driven dolly along the "ScrollPath" loose
// -edge mesh: scrolling down advances toward the path's end, scrolling up backs
// it toward the start, and the applied position/rotation are always eased
// (exponential smoothing, frame-rate independent) toward the current scroll
// target rather than snapped — no jump when tracking begins, no jitter as the
// user scrolls.
//
// A deliberately self-contained, minimal wheel accumulator is used here rather
// than drei's <ScrollControls> — that component overlays a real scrollable div
// on top of the canvas and redirects R3F's pointer-event target to it, which
// would silently stop ScreenSurface's native gl.domElement pointerdown/up
// listeners from ever firing. Since this page has nothing else to scroll, a
// plain `wheel` listener sidesteps that entirely with no DOM overlay and no
// event-system rewiring.
//
// The path is authored so its very first point lands exactly on Entry_Camera's
// final resting position/orientation — so starting scroll-progress at 0 is a
// seamless continuation, not a cut.
//
// FOV rides the same scroll progress: whatever FOV the camera has the instant
// tracking begins (Entry_Camera's baked value) is the fixed, never-overridden
// start-of-track default — it narrows down toward `minFov` as progress
// approaches 1 (camera zooms in the further along the track you scroll), and
// widens back to that exact original default as progress returns to 0.
//
// If given a `scrollStateRef`, this also writes the live eased progress
// (`.progress`) and the sign of the most recent wheel event (`.playDirection`:
// +1 for scroll-up, -1 for scroll-down) into it every frame/wheel-event — the
// one and only place scroll input is ever read from, so other components
// (e.g. EntrySceneVhsUnit's Play/Reel_Play actions) can react to scroll
// without attaching a second, competing wheel listener of their own.
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_CONFIG = {
  pathNodeName: 'ScrollPath',
  curveTension: 0.5,
  curveSampleMultiplier: 5,
  // How much real scrolling it takes to cross the whole path (0→1). Smaller =
  // less physical scroll effort required to reach the end.
  scrollSensitivity: 0.0028,
  // Frame-rate-independent smoothing rate applied to both position and look
  // rotation — higher settles faster, lower feels floatier.
  lerpSharpness: 6,
  // FOV (degrees) at the far end of the path (t=1) — the camera zooms in to
  // this minimum as scroll reaches its max. The start-of-track FOV is never
  // hardcoded here — it's the camera's original, untouched value, captured
  // live from whatever the baked "Entry_Camera" animation left it at the
  // instant tracking begins, and always eased back to exactly that value as
  // scroll returns to 0.
  minFov: 32,
}

function extractLoosePathPoints(pathObject) {
  const geometry = pathObject?.geometry
  if (!geometry?.attributes?.position) return []

  pathObject.updateWorldMatrix(true, false)
  const positions = geometry.attributes.position
  const indices = geometry.index?.array ?? null

  const points = []
  const pushPoint = (index) => {
    const point = new THREE.Vector3(
      positions.getX(index),
      positions.getY(index),
      positions.getZ(index),
    )
    pathObject.localToWorld(point)
    points.push(point)
  }

  if (indices && indices.length > 1) {
    // Loose-edge (LINES) geometry: index pairs [0,1, 1,2, 2,3, ...] describe a
    // connected chain — walking every other index (the "start" of each
    // segment) plus the final vertex reconstructs the ordered polyline without
    // duplicating the shared midpoints.
    for (let i = 0; i < indices.length; i += 2) {
      pushPoint(indices[i])
    }
    pushPoint(indices[indices.length - 1])
  } else {
    for (let i = 0; i < positions.count; i += 1) pushPoint(i)
  }

  return points
}

function buildSmoothCurve(points, tension, sampleMultiplier) {
  if (!points || points.length < 2) return null

  const unique = [points[0]]
  for (let i = 1; i < points.length; i += 1) {
    if (points[i].distanceTo(points[i - 1]) > 0.0001) unique.push(points[i])
  }
  if (unique.length < 2) return null

  // Two-pass build: a raw Catmull-Rom through the authored points, resampled
  // at even arc-length spacing, then rebuilt from those samples — so
  // getPointAt(t) moves at a constant rate along the path instead of
  // clustering near closely-spaced source vertices.
  const rawCurve = new THREE.CatmullRomCurve3(unique, false, 'catmullrom', tension)
  const spaced = rawCurve.getSpacedPoints(Math.max(200, unique.length * sampleMultiplier))
  return new THREE.CatmullRomCurve3(spaced, false, 'catmullrom', tension)
}

export default function ScrollPathCamera({
  sceneRoot,
  active,
  config,
  initialProgress = 0,
  scrollStateRef,
}) {
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...(config || {}) }), [config])
  const startProgress = THREE.MathUtils.clamp(Number(initialProgress) || 0, 0, 1)
  const { camera } = useThree()

  const progressRef = useRef(startProgress)
  const currentTRef = useRef(startProgress)
  const initializedRef = useRef(false)
  const defaultFovRef = useRef(null)

  const positionRef = useRef(new THREE.Vector3())
  const lookAheadRef = useRef(new THREE.Vector3())
  const tangentRef = useRef(new THREE.Vector3())
  const matrixRef = useRef(new THREE.Matrix4())
  const targetQuatRef = useRef(new THREE.Quaternion())
  const upRef = useRef(new THREE.Vector3(0, 1, 0))

  const curve = useMemo(() => {
    if (!sceneRoot) return null
    let pathObject = null
    sceneRoot.traverse((child) => {
      if (!pathObject && child.name === cfg.pathNodeName) pathObject = child
    })
    if (!pathObject) return null
    pathObject.visible = false

    const points = extractLoosePathPoints(pathObject)
    return buildSmoothCurve(points, cfg.curveTension, cfg.curveSampleMultiplier)
  }, [sceneRoot, cfg.pathNodeName, cfg.curveTension, cfg.curveSampleMultiplier])

  // Scroll only ever does anything once tracking is active — before that, no
  // listener is attached at all, so scrolling during the intro has zero effect.
  useEffect(() => {
    if (!active || !curve) return undefined

    if (!initializedRef.current) {
      initializedRef.current = true
      progressRef.current = startProgress
      currentTRef.current = startProgress
      // Captured once, right as tracking begins — whatever FOV the baked
      // "Entry_Camera" animation left the camera at becomes the fixed
      // start-of-track value scroll progress eases away from and back to.
      if (typeof camera.fov === 'number') defaultFovRef.current = camera.fov

      // Reload/direct entry starts at t=1 and must already be there when the
      // loading fade clears, so seed the complete camera pose synchronously
      // instead of easing across the path from the intro's final pose.
      const position = curve.getPointAt(startProgress, positionRef.current)
      const tangent = curve.getTangentAt(startProgress, tangentRef.current)
      camera.position.copy(position)
      if (tangent.lengthSq() > 1e-10) {
        lookAheadRef.current.copy(position).add(tangent)
        matrixRef.current.lookAt(position, lookAheadRef.current, upRef.current)
        targetQuatRef.current.setFromRotationMatrix(matrixRef.current)
        camera.quaternion.copy(targetQuatRef.current)
      }
      if (defaultFovRef.current !== null) {
        const narrowTarget = Math.min(defaultFovRef.current, cfg.minFov)
        camera.fov = THREE.MathUtils.lerp(defaultFovRef.current, narrowTarget, startProgress)
        camera.updateProjectionMatrix()
      }
      if (scrollStateRef) scrollStateRef.current.progress = startProgress
    }

    const handleWheel = (event) => {
      event.preventDefault()
      progressRef.current = THREE.MathUtils.clamp(
        progressRef.current + event.deltaY * cfg.scrollSensitivity,
        0,
        1,
      )
      // Scroll up (deltaY < 0) → +1, scroll down (deltaY > 0) → -1. Consumers
      // (e.g. EntrySceneVhsUnit's "Play" action) read this to decide forward
      // vs reverse; it's sticky (holds the last direction) until the next
      // wheel event flips it.
      if (scrollStateRef) {
        scrollStateRef.current.playDirection = event.deltaY > 0 ? -1 : 1
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [
    active,
    curve,
    startProgress,
    cfg.scrollSensitivity,
    cfg.minFov,
    camera,
    scrollStateRef,
  ])

  useFrame((_, rawDelta) => {
    if (!active || !curve) return

    const delta = Math.min(rawDelta, 0.1)
    const alpha = 1 - Math.exp(-cfg.lerpSharpness * delta)
    currentTRef.current = THREE.MathUtils.lerp(currentTRef.current, progressRef.current, alpha)
    const t = currentTRef.current

    if (scrollStateRef) scrollStateRef.current.progress = t

    const position = curve.getPointAt(t, positionRef.current)
    camera.position.lerp(position, alpha)

    // Gaze direction comes from the curve's own analytical tangent at t, not
    // from subtracting two nearby sampled points (a prior version sampled a
    // "look-ahead" point at t + lookAheadDistance/curveLength — as t eases
    // asymptotically toward 1 and lingers there, that gap shrinks toward
    // zero, and normalizing a near-zero-length eye→target vector becomes
    // dominated by floating-point noise: the camera would sit at max scroll
    // for a moment and then start tilting erratically). getTangentAt uses a
    // fixed small parameter-space epsilon internally, independent of where t
    // currently is, so it stays numerically stable everywhere on the curve,
    // including sitting exactly at either end.
    //
    // The tangent always points toward increasing t (the path's end) by
    // definition — never toward decreasing t — so the gaze direction only
    // ever faces "forward" along the path regardless of whether t is
    // currently increasing (scrolling down) or decreasing (scrolling up):
    // reversing never turns the camera around, it just retraces backward.
    const tangent = curve.getTangentAt(t, tangentRef.current)

    if (tangent.lengthSq() > 1e-10) {
      lookAheadRef.current.copy(position).add(tangent)
      matrixRef.current.lookAt(position, lookAheadRef.current, upRef.current)
      targetQuatRef.current.setFromRotationMatrix(matrixRef.current)
      camera.quaternion.slerp(targetQuatRef.current, alpha)
    }

    // FOV rides the same eased `t` as position/rotation: the camera's
    // original (untouched) FOV at the very start of the track, narrowing down
    // toward minFov as scroll approaches the end, and back to that exact
    // original default again when scrolled back to 0.
    //
    // The interpolation target is clamped to never exceed the original
    // default (Math.min below): a source glb's baked default FOV can end up
    // below the configured minFov after a re-export, and without this guard a
    // plain lerp would then make FOV widen with scroll instead of narrow —
    // the opposite of "lower down to a minimum." This keeps FOV direction
    // correct (only ever narrows, never widens past the original) regardless
    // of whatever the current default happens to be.
    if (defaultFovRef.current !== null) {
      const narrowTarget = Math.min(defaultFovRef.current, cfg.minFov)
      const targetFov = THREE.MathUtils.lerp(defaultFovRef.current, narrowTarget, t)
      if (Math.abs(camera.fov - targetFov) > 1e-4) {
        camera.fov = targetFov
        camera.updateProjectionMatrix()
      }
    }
  })

  return null
}
