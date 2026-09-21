import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const VISUAL_DWELL_MS = 500
const MISS_GRACE_MS = 140
const REENTRY_COOLDOWN_MS = 1000
const HOVER_REGISTER_DELAY_MS = 500
const ACTIVE_RESPONSE = 13
const VISUAL_ENTER_RESPONSE = 10
const VISUAL_EXIT_RESPONSE = 15
const POINTER_RESPONSE = 22
const PROJECT_RESPONSE = 20

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function createHoverState() {
  let activeId = 0
  let visualActiveId = 0
  let visualPendingId = 0
  let alpha = 0
  let anchor = 0
  let activeTarget = 0
  let visualTarget = 0
  let visualEpoch = 0
  let present = false
  let pressed = false
  let pointerX = -100
  let pointerY = -100
  let velocityX = 0
  let velocityY = 0
  let rawVelocityX = 0
  let rawVelocityY = 0
  let previousX = -100
  let previousY = -100
  let previousMoveAt = 0
  let dwellStartedAt = 0
  let dwellProgress = 0
  let dwellTimer = null

  const cancelDwell = () => {
    if (dwellTimer) clearTimeout(dwellTimer)
    dwellTimer = null
    visualPendingId = 0
  }

  const beginVisualDwell = (id) => {
    cancelDwell()
    visualPendingId = id
    dwellStartedAt = performance.now()
    dwellProgress = 0
    dwellTimer = setTimeout(() => {
      dwellTimer = null
      if (activeId !== id) return
      visualPendingId = 0
      visualActiveId = id
      visualTarget = 1
      dwellProgress = 1
      visualEpoch += 1
    }, VISUAL_DWELL_MS)
  }

  const dismissVisual = () => {
    cancelDwell()
    visualTarget = 0
    dwellProgress = 0
  }

  return {
    get activeId() { return activeId },
    get visualActiveId() { return visualActiveId },
    get visualEngaged() { return visualTarget > 0.5 },
    get visualEpoch() { return visualEpoch },
    get dwellProgress() { return dwellProgress },
    get alpha() { return alpha },
    get anchor() { return anchor },
    get present() { return present },
    get pressed() { return pressed },
    get pointerX() { return pointerX },
    get pointerY() { return pointerY },
    get velocityX() { return velocityX },
    get velocityY() { return velocityY },

    moveTo(x, y, now = performance.now()) {
      const elapsed = previousMoveAt > 0 ? Math.max(8, now - previousMoveAt) : 16
      if (present) {
        rawVelocityX = ((x - previousX) / elapsed) * 16
        rawVelocityY = ((y - previousY) / elapsed) * 16
      }
      previousX = x
      previousY = y
      previousMoveAt = now
      pointerX = x
      pointerY = y
      present = true
    },

    setPressed(nextPressed) {
      pressed = nextPressed
    },

    setHoveredId(nextId) {
      if (nextId === activeId) return
      activeId = nextId
      activeTarget = nextId > 0 ? 1 : 0
      dismissVisual()
      if (nextId > 0) beginVisualDwell(nextId)
    },

    forceLeave() {
      activeId = 0
      activeTarget = 0
      present = false
      pressed = false
      dismissVisual()
    },

    fadeOut() {
      activeId = 0
      activeTarget = 0
      present = false
      dismissVisual()
    },

    commitDismiss() {
      activeId = 0
      activeTarget = 0
      pressed = true
      dismissVisual()
      visualEpoch += 1
    },

    update(delta, now = performance.now()) {
      alpha = THREE.MathUtils.damp(alpha, activeTarget, ACTIVE_RESPONSE, delta)
      const response = visualTarget > anchor
        ? VISUAL_ENTER_RESPONSE
        : VISUAL_EXIT_RESPONSE
      anchor = THREE.MathUtils.damp(anchor, visualTarget, response, delta)
      velocityX = THREE.MathUtils.damp(velocityX, rawVelocityX, POINTER_RESPONSE, delta)
      velocityY = THREE.MathUtils.damp(velocityY, rawVelocityY, POINTER_RESPONSE, delta)
      rawVelocityX = THREE.MathUtils.damp(rawVelocityX, 0, 9, delta)
      rawVelocityY = THREE.MathUtils.damp(rawVelocityY, 0, 9, delta)

      if (visualPendingId > 0) {
        dwellProgress = clamp((now - dwellStartedAt) / VISUAL_DWELL_MS, 0, 1)
      }
      if (alpha < 0.0005 && activeTarget === 0) alpha = 0
      if (anchor < 0.0005 && visualTarget === 0) {
        anchor = 0
        visualActiveId = 0
      }
    },

    dispose() {
      cancelDwell()
    },
  }
}

