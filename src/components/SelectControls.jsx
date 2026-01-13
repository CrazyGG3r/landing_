import { useState } from 'react'
import { Outlines } from '@react-three/drei'
import { Html } from '@react-three/drei'


export function Clickable({
  children,
  outlineColor = '#00ffff',
  onClick,
  link,
  linkTarget = '_blank',
}) {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e) => {

    if (link) window.open(link, linkTarget)
    if (onClick) onClick(e)
  }

  const handlePointerOver = (e) => {
 
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {

    setHovered(false)
    document.body.style.cursor = 'default'
  }

  // Clone child to inject the `paused` prop (if it supports it)
  const childWithPause = children
    ? { ...children, props: { ...children.props, paused: hovered } }
    : null

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {childWithPause}
      {hovered && <Outlines thickness={0.02} color={outlineColor} />}
    </group>
  )
}




export function HoverTooltip({
  children,
  content = "Tooltip",
}) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
        // track mouse coordinates every frame
        setMouse({ x: e.clientX, y: e.clientY })
      }}
    >
      {children}

      {hovered && (
        <Html
          as="div"
          prepend
          transform={false}   // --- IMPORTANT: screen-space mode
          style={{
            position: 'fixed',
            left: mouse.x + 16 + 'px',   // offset so cursor doesn't cover it
            top: mouse.y + 16 + 'px',
            background: 'rgba(0, 0, 0, 0.75)',
            padding: '8px 12px',
            borderRadius: '8px',
            color: '#00ffff',
            fontSize: '14px',
            border: '1px solid #00ffff',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 9999
          }}
        >
          {content}
        </Html>
      )}
    </group>
  )
}
