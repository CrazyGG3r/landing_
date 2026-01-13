import { useRef, useMemo, useEffect, useState } from 'react'
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { useHelper } from '@react-three/drei'
import { useFrame,useThree  } from '@react-three/fiber'
import * as THREE from 'three'


export function Light({
  type = 'directional', // "point" | "spot" | "directional"
  color = 0xffffff,
  intensity = 1,
  position = [0, 5, 0],
  castShadow = true,
  helper = true ,
  ...props
}) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) ref.current.position.set(...position)
  }, [position])

  // optional helper
  useHelper(
    helper && ref,
    type === 'point'
      ? PointLightHelper
      : type === 'spot'
      ? SpotLightHelper
      : DirectionalLightHelper,
    1,
    color
  )

  // pick light type
  if (type === 'point')
    return <pointLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
  if (type === 'spot')
    return <spotLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
  return <directionalLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
}

export function OrbitalLight({
  type = 'directional', // "point" | "spot" | "directional"
  color = 0xffffff,
  intensity = 1,
  position = [0, 5, 0],
  castShadow = true,
  helper = true ,
  ...props
}) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) ref.current.position.set(...position)
  }, [position])

  // optional helper
  useHelper(
    helper && ref,
    type === 'point'
      ? PointLightHelper
      : type === 'spot'
      ? SpotLightHelper
      : DirectionalLightHelper,
    1,
    color
  )

  // pick light type
  if (type === 'point')
    return <pointLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
  if (type === 'spot')
    return <spotLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
  return <directionalLight ref={ref} color={color} intensity={intensity} castShadow={castShadow} {...props} />
}

export function HoverLight({
  children,
  lightColor = '#ffffff',
  intensity = 18,
  distance = 3,
  offset = [0, 1, 0], // local offset to child
  onHoverChange = () => {},
}) {
  const [hovered, setHovered] = useState(false)

  function handleOver(e) {
    e.stopPropagation()
    if (!hovered) {
      setHovered(true)
      onHoverChange(true)
    }
  }
  function handleOut(e) {
    e.stopPropagation()
    if (hovered) {
      setHovered(false)
      onHoverChange(false)
    }
  }

  // We wrap children in a group and place the light relative to that group
  return (
    <group onPointerOver={handleOver} onPointerOut={handleOut} >
      {children}
      {hovered && (
        <pointLight
          color={lightColor}
          intensity={intensity}
          distance={distance}
          // place the light at the given offset relative to the group
          position={offset}
          helper = {true}

        />
      )}
    </group>
  )
}

export function HoverOrbitLights({
  children,
  numLights = 6,
  radius = 2,
  intensity = 8,
  speed = 0.6,
  colorPalette = ['#00ffff', '#ff66ff', '#ff9966', '#99ff66'],
  angle = 0.4,
  penumbra = 0.6,
  onHoverChange = () => {},
  showHelpers = true, // ✅ toggle
}) {
  const [hovered, setHovered] = useState(false)
  const lightsRef = useRef([])
  const helpersRef = useRef([])
  const targetRef = useRef()
  const { scene } = useThree()

  // randomize light configs
  const lightConfigs = useMemo(() => {
    return Array.from({ length: numLights }, () => ({
      axis: new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize(),
      angleOffset: Math.random() * Math.PI * 2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      speedFactor: 0.3 + Math.random() * 1.2,
    }))
  }, [numLights, colorPalette])

  // set up helpers once
  useEffect(() => {
    if (!showHelpers) return
    helpersRef.current = lightsRef.current.map((light) => {
      if (!light) return null
      const helper = new SpotLightHelper(light)
      scene.add(helper)
      return helper
    })
    return () => {
      helpersRef.current.forEach((helper) => helper && scene.remove(helper))
    }
  }, [showHelpers, scene])

  useFrame(({ clock }) => {
    if (!hovered || !targetRef.current) return

    const t = clock.getElapsedTime() * speed
    const targetPos = new THREE.Vector3()
    targetRef.current.getWorldPosition(targetPos)

    lightsRef.current.forEach((light, i) => {
      if (!light) return
      const { axis, angleOffset, speedFactor } = lightConfigs[i]
      const a = t * speedFactor + angleOffset

      // orbit around target
      const pos = new THREE.Vector3(radius, 0, 0)
      pos.applyAxisAngle(axis, a)
      pos.add(targetPos)
      light.position.copy(pos)

      // aim at target
      light.target.position.copy(targetPos)
      light.target.updateMatrixWorld()

      // update helper
      if (helpersRef.current[i]) helpersRef.current[i].update()
    })
  })

  const handleOver = () => {
    setHovered(true)
    onHoverChange(true)
  }

  const handleOut = () => {
    setHovered(false)
    onHoverChange(false)
  }

  return (
    <group ref={targetRef} onPointerOver={handleOver} onPointerOut={handleOut}>
      {children}

      {hovered &&
        lightConfigs.map((config, i) => (
          <spotLight
            key={i}
            ref={(el) => (lightsRef.current[i] = el)}
            color={config.color}
            intensity={intensity}
            angle={angle}
            penumbra={penumbra}
            distance={radius * 3}
            castShadow
          />
        ))}
    </group>
  )
}