const localCorner = new THREE.Vector3()
const projectedCorner = new THREE.Vector3()

function convexHull(points) {
  if (points.length < 3) return points
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  const cross = (origin, a, b) => (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x)
  const lower = []
  sorted.forEach((point) => {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) lower.pop()
    lower.push(point)
  })
  const upper = []
  for (let index = sorted.length - 1; index >= 0; index -= 1) {
    const point = sorted[index]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) upper.pop()
    upper.push(point)
  }
  lower.pop()
  upper.pop()
  return lower.concat(upper)
}

function projectVisibleBounds(object, camera, width, height, target) {
  const root = object.renderRoot ?? object.mesh
  if (!root) return false

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let pointCount = 0
  const screenPoints = []
  const screenRegions = []

  root.updateWorldMatrix(true, true)
  root.traverse((child) => {
    if (
      !child.isMesh
      || child.visible === false
      || !child.geometry
      || child.userData?.portfolioWhiteMask
      || child.userData?.portfolioExposure
    ) return
    if (!child.geometry.boundingBox) child.geometry.computeBoundingBox()
    const box = child.geometry.boundingBox
    if (!box) return

    const regionPoints = []
    const position = child.geometry.attributes?.position
    if (position?.count) {
      const stride = Math.max(1, Math.ceil(position.count / 480))
      for (let index = 0; index < position.count; index += stride) {
        localCorner.fromBufferAttribute(position, index)
        projectedCorner.copy(localCorner).applyMatrix4(child.matrixWorld).project(camera)
        if (projectedCorner.z < -1.2 || projectedCorner.z > 1.2) continue
        const screenX = (projectedCorner.x * 0.5 + 0.5) * width
        const screenY = (-projectedCorner.y * 0.5 + 0.5) * height
        const point = { x: screenX, y: screenY }
        regionPoints.push(point)
        screenPoints.push(point)
        minX = Math.min(minX, screenX)
        minY = Math.min(minY, screenY)
        maxX = Math.max(maxX, screenX)
        maxY = Math.max(maxY, screenY)
        pointCount += 1
      }
    }

    // Bounding-box corners are only a fallback. For rotated/slanted meshes
    // they can sit well outside the real geometry and visibly leak the mask.
    if (!position?.count) {
      for (let xi = 0; xi < 2; xi += 1) {
        for (let yi = 0; yi < 2; yi += 1) {
          for (let zi = 0; zi < 2; zi += 1) {
            localCorner.set(
              xi ? box.max.x : box.min.x,
              yi ? box.max.y : box.min.y,
              zi ? box.max.z : box.min.z,
            )
            projectedCorner.copy(localCorner).applyMatrix4(child.matrixWorld).project(camera)
            if (projectedCorner.z < -1.2 || projectedCorner.z > 1.2) continue

            const screenX = (projectedCorner.x * 0.5 + 0.5) * width
            const screenY = (-projectedCorner.y * 0.5 + 0.5) * height
            const point = { x: screenX, y: screenY }
            screenPoints.push(point)
            regionPoints.push(point)
            minX = Math.min(minX, screenX)
            minY = Math.min(minY, screenY)
            maxX = Math.max(maxX, screenX)
            maxY = Math.max(maxY, screenY)
            pointCount += 1
          }
        }
      }
    }
    const region = convexHull(regionPoints)
    if (region.length >= 3) screenRegions.push(region)
  })

  if (pointCount === 0) return false

  const projectedWidth = Math.max(1, maxX - minX)
  const projectedHeight = Math.max(1, maxY - minY)
  target.cx = (minX + maxX) * 0.5
  target.cy = (minY + maxY) * 0.5
  target.w = projectedWidth
  target.h = projectedHeight
  target.r = Math.hypot(projectedWidth, projectedHeight) * 0.5
  target.polygon = convexHull(screenPoints)
  target.regions = screenRegions
  return true
}

