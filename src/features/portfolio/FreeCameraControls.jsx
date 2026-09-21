import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const WORLD_UP = new THREE.Vector3(0, 1, 0)
const MAX_PITCH = Math.PI / 2 - 0.04

function buildCylinderBounds(regionNode, insetRatio) {
  const geometry = regionNode?.geometry
  if (!geometry) return null

  if (!geometry.boundingBox) geometry.computeBoundingBox()
  const box = geometry.boundingBox
  if (!box || box.isEmpty()) return null

  const width = box.max.x - box.min.x
  const depth = box.max.z - box.min.z
  const height = box.max.y - box.min.y
  if (width <= 0 || depth <= 0 || height <= 0) return null

  const inset = THREE.MathUtils.clamp(insetRatio, 0, 0.45)
  return {
    centerX: (box.min.x + box.max.x) * 0.5,
    centerZ: (box.min.z + box.max.z) * 0.5,
    radius: Math.min(width, depth) * 0.5 * (1 - inset),
    minY: box.min.y + height * inset,
    maxY: box.max.y - height * inset,
  }
}

export default function FreeCameraControls({
  active,
  controlsEnabled,
  regionNode,
  onEnterComplete,
  movementSpeed = 0.42,
  acceleration = 10,
  deceleration = 13,
  lookSensitivity = 0.0022,
  regionInset = 0.035,
  entrySharpness = 6,
}) {
  const { camera, gl } = useThree()
  const eulerRef = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const keysRef = useRef(new Set())
  const draggingRef = useRef(false)
  const pointerRef = useRef({ id: null, x: 0, y: 0 })
  const velocityRef = useRef(new THREE.Vector3())
  const desiredVelocityRef = useRef(new THREE.Vector3())
  const forwardRef = useRef(new THREE.Vector3())
  const rightRef = useRef(new THREE.Vector3())
  const proposedPositionRef = useRef(new THREE.Vector3())
  const constrainedPositionRef = useRef(new THREE.Vector3())
  const localPositionRef = useRef(new THREE.Vector3())
  const correctionRef = useRef(new THREE.Vector3())
  const enteredRef = useRef(false)

  const cylinder = useMemo(
    () => buildCylinderBounds(regionNode, regionInset),
    [regionNode, regionInset],
  )

  useEffect(() => {
    if (regionNode) regionNode.visible = false
  }, [regionNode])

  const constrainPosition = (worldPosition, target) => {
    if (!regionNode || !cylinder) return target.copy(worldPosition)

    regionNode.updateWorldMatrix(true, false)
    const local = localPositionRef.current.copy(worldPosition)
    regionNode.worldToLocal(local)

    local.y = THREE.MathUtils.clamp(local.y, cylinder.minY, cylinder.maxY)
    const dx = local.x - cylinder.centerX
    const dz = local.z - cylinder.centerZ
    const radialLengthSq = dx * dx + dz * dz
    const radiusSq = cylinder.radius * cylinder.radius
    if (radialLengthSq > radiusSq) {
      const scale = cylinder.radius / Math.sqrt(radialLengthSq)
      local.x = cylinder.centerX + dx * scale
      local.z = cylinder.centerZ + dz * scale
    }

    return regionNode.localToWorld(target.copy(local))
  }

  useEffect(() => {
    if (!active) return
    enteredRef.current = false
    velocityRef.current.set(0, 0, 0)
    eulerRef.current.setFromQuaternion(camera.quaternion, 'YXZ')
  }, [active, camera])

  useEffect(() => {
    if (!active || !controlsEnabled) return undefined

    const canvas = gl.domElement
    const previousCursor = canvas.style.cursor
    const previousTouchAction = canvas.style.touchAction
    const keys = keysRef.current
    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'none'

    const isEditableTarget = (target) =>
      target instanceof HTMLElement &&
      (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

    const handleKeyDown = (event) => {
      if (isEditableTarget(event.target)) return
      const key = event.key.toLowerCase()
      if (!['w', 'a', 's', 'd', 'q', 'e', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(key)) return
      keys.add(key)
      event.preventDefault()
    }

    const handleKeyUp = (event) => {
      keys.delete(event.key.toLowerCase())
    }

    const handlePointerDown = (event) => {
      if (event.button !== 0 || draggingRef.current) return
      draggingRef.current = true
      pointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
      canvas.setPointerCapture?.(event.pointerId)
      canvas.style.cursor = 'grabbing'
      event.preventDefault()
    }

    const handlePointerMove = (event) => {
      const pointer = pointerRef.current
      if (!draggingRef.current || pointer.id !== event.pointerId) return

      const dx = event.clientX - pointer.x
      const dy = event.clientY - pointer.y
      pointer.x = event.clientX
      pointer.y = event.clientY

      const euler = eulerRef.current
      euler.y -= dx * lookSensitivity
      euler.x = THREE.MathUtils.clamp(euler.x - dy * lookSensitivity, -MAX_PITCH, MAX_PITCH)
      camera.quaternion.setFromEuler(euler)
      event.preventDefault()
    }

    const endDrag = (event) => {
      if (pointerRef.current.id !== event.pointerId) return
      draggingRef.current = false
      pointerRef.current.id = null
      if (canvas.hasPointerCapture?.(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
      canvas.style.cursor = 'grab'
    }

    const handleBlur = () => {
      keys.clear()
      draggingRef.current = false
      pointerRef.current.id = null
      canvas.style.cursor = 'grab'
    }

    const preventContextMenu = (event) => event.preventDefault()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', endDrag)
    canvas.addEventListener('pointercancel', endDrag)
    canvas.addEventListener('contextmenu', preventContextMenu)

    return () => {
      keys.clear()
      draggingRef.current = false
      pointerRef.current.id = null
      canvas.style.cursor = previousCursor
      canvas.style.touchAction = previousTouchAction
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
      canvas.removeEventListener('contextmenu', preventContextMenu)
    }
  }, [active, controlsEnabled, camera, gl, lookSensitivity])

  useFrame((_, rawDelta) => {
    if (!active || !regionNode || !cylinder) return

    const delta = Math.min(rawDelta, 0.05)
    const constrained = constrainPosition(camera.position, constrainedPositionRef.current)

    if (!enteredRef.current) {
      const distance = camera.position.distanceTo(constrained)
      if (distance > 0.0005) {
        const alpha = 1 - Math.exp(-entrySharpness * delta)
        camera.position.lerp(constrained, alpha)
        return
      }

      camera.position.copy(constrained)
      enteredRef.current = true
      onEnterComplete?.()
      return
    }

    if (!controlsEnabled) return

    const keys = keysRef.current
    const forwardAmount =
      (keys.has('w') || keys.has('arrowup') ? 1 : 0) -
      (keys.has('s') || keys.has('arrowdown') ? 1 : 0)
    const rightAmount =
      (keys.has('d') || keys.has('arrowright') ? 1 : 0) -
      (keys.has('a') || keys.has('arrowleft') ? 1 : 0)
    const verticalAmount = (keys.has('e') ? 1 : 0) - (keys.has('q') ? 1 : 0)

    camera.getWorldDirection(forwardRef.current)
    forwardRef.current.y = 0
    if (forwardRef.current.lengthSq() > 1e-8) forwardRef.current.normalize()
    rightRef.current.crossVectors(forwardRef.current, WORLD_UP).normalize()

    const speed = movementSpeed * (keys.has('shift') ? 1.7 : 1)
    const desiredVelocity = desiredVelocityRef.current
      .set(0, verticalAmount, 0)
      .addScaledVector(forwardRef.current, forwardAmount)
      .addScaledVector(rightRef.current, rightAmount)
    if (desiredVelocity.lengthSq() > 1) desiredVelocity.normalize()
    desiredVelocity.multiplyScalar(speed)

    const hasInput = forwardAmount !== 0 || rightAmount !== 0 || verticalAmount !== 0
    const response = hasInput ? acceleration : deceleration
    const velocityAlpha = 1 - Math.exp(-response * delta)
    const velocity = velocityRef.current.lerp(desiredVelocity, velocityAlpha)
    if (!hasInput && velocity.lengthSq() < 1e-6) velocity.set(0, 0, 0)
    if (velocity.lengthSq() === 0) return

    const proposed = proposedPositionRef.current.copy(camera.position).addScaledVector(velocity, delta)
    constrainPosition(proposed, constrainedPositionRef.current)
    camera.position.copy(constrainedPositionRef.current)

    // Remove only the outward velocity at the cylinder wall, preserving the
    // tangential component so diagonal movement glides naturally along it.
    const correction = correctionRef.current.copy(constrainedPositionRef.current).sub(proposed)
    if (correction.lengthSq() > 1e-10) {
      correction.normalize()
      const intoWall = velocity.dot(correction)
      if (intoWall < 0) velocity.addScaledVector(correction, -intoWall)
    }
  })

  return null
}
