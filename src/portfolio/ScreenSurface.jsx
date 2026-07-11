import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { IframeDomTexture } from './vhs/iframeDomTexture'
import { createVHSMaterial } from './vhs/vhsShader'
import { DEFAULT_VHS_CONFIG } from './vhs/vhsEffects'

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
  resolution = 768,
  fps = 12,
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
  const hoverRef = useRef({ hovering: false, u: 0.5, v: 0.5 })
  const timeRef = useRef(0)
  const parityRef = useRef(0)
  const onLevelRef = useRef(0)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  // ── one-time setup for a given Screen mesh + embed source ──
  useEffect(() => {
    if (!screenNode || !embedSrc) return undefined

    const domTexture = new IframeDomTexture({
      src: embedSrc,
      width: resolution,
      height: resolution,
      fps,
      flipY: true,
    })
    domRef.current = domTexture

    const material = createVHSMaterial(config, { resolution: [resolution, resolution] })
    material.uniforms.uSource.value = domTexture.texture
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

    return () => {
      if (originalMatRef.current) screenNode.material = originalMatRef.current
      domTexture.dispose()
      material.dispose()
      quad.geometry.dispose()
      rtA.dispose()
      rtB.dispose()
      displayMat.dispose()
      domRef.current = null
      matRef.current = null
    }
  }, [screenNode, embedSrc, resolution, fps, config])

  // ── pointer down/up forwarding (move is handled per-frame via raycast) ──
  useEffect(() => {
    const el = gl.domElement
    const forward = (type) => () => {
      if (!activeRef.current) return
      const h = hoverRef.current
      if (!h.hovering) return
      domRef.current?.forwardPointer(type, h.u, h.v, { buttons: type === 'mousedown' ? 1 : 0 })
    }
    const onDown = forward('mousedown')
    const onUp = forward('mouseup')
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [gl])

  useFrame((_, rawDelta) => {
    const dom = domRef.current
    const mat = matRef.current
    const rt = rtRef.current
    if (!dom || !mat || !rt.read) return

    const delta = Math.min(rawDelta, 0.1)
    timeRef.current += delta

    // Power-on ramp (CRT warms up over ~1/powerOnSpeed s once activated).
    const target = activeRef.current ? 1 : 0
    onLevelRef.current += (target - onLevelRef.current) * Math.min(1, delta * powerOnSpeed)

    // Refresh the page raster (self-throttled to fps).
    dom.update()

    // Pointer: raycast the Screen mesh and forward hover position to the page.
    if (activeRef.current && screenNode) {
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObject(screenNode, false)[0]
      if (hit && hit.uv) {
        // Display U is mirrored (back-face view); mirror the forwarded U to match.
        const u = 1 - hit.uv.x
        hoverRef.current = { hovering: true, u, v: hit.uv.y }
        dom.forwardPointer('mousemove', u, hit.uv.y)
      } else {
        hoverRef.current.hovering = false
      }
    }

    // VHS pass → write FBO, ping-ponging the previous output as feedback.
    parityRef.current = parityRef.current > 0.5 ? 0 : 1
    mat.uniforms.uTime.value = timeRef.current
    mat.uniforms.uActive.value = onLevelRef.current
    mat.uniforms.uFrameParity.value = parityRef.current
    mat.uniforms.uFeedback.value = rt.read.texture

    const prevTarget = gl.getRenderTarget()
    gl.setRenderTarget(rt.write)
    gl.render(sceneRef.current, cameraRef.current)
    gl.setRenderTarget(prevTarget)

    // Show what we just wrote; swap read/write for next frame's feedback.
    if (displayMatRef.current) displayMatRef.current.map = rt.write.texture
    const nextRead = rt.write
    rt.write = rt.read
    rt.read = nextRead
  })

  return null
}