export function CinematicHoverController({
  objects,
  eventTarget,
  disabled = false,
  holdActiveIdRef,
  onStateReady,
}) {
  const { gl, camera } = useThree()
  const [cursorState] = useState(createHoverState)
  const pointerNdcRef = useRef(new THREE.Vector2(2, 2))
  const raycasterRef = useRef(new THREE.Raycaster())
  const missStartedAtRef = useRef(null)
  const reentryCooldownsRef = useRef(new Map())
  const hoverCandidateRef = useRef({ id: 0, startedAt: 0 })
  const pointerInsideRef = useRef(false)
  const smoothProj = useMemo(
    () => objects.map(() => ({ cx: 0, cy: 0, r: 0, w: 0, h: 0, init: false })),
    [objects],
  )
  const rawProjectionRef = useRef({ cx: 0, cy: 0, r: 0, w: 0, h: 0 })
  const lastProjRef = useRef({ cx: 0, cy: 0, r: 0, w: 0, h: 0, id: 0 })

  const pipeline = useMemo(() => ({
    smoothProj,
    domElement: gl.domElement,
    get pixelRatio() {
      return gl.getPixelRatio()
    },
    get lastProj() {
      return lastProjRef.current
    },
    getCommitPoint() {
      const projection = lastProjRef.current
      const dpr = gl.getPixelRatio()
      if (!projection.id || projection.r <= 0 || !dpr) return null
      const rect = gl.domElement.getBoundingClientRect()
      return {
        x: rect.left + projection.cx / dpr,
        y: rect.top + projection.cy / dpr,
      }
    },
  }), [gl, smoothProj])

  useEffect(() => {
    onStateReady?.({ cs: cursorState, pipeline })
    return () => cursorState.dispose()
  }, [cursorState, onStateReady, pipeline])

  useEffect(() => {
    if (disabled) {
      pointerInsideRef.current = false
      cursorState.fadeOut()
      return undefined
    }

    const element = eventTarget?.current ?? gl.domElement
    if (!element) return undefined

    const handleMove = (event) => {
      const rect = gl.domElement.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      cursorState.moveTo(x, y)
      pointerNdcRef.current.set(
        (x / Math.max(1, rect.width)) * 2 - 1,
        -(y / Math.max(1, rect.height)) * 2 + 1,
      )
      pointerInsideRef.current = true
    }
    const handleEnter = (event) => handleMove(event)
    const handleLeave = () => {
      const heldId = holdActiveIdRef?.current ?? 0
      if (heldId > 0) {
        cursorState.setHoveredId(heldId)
        return
      }
      if (cursorState.activeId > 0) {
        reentryCooldownsRef.current.set(
          cursorState.activeId,
          performance.now() + REENTRY_COOLDOWN_MS,
        )
      }
      pointerInsideRef.current = false
      missStartedAtRef.current = null
      hoverCandidateRef.current = { id: 0, startedAt: 0 }
      pointerNdcRef.current.set(2, 2)
      cursorState.forceLeave()
    }
    const handleDown = () => cursorState.setPressed(true)
    const handleUp = () => cursorState.setPressed(false)

    element.addEventListener('pointermove', handleMove, { passive: true })
    element.addEventListener('pointerenter', handleEnter, { passive: true })
    element.addEventListener('pointerleave', handleLeave, { passive: true })
    element.addEventListener('pointerdown', handleDown, { passive: true })
    window.addEventListener('pointerup', handleUp, { passive: true })

    return () => {
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerenter', handleEnter)
      element.removeEventListener('pointerleave', handleLeave)
      element.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [cursorState, disabled, eventTarget, gl, holdActiveIdRef])

  useFrame((_, delta) => {
    const now = performance.now()
    cursorState.update(Math.min(delta, 0.05), now)
    if (disabled || !objects.length) return

    let hitId = 0
    const heldId = holdActiveIdRef?.current ?? 0
    if (heldId > 0 && objects[heldId - 1]) {
      hitId = heldId
    } else if (pointerInsideRef.current) {
      const raycaster = raycasterRef.current
      raycaster.setFromCamera(pointerNdcRef.current, camera)
      let nearestDistance = Infinity

      objects.forEach((object, index) => {
        const objectId = index + 1
        const cooldownUntil = reentryCooldownsRef.current.get(objectId) ?? 0
        if (cooldownUntil > now) return
        if (cooldownUntil > 0) reentryCooldownsRef.current.delete(objectId)

        const hitMesh = object.mesh
        if (!hitMesh?.geometry) return
        hitMesh.updateWorldMatrix(true, false)
        const hit = raycaster.intersectObject(hitMesh, false)[0]
        if (hit && hit.distance < nearestDistance) {
          nearestDistance = hit.distance
          hitId = objectId
        }
      })
    }

    let nextActiveId = 0
    if (heldId > 0 && hitId === heldId) {
      // An already-engaged overlay handoff must remain seamless.
      nextActiveId = heldId
      hoverCandidateRef.current = { id: 0, startedAt: 0 }
    } else if (hitId > 0 && hitId === cursorState.activeId) {
      nextActiveId = hitId
      hoverCandidateRef.current = { id: 0, startedAt: 0 }
    } else if (hitId > 0) {
      const candidate = hoverCandidateRef.current
      if (candidate.id !== hitId) {
        hoverCandidateRef.current = { id: hitId, startedAt: now }
      } else if (now - candidate.startedAt >= HOVER_REGISTER_DELAY_MS) {
        nextActiveId = hitId
        hoverCandidateRef.current = { id: 0, startedAt: 0 }
      }
    } else {
      hoverCandidateRef.current = { id: 0, startedAt: 0 }
    }

    if (nextActiveId > 0) {
      missStartedAtRef.current = null
      if (cursorState.activeId > 0 && cursorState.activeId !== nextActiveId) {
        reentryCooldownsRef.current.set(
          cursorState.activeId,
          now + REENTRY_COOLDOWN_MS,
        )
      }
      cursorState.setHoveredId(nextActiveId)
    } else if (cursorState.activeId > 0) {
      if (missStartedAtRef.current == null) missStartedAtRef.current = now
      if (now - missStartedAtRef.current >= MISS_GRACE_MS) {
        reentryCooldownsRef.current.set(
          cursorState.activeId,
          now + REENTRY_COOLDOWN_MS,
        )
        cursorState.setHoveredId(0)
        missStartedAtRef.current = null
      }
    }

    const projectedId = cursorState.activeId || cursorState.visualActiveId
    const projectedIndex = projectedId - 1
    if (projectedIndex < 0 || !objects[projectedIndex]) return

    const raw = rawProjectionRef.current
    if (!projectVisibleBounds(
      objects[projectedIndex],
      camera,
      gl.domElement.width,
      gl.domElement.height,
      raw,
    )) return

    const smooth = smoothProj[projectedIndex]
    if (!smooth.init) {
      Object.assign(smooth, raw, { init: true })
    } else {
      const response = 1 - Math.exp(-PROJECT_RESPONSE * Math.min(delta, 0.05))
      smooth.cx += (raw.cx - smooth.cx) * response
      smooth.cy += (raw.cy - smooth.cy) * response
      smooth.r += (raw.r - smooth.r) * response
      smooth.w += (raw.w - smooth.w) * response
      smooth.h += (raw.h - smooth.h) * response
    }
    smooth.polygon = raw.polygon
    smooth.regions = raw.regions

    lastProjRef.current = { ...smooth, id: projectedId }
  })

  return null
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const rearFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uProgress;
  uniform float uTime;
  uniform float uVariant;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    // Keep the complete radial composition inside the plane. The outer spoke
    // radius reaches 0.72, so this inset prevents shader-boundary cutouts.
    vec2 p = (uv - 0.5) * 1.58;
    p.x *= 1.12;
    float angle = atan(p.y, p.x);
    float radius = length(p);
    float teeth = sin(angle * (13.0 + uVariant * 4.0)) * 0.042;
    teeth += sin(angle * 29.0 + uVariant * 9.0) * 0.018;
    teeth += (hash(vec2(floor(angle * 19.0), uVariant)) - 0.5) * 0.045;
    float burstRadius = 0.37 + teeth;
    float paperBurst = 1.0 - smoothstep(burstRadius - 0.012, burstRadius + 0.006, radius);
    float inkOutline = smoothstep(burstRadius - 0.026, burstRadius - 0.011, radius) *
      (1.0 - smoothstep(burstRadius + 0.006, burstRadius + 0.022, radius));

    float spokePhase = fract((angle / 6.2831853 + 0.5) * 22.0 + uVariant * 0.23);
    float spoke = 1.0 - smoothstep(0.035, 0.12, abs(spokePhase - 0.5));
    float spokeRange = smoothstep(0.28, 0.39, radius) * (1.0 - smoothstep(0.57, 0.72, radius));
    float speedBurst = spoke * spokeRange;

    vec2 dotGrid = fract((uv + vec2(uVariant * 0.03, 0.0)) * vec2(58.0, 34.0)) - 0.5;
    float halftone = 1.0 - smoothstep(0.12, 0.24, length(dotGrid));
    halftone *= paperBurst * smoothstep(0.2, 0.54, radius);

    float revealEdge = uProgress * 1.55 - 0.2;
    float reveal = 1.0 - smoothstep(revealEdge, revealEdge + 0.1, uv.x - uv.y * 0.18);
    vec3 paper = vec3(0.945, 0.925, 0.84);
    vec3 ink = vec3(0.012, 0.015, 0.014);
    vec3 color = paper;
    color = mix(color, ink, halftone * 0.28);
    color = mix(color, ink, inkOutline);
    color = mix(color, uAccent, speedBurst * 0.94);
    color += (hash(gl_FragCoord.xy + floor(uTime * 16.0)) - 0.5) * 0.055;

    float alpha = max(max(paperBurst, inkOutline), speedBurst) * reveal * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

const frontFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uProgress;
  uniform float uTime;

  float hash(vec2 p) {
    p = fract(p * vec2(443.21, 97.53));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    float slashA = 1.0 - smoothstep(0.0, 0.012, abs(uv.y - (0.16 + uv.x * 0.23)));
    float slashB = 1.0 - smoothstep(0.0, 0.008, abs(uv.y - (0.77 - uv.x * 0.19)));
    float slashC = 1.0 - smoothstep(0.0, 0.006, abs(uv.y - (0.46 + uv.x * 0.08)));
    float clipA = step(0.02, uv.x) * step(uv.x, 0.54);
    float clipB = step(0.58, uv.x) * step(uv.x, 0.98);
    float clipC = step(0.12, uv.x) * step(uv.x, 0.9);
    float accentSlash = slashA * clipA;
    float paperSlash = slashB * clipB;
    float inkSlash = slashC * clipC;
    float reveal = smoothstep(0.0, 0.82, uProgress);
    vec3 paper = vec3(0.95, 0.945, 0.895);
    vec3 ink = vec3(0.016, 0.019, 0.018);
    vec3 color = mix(ink, uAccent, accentSlash);
    color = mix(color, paper, paperSlash);
    color += (hash(gl_FragCoord.xy + floor(uTime * 14.0)) - 0.5) * 0.032;
    float alpha = max(accentSlash, max(paperSlash, inkSlash)) * reveal * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

function createGraphicMaterial(fragmentShader) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uAccent: { value: new THREE.Color('#d84b49') },
      uOpacity: { value: 0 },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uVariant: { value: 0 },
    },
    transparent: true,
    depthTest: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  })
}

