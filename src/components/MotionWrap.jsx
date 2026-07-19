import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Orbiter({
  children,
  target = [0, 0, 0],
  radius = 3,
  speed = 0.5,
  bob = false,
  paused = false,
  ...props
}) {
  const ref = useRef()
  const angleRef = useRef(0)

  useFrame((_, delta) => {
    if (paused) return
    angleRef.current += delta * speed

    const x = target[0] + Math.cos(angleRef.current) * radius
    const z = target[2] + Math.sin(angleRef.current) * radius
    const y = target[1] + (bob ? Math.sin(angleRef.current * 2) * 0.2 : 0)

    ref.current.position.set(x, y, z)
    ref.current.lookAt(...target)
  })

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  )
}

export function Rotator({
  children,
  speed = 1,     // radians per second
  axis = 'y',    // 'x', 'y', or 'z'
  paused = false,
  ...props
}) {
  const ref = useRef()

  useFrame((_, delta) => {
    if (paused || !ref.current) return
    ref.current.rotation[axis] += delta * speed
  })

  return <group ref={ref} {...props}>{children}</group>
}