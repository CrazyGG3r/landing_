import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { IframeDomTexture } from './vhs/iframeDomTexture'
import { createVHSMaterial } from './vhs/vhsShader'
import { DEFAULT_VHS_CONFIG } from './vhs/vhsEffects'

function clampVhsIntensity(value) {
  const number = Number(value)
  return Number.isFinite(number) ? THREE.MathUtils.clamp(number, 0, 1) : 1
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN SURFACE
// ═══════════════════════════════════════════════════════════════════════════════
//
// Owns the glTF "Screen" mesh and turns it into a live CRT display. It is written
// as a self-contained unit precisely because it is meant to become a standalone
// component later: swap `embedSrc` (or the whole texture source) and everything
// downstream — the permanent GLSL VHS chain, the ping-pong feedback, the pointer
// forwarding, the power-on gating — keeps working unchanged.
//
// Pipeline per frame:
//   iframe page ──raster──▶ CanvasTexture ─┐
//                                          ├─▶ VHS ShaderMaterial ─▶ writeFBO
//                    prev frame (readFBO) ─┘                            │
//   Screen mesh (unlit, map = writeFBO.texture) ◀──────────────────────┘
//
// The VHS pass runs in an off-screen ortho scene so it can ping-pong its own
// previous output (needed by the genuinely temporal effects: interlacing fields,
// generation loss). Pointer events are raycast here rather than relying on R3F
// event registration (the mesh lives inside a <primitive> glTF graph), then
// forwarded into the iframe so the hosted page stays fully interactive.
// ═══════════════════════════════════════════════════════════════════════════════

export default function ScreenSurface({
  screenNode,
  embedSrc,
  active = false,
  config = DEFAULT_VHS_CONFIG,
  resolution = 640,
  fps = 8,
  idleFps = 8,
  shaderFps = 8,
  interactionShaderFps = 8,
  ampScrollStateRef,
  transportStateRef,
  onControllerReady,
  // Overall post-composite mix, not Screen opacity: 0 = clean AMP, 1 = full VHS.
  vhsIntensity = 1,
  powerOnSpeed = 3.0,
}) {
  const { gl, camera, raycaster, pointer } = useThree()

  const domRef = useRef(null)
  const matRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const quadRef = useRef(null)
  const rtRef = useRef({ a: null, b: null, read: null, write: null })
  const displayMatRef = useRef(null)
  const originalMatRef = useRef(null)

  const activeRef = useRef(active)
  const vhsIntensityRef = useRef(clampVhsIntensity(vhsIntensity))
  const hoverRef = useRef({ hovering: false, u: 0.5, v: 0.5 })
  const timeRef = useRef(0)
  const parityRef = useRef(0)
  const onLevelRef = useRef(0)
  const hasRenderedRef = useRef(false)
  const lastVhsRenderAtRef = useRef(-Infinity)
  const lastPointerDispatchAtRef = useRef(-Infinity)
  const lastForwardedPointerRef = useRef({ u: NaN, v: NaN })

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const intensity = clampVhsIntensity(vhsIntensity)
    vhsIntensityRef.current = intensity
    if (matRef.current?.uniforms.uCompositionIntensity) {
      matRef.current.uniforms.uCompositionIntensity.value = intensity
    }
  }, [vhsIntensity])

  // ── one-time setup for a given Screen mesh + embed source ──
  useEffect(() => {
    if (!screenNode || !embedSrc) return undefined

    const domTexture = new IframeDomTexture({
      src: embedSrc,
      width: resolution,
      height: resolution,
      fps,
      idleFps,
      flipY: true,
    })
    domRef.current = domTexture

    const material = createVHSMaterial(config, { resolution: [resolution, resolution] })
    material.uniforms.uSource.value = domTexture.texture
    material.uniforms.uCompositionIntensity.value = vhsIntensityRef.current
    matRef.current = material

    // Off-screen full-screen-quad scene for the VHS pass.
    const offScene = new THREE.Scene()
    const offCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    quad.frustumCulled = false
    offScene.add(quad)
    sceneRef.current = offScene
    cameraRef.current = offCam
    quadRef.current = quad

    const rtOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    }
    const rtA = new THREE.WebGLRenderTarget(resolution, resolution, rtOpts)
    const rtB = new THREE.WebGLRenderTarget(resolution, resolution, rtOpts)
    // The glTF "Screen" plane's normal faces into the tube, so the camera sees
    // its back face and the picture reads mirrored. Flip U on the display
    // textures so text is the right way round (pointer U is mirrored to match).
    ;[rtA.texture, rtB.texture].forEach((tx) => {
      tx.colorSpace = THREE.SRGBColorSpace
      tx.wrapS = THREE.RepeatWrapping
      tx.repeat.x = -1
      tx.offset.x = 1
    })
    rtRef.current = { a: rtA, b: rtB, read: rtA, write: rtB }

    // Unlit display material on the Screen mesh; initialize with a map present so
    // switching the FBO texture each frame never triggers a shader recompile.
    // DoubleSide: the glTF "Screen" plane's normal faces into the tube (away
    // from the viewer), so a front-only material would be back-face culled and
    // the bezel behind would show through instead of the picture.
    const displayMat = new THREE.MeshBasicMaterial({ map: rtB.texture, side: THREE.DoubleSide })
    displayMat.toneMapped = false
    displayMatRef.current = displayMat
    originalMatRef.current = screenNode.material
    screenNode.material = displayMat
    hasRenderedRef.current = false
    lastVhsRenderAtRef.current = -Infinity
    const controller = {
      scrollToStart() {
        domTexture.scrollTo(0, 0)
      },
    }
    onControllerReady?.(controller)

    return () => {
      onControllerReady?.(null)
      if (originalMatRef.current) screenNode.material = originalMatRef.current
      domTexture.dispose()
      material.dispose()
      quad.geometry.dispose()
      rtA.dispose()
      rtB.dispose()
      displayMat.dispose()
      domRef.current = null
      matRef.current = null
      hasRenderedRef.current = false
      lastVhsRenderAtRef.current = -Infinity
    }
  }, [screenNode, embedSrc, resolution, fps, idleFps, config, onControllerReady])

  // ── pointer down/up + wheel forwarding (move is handled per-frame via raycast) ──
  useEffect(() => {
    const el = gl.domElement
    const forward = (kind) => () => {
      if (!activeRef.current) return
      const h = hoverRef.current
      if (!h.hovering) return
      domRef.current?.forwardPointer(kind, h.u, h.v, { buttons: kind === 'down' ? 1 : 0 })
    }
    const onDown = forward('down')
    const onUp = forward('up')

    // Wheel over the screen scrolls the hosted reader; anywhere else it falls
    // through to the scene's own wheel-driven camera (ScrollPathCamera's window
    // listener). gl.domElement is the wheel target, so this fires before that
    // bubble-phase listener — stopPropagation there hands scroll to the reader.
    const onWheel = (e) => {
      if (!activeRef.current || !hoverRef.current.hovering) return
      e.preventDefault()
      e.stopPropagation()
      const unit =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : e.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? resolution
            : 1
      if (ampScrollStateRef && e.deltaY !== 0) {
        ampScrollStateRef.current.playDirection = e.deltaY < 0 ? -1 : 1
        ampScrollStateRef.current.manualPlaybackUntil = performance.now() + 220
      }
      domRef.current?.forwardWheel(e.deltaX * unit, e.deltaY * unit)
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('wheel', onWheel)
    }
  }, [gl, resolution, ampScrollStateRef])

  useFrame((_, rawDelta) => {
    const dom = domRef.current
    const mat = matRef.current
    const rt = rtRef.current
    if (!dom || !mat || !rt.read) return

    const delta = Math.min(rawDelta, 0.1)
    timeRef.current += delta
    const nowMs = performance.now()

    if (ampScrollStateRef) {
      const metrics = dom.getScrollMetrics()
      ampScrollStateRef.current.progress = metrics.progress
      ampScrollStateRef.current.scrollTop = metrics.scrollTop
      ampScrollStateRef.current.scrollHeight = metrics.scrollHeight
      ampScrollStateRef.current.clientHeight = metrics.clientHeight
    }

    // The physical Play/Reverse transport runs independently of the scene's
    // camera path. Speeds are expressed in iframe viewports per second so the
    // five states feel consistent across responsive reader dimensions.
    const transport = transportStateRef?.current
    if (activeRef.current && transport?.direction) {
      const metrics = dom.getScrollMetrics()
      const viewportHeight = Math.max(1, metrics.clientHeight || resolution)
      const viewportRate = Math.max(0, Number(transport.viewportRate) || 0)
      const direction = transport.direction < 0 ? -1 : 1
      if (ampScrollStateRef) ampScrollStateRef.current.playDirection = direction
      dom.forwardWheel(0, direction * viewportHeight * viewportRate * delta)
    }

    // Power-on ramp (CRT warms up over ~1/powerOnSpeed s once activated).
    const target = activeRef.current ? 1 : 0
    onLevelRef.current += (target - onLevelRef.current) * Math.min(1, delta * powerOnSpeed)

    // Warm one frame before power-on, then keep the reader live whenever the
    // screen is powered. Visibility is deliberately not inferred from mesh
    // bounds here: the authored CRT plane can use unusual transforms/culling.
    const screenPowered = activeRef.current || onLevelRef.current > 0.001
    if (!dom.hasCompleteFrame || screenPowered) {
      dom.update(timeRef.current * 1000)
    }

    // Pointer: raycast the Screen mesh and forward hover position to the page.
    if (activeRef.current && screenNode) {
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObject(screenNode, false)[0]
      if (hit && hit.uv) {
        // Display U is mirrored (back-face view); mirror the forwarded U to match.
        const u = 1 - hit.uv.x
        const v = hit.uv.y
        const lastPointer = lastForwardedPointerRef.current
        const pointerMoved =
          !Number.isFinite(lastPointer.u) ||
          Math.abs(u - lastPointer.u) > 0.0005 ||
          Math.abs(v - lastPointer.v) > 0.0005
        const pointerIntervalMs = 1000 / Math.max(1, fps)
        const shouldForward =
          !hoverRef.current.hovering ||
          (pointerMoved && nowMs - lastPointerDispatchAtRef.current >= pointerIntervalMs)

        hoverRef.current.hovering = true
        hoverRef.current.u = u
        hoverRef.current.v = v

        if (shouldForward) {
          dom.forwardPointer('move', u, v)
          lastForwardedPointerRef.current = { u, v }
          lastPointerDispatchAtRef.current = nowMs
        }
      } else if (hoverRef.current.hovering) {
        // Pointer left the screen — clear hover in the page (resume auto-rotate etc.).
        hoverRef.current.hovering = false
        dom.forwardPointerLeave()
        lastForwardedPointerRef.current = { u: NaN, v: NaN }
      }
    } else if (hoverRef.current.hovering) {
      // Deactivated while hovering — same cleanup.
      hoverRef.current.hovering = false
      dom.forwardPointerLeave()
      lastForwardedPointerRef.current = { u: NaN, v: NaN }
    }

    // VHS pass → write FBO, ping-ponging the previous output as feedback.
    // Initialize the render targets once, then leave the expensive full-size
    // shader dormant while its output cannot contribute to the visible frame.
    if (!screenPowered && hasRenderedRef.current) return
    const currentShaderFps = Math.min(fps, shaderFps, interactionShaderFps)
    const shaderIntervalMs = 1000 / Math.max(1, currentShaderFps)
    if (hasRenderedRef.current && nowMs - lastVhsRenderAtRef.current < shaderIntervalMs) return
    lastVhsRenderAtRef.current = nowMs

    parityRef.current = parityRef.current > 0.5 ? 0 : 1
    mat.uniforms.uTime.value = timeRef.current
    mat.uniforms.uActive.value = onLevelRef.current
    mat.uniforms.uFrameParity.value = parityRef.current
    mat.uniforms.uFeedback.value = rt.read.texture

    const prevTarget = gl.getRenderTarget()
    gl.setRenderTarget(rt.write)
    gl.render(sceneRef.current, cameraRef.current)
    gl.setRenderTarget(prevTarget)
    hasRenderedRef.current = true

    // Show what we just wrote; swap read/write for next frame's feedback.
    if (displayMatRef.current) displayMatRef.current.map = rt.write.texture
    const nextRead = rt.write
    rt.write = rt.read
    rt.read = nextRead
  })

  return null
}