const boxCorners = Array.from({ length: 8 }, () => new THREE.Vector3())

function getDepthRange(box, cameraPosition, viewDirection) {
  const { min, max } = box
  let minDepth = Infinity
  let maxDepth = -Infinity

  for (let index = 0; index < 8; index += 1) {
    const corner = boxCorners[index].set(
      index & 1 ? max.x : min.x,
      index & 2 ? max.y : min.y,
      index & 4 ? max.z : min.z,
    )
    const depth = corner.sub(cameraPosition).dot(viewDirection)
    minDepth = Math.min(minDepth, depth)
    maxDepth = Math.max(maxDepth, depth)
  }

  return { minDepth, maxDepth }
}

export function CinematicDepthSandwich({ objects, stateRef }) {
  const rearRef = useRef(null)
  const frontRef = useRef(null)
  const rearMaterial = useMemo(() => createGraphicMaterial(rearFragmentShader), [])
  const frontMaterial = useMemo(() => createGraphicMaterial(frontFragmentShader), [])
  const currentObjectRef = useRef(null)
  const boxRef = useRef(new THREE.Box3())
  const centerRef = useRef(new THREE.Vector3())
  const viewDirectionRef = useRef(new THREE.Vector3())
  const overlayDirectionRef = useRef(new THREE.Vector3())
  const rearPositionRef = useRef(new THREE.Vector3())
  const frontPositionRef = useRef(new THREE.Vector3())
  const currentScaleRef = useRef(new THREE.Vector2(480, 320))
  const { camera, gl, size } = useThree()

  useEffect(() => () => {
    rearMaterial.dispose()
    frontMaterial.dispose()
  }, [frontMaterial, rearMaterial])

  useFrame(({ clock }, delta) => {
    const cs = stateRef.current?.cs
    const pipeline = stateRef.current?.pipeline
    const rear = rearRef.current
    const front = frontRef.current
    if (!cs || !pipeline || !rear || !front) return

    const visualIndex = cs.visualActiveId - 1
    if (visualIndex >= 0 && objects[visualIndex]) {
      currentObjectRef.current = objects[visualIndex]
    }

    const activeObject = currentObjectRef.current
    const opacity = clamp(cs.anchor, 0, 1)
    if (!activeObject?.renderRoot || opacity < 0.002) {
      rear.visible = false
      front.visible = false
      return
    }

    const projection = pipeline.smoothProj?.[objects.indexOf(activeObject)]
    if (!projection?.init) return

    activeObject.renderRoot.updateWorldMatrix(true, true)
    boxRef.current.setFromObject(activeObject.renderRoot)
    if (boxRef.current.isEmpty()) return
    boxRef.current.getCenter(centerRef.current)
    camera.getWorldDirection(viewDirectionRef.current)
    const { minDepth, maxDepth } = getDepthRange(
      boxRef.current,
      camera.position,
      viewDirectionRef.current,
    )
    if (!Number.isFinite(minDepth) || minDepth <= 0) return

    const dpr = gl.getPixelRatio() || 1
    const projectedWidth = projection.w / dpr
    const projectedHeight = projection.h / dpr
    const safeMargin = clamp(Math.min(size.width, size.height) * 0.035, 18, 46)
    // The burst stays exactly on the VHS center. Its size—not its anchor—is
    // reduced near an edge so the complete radial graphic remains visible.
    const overlayCenterX = clamp(projection.cx / dpr, safeMargin, size.width - safeMargin)
    const overlayCenterY = clamp(projection.cy / dpr, safeMargin, size.height - safeMargin)
    const maxWidth = Math.max(
      1,
      Math.min(overlayCenterX - safeMargin, size.width - safeMargin - overlayCenterX) * 2,
    )
    const maxHeight = Math.max(
      1,
      Math.min(overlayCenterY - safeMargin, size.height - safeMargin - overlayCenterY) * 2,
    )
    const targetWidth = clamp(
      Math.max(size.width * 0.56, projectedWidth * 1.9),
      Math.min(280, maxWidth),
      maxWidth,
    )
    const targetHeight = clamp(
      Math.max(size.height * 0.5, projectedHeight * 1.78),
      Math.min(220, maxHeight),
      maxHeight,
    )
    const scaleResponse = 1 - Math.exp(-11 * Math.min(delta, 0.05))
    currentScaleRef.current.x += (targetWidth - currentScaleRef.current.x) * scaleResponse
    currentScaleRef.current.y += (targetHeight - currentScaleRef.current.y) * scaleResponse
    currentScaleRef.current.x = Math.min(currentScaleRef.current.x, maxWidth)
    currentScaleRef.current.y = Math.min(currentScaleRef.current.y, maxHeight)

    overlayDirectionRef.current
      .set(
        (overlayCenterX / Math.max(1, size.width)) * 2 - 1,
        -(overlayCenterY / Math.max(1, size.height)) * 2 + 1,
        0.5,
      )
      .unproject(camera)
      .sub(camera.position)
      .normalize()

    const depthPadding = Math.max(0.025, (maxDepth - minDepth) * 0.04)
    const rearDepth = maxDepth + depthPadding
    const frontDepth = Math.max(0.02, minDepth - depthPadding)
    const rayForwardAmount = Math.max(
      0.001,
      overlayDirectionRef.current.dot(viewDirectionRef.current),
    )
    rearPositionRef.current
      .copy(camera.position)
      .addScaledVector(overlayDirectionRef.current, rearDepth / rayForwardAmount)
    frontPositionRef.current
      .copy(camera.position)
      .addScaledVector(overlayDirectionRef.current, frontDepth / rayForwardAmount)

    rear.position.copy(rearPositionRef.current)
    front.position.copy(frontPositionRef.current)
    rear.quaternion.copy(camera.quaternion)
    front.quaternion.copy(camera.quaternion)

    const eased = 1 - Math.pow(1 - opacity, 3)
    const settle = 0.965 + eased * 0.035
    const viewportHeightAt = (depth) => camera.isPerspectiveCamera
      ? 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * depth / camera.zoom
      : Math.abs(camera.top - camera.bottom) / camera.zoom
    const rearViewportHeight = viewportHeightAt(rearDepth)
    const frontViewportHeight = viewportHeightAt(frontDepth)
    const rearViewportWidth = rearViewportHeight * camera.aspect
    const frontViewportWidth = frontViewportHeight * camera.aspect
    rear.scale.set(
      (currentScaleRef.current.x / Math.max(1, size.width)) * rearViewportWidth * settle,
      (currentScaleRef.current.y / Math.max(1, size.height)) * rearViewportHeight * settle,
      1,
    )
    front.scale.set(
      (currentScaleRef.current.x / Math.max(1, size.width)) * frontViewportWidth * (0.98 + eased * 0.02),
      (currentScaleRef.current.y / Math.max(1, size.height)) * frontViewportHeight * (0.98 + eased * 0.02),
      1,
    )
    front.translateY(front.scale.y * (1 - eased) * -0.045)

    const accent = activeObject.accentColor
    rearMaterial.uniforms.uAccent.value.lerp(accent, 1 - Math.exp(-14 * delta))
    frontMaterial.uniforms.uAccent.value.lerp(accent, 1 - Math.exp(-14 * delta))
    rearMaterial.uniforms.uOpacity.value = opacity * 0.96
    frontMaterial.uniforms.uOpacity.value = opacity * 0.98
    rearMaterial.uniforms.uProgress.value = eased
    frontMaterial.uniforms.uProgress.value = eased
    rearMaterial.uniforms.uTime.value = clock.elapsedTime
    frontMaterial.uniforms.uTime.value = clock.elapsedTime
    rearMaterial.uniforms.uVariant.value = (objects.indexOf(activeObject) % 4) / 3

    rear.visible = true
    front.visible = true
  })

  return (
    <>
      <mesh
        ref={rearRef}
        material={rearMaterial}
        visible={false}
        frustumCulled={false}
        renderOrder={3}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
      </mesh>
      <mesh
        ref={frontRef}
        material={frontMaterial}
        visible={false}
        frustumCulled={false}
        renderOrder={18}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
      </mesh>
    </>
  )
}

function updateTrail(trail, x, y) {
  if (!trail.length) {
    for (let index = 0; index < 12; index += 1) trail[index] = { x, y }
    return
  }

  trail[0].x += (x - trail[0].x) * 0.72
  trail[0].y += (y - trail[0].y) * 0.72
  for (let index = 1; index < trail.length; index += 1) {
    const response = 0.34 - index * 0.012
    trail[index].x += (trail[index - 1].x - trail[index].x) * response
    trail[index].y += (trail[index - 1].y - trail[index].y) * response
  }
}

function traceTrail(ctx, trail) {
  ctx.beginPath()
  ctx.moveTo(trail[trail.length - 1].x, trail[trail.length - 1].y)
  for (let index = trail.length - 2; index >= 1; index -= 1) {
    const midpointX = (trail[index].x + trail[index - 1].x) * 0.5
    const midpointY = (trail[index].y + trail[index - 1].y) * 0.5
    ctx.quadraticCurveTo(trail[index].x, trail[index].y, midpointX, midpointY)
  }
  ctx.lineTo(trail[0].x, trail[0].y)
}

function drawEditorialCursor(canvas, state, accent, trail) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    trail.splice(0, trail.length)
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)
  if (!state?.present) return

  updateTrail(trail, state.pointerX, state.pointerY)
  const speed = clamp(Math.hypot(state.velocityX, state.velocityY) / 18, 0, 1)
  const hover = clamp(state.alpha, 0, 1)

  ctx.save()
  ctx.globalAlpha = 0.16 + speed * 0.15
  ctx.strokeStyle = '#f1eee1'
  ctx.lineWidth = 10 + speed * 5
  ctx.lineCap = 'square'
  traceTrail(ctx, trail)
  ctx.stroke()

  ctx.globalAlpha = 0.58
  ctx.strokeStyle = '#0a0c0b'
  ctx.lineWidth = 2.2
  traceTrail(ctx, trail.slice(0, 8))
  ctx.stroke()

  const tip = trail[0]
  const radius = (state.pressed ? 5 : 7) + hover * 2
  ctx.globalAlpha = 0.96
  ctx.fillStyle = '#f1eee1'
  ctx.strokeStyle = '#080a09'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(tip.x, tip.y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(tip.x + 11, tip.y - 11)
  ctx.lineTo(tip.x + 17 + hover * 7, tip.y - 17 - hover * 7)
  ctx.stroke()
  ctx.restore()
}

export function CinematicHoverOverlay({ objects, stateRef, disabled = false }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const labelRef = useRef(null)
  const labelCodeRef = useRef(null)
  const labelTitleRef = useRef(null)
  const labelNoteRef = useRef(null)
  const trailRef = useRef([])

  useEffect(() => {
    let frame = null

    const update = () => {
      const root = rootRef.current
      const canvas = canvasRef.current
      const label = labelRef.current
      const { cs, pipeline } = stateRef.current ?? {}

      if (root && canvas && cs && pipeline) {
        const immediateIndex = cs.activeId - 1
        const visualIndex = cs.visualActiveId - 1
        const displayIndex = immediateIndex >= 0 ? immediateIndex : visualIndex
        const colorObject = immediateIndex >= 0
          ? objects[immediateIndex]
          : visualIndex >= 0
            ? objects[visualIndex]
            : null
        const accent = colorObject?.accentColor?.getStyle?.() ?? '#d84b49'
        root.style.setProperty('--cinematic-accent', accent)
        root.style.opacity = disabled ? '0' : '1'
        drawEditorialCursor(canvas, cs, accent, trailRef.current)

        if (label) {
          const projection = displayIndex >= 0
            ? pipeline.smoothProj?.[displayIndex]
            : null
          const visible = displayIndex >= 0 && cs.anchor > 0.02 && projection?.init
          label.style.opacity = visible ? String(clamp(cs.anchor, 0, 1)) : '0'
          if (visible) {
            const activeObject = objects[displayIndex]
            const rect = pipeline.domElement.getBoundingClientRect()
            const dpr = pipeline.pixelRatio || window.devicePixelRatio || 1
            const focus = clamp(cs.anchor, 0, 1)
            const x = rect.left + (projection.cx - projection.w * 0.38) / dpr
            const y = rect.top + (projection.cy + projection.h * 0.62) / dpr
            const slideY = (1 - focus) * 26
            const labelWidth = label.offsetWidth || 480
            const labelHeight = label.offsetHeight || 190
            label.style.transform = `translate3d(${clamp(x, 18, Math.max(18, window.innerWidth - labelWidth - 18))}px, ${clamp(y + slideY, 72, Math.max(72, window.innerHeight - labelHeight - 24))}px, 0)`
            if (labelCodeRef.current) {
              labelCodeRef.current.textContent = `ARCHIVE / ${String(displayIndex + 1).padStart(2, '0')}`
            }
            if (labelTitleRef.current) {
              labelTitleRef.current.textContent = activeObject?.title || `PROJECT ${displayIndex + 1}`
            }
            if (labelNoteRef.current) {
              labelNoteRef.current.textContent = activeObject?.desc || 'SELECTED WORK / OPEN TO INSPECT'
            }
          }
        }
      }

      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [disabled, objects, stateRef])

  return (
    <div ref={rootRef} className="cinematic-hover-ui" aria-hidden="true">
      <style>{`
        .cinematic-hover-ui {
          --cinematic-accent: #d84b49;
          position: fixed;
          inset: 0;
          z-index: 2100;
          overflow: hidden;
          pointer-events: none;
          contain: layout paint style;
          transition: opacity 180ms ease;
        }

        .cinematic-hover-ui__cursor {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .cinematic-hover-ui__label {
          position: absolute;
          top: 0;
          left: 0;
          width: min(500px, 82vw);
          display: grid;
          justify-items: start;
          color: #f1eee1;
          font-family: "BL Melody Mono", "Courier New", monospace;
          opacity: 0;
          transform-origin: left center;
          will-change: transform, opacity;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, .72));
        }

        .cinematic-hover-ui__label::before {
          content: "";
          position: absolute;
          left: -14px;
          top: -14px;
          width: 58px;
          height: 4px;
          background: var(--cinematic-accent);
          transform: rotate(-28deg);
          transform-origin: left center;
        }

        .cinematic-hover-ui__code {
          padding: 7px 11px;
          color: #fff;
          background: var(--cinematic-accent);
          font-size: clamp(10px, .78vw, 13px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .cinematic-hover-ui__title {
          max-width: 100%;
          margin-top: 8px;
          padding: 9px 15px 12px;
          color: #080a09;
          background: #f1eee1;
          font-family: "TRTCENZODEMO-ExtraBold", Impact, sans-serif;
          font-size: clamp(40px, 5.6vw, 88px);
          font-weight: 900;
          line-height: .76;
          letter-spacing: -.035em;
          clip-path: polygon(0 3%, 100% 0, 97% 93%, 2% 100%);
        }

        .cinematic-hover-ui__note {
          margin: 6px 0 0 10px;
          padding: 6px 10px;
          color: #f1eee1;
          background: #080a09;
          border-left: 8px solid var(--cinematic-accent);
          font-size: clamp(9px, .72vw, 12px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: .14em;
        }

        @media (pointer: coarse) {
          .cinematic-hover-ui__cursor {
            display: none;
          }
        }
      `}</style>
      <canvas ref={canvasRef} className="cinematic-hover-ui__cursor" />
      <div ref={labelRef} className="cinematic-hover-ui__label">
        <span ref={labelCodeRef} className="cinematic-hover-ui__code" />
        <strong ref={labelTitleRef} className="cinematic-hover-ui__title" />
        <span ref={labelNoteRef} className="cinematic-hover-ui__note" />
      </div>
    </div>
  )
}

export default CinematicHoverController
