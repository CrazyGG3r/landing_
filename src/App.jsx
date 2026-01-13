// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import { Suspense, useState } from 'react'

// import {  Platform, GLBLoader } from './components/Platforms'
// import { Light, } from './components/Lights'
// import { FloatingLight } from './components/Float'
// import { HDRIEnvironment } from './components/ExrLoader'
// import { Orbiter, Rotator } from './components/MotionWrap'
// import { Clickable, HoverTooltip} from './components/SelectControls'

// export default function App() {
//   // <-- Add this for hover control
//   const [hovered, setHovered] = useState(false)

//   return (
//     <Canvas
//       camera={{ position: [0, 2, 5], fov: 50, near: 0.01, far: 1000 }}
//       style={{ width: '100vw', height: '100vh' }}
//       shadows
//     >
//       {/* Ambient + Bloom */}
//       <ambientLight intensity={0.3} />
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
//       </EffectComposer>

//       {/* Scene Content */}
//       <Suspense fallback={null}>
//         <HDRIEnvironment path="/hdri/space8k2.exr" intensity={0.1} />

//         {/* Static Platforms */}
//         <Platform path="/models/main_1.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/station.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/man_1.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/p1.glb" position={[0, 0, 0]} scale={1.2} />

//         {/* Directional Light */}
//         <Light type="directional" intensity={1.5} position={[-3, -1, 1]} />

//         {/* Floating Light */}
//         <FloatingLight
//           color="#00ffff"
//           target={[0, 1, 0]}
//           orbitRadius={3}
//           orbitSpeed={0.9}
//           height={1.2}
//           intensity={30}
//           lightType="point"
//         />


//         <HoverTooltip content="Visit LinkedIn" position={[0, 1.5, 0]}>
//         <Clickable  outlineColor="#00ffff"  link="https://www.linkedin.com/in/shaheerulislam/"  setHovered={setHovered}>
//           <Orbiter target={[0, 0, 0]} radius={3} speed={0.3} bob>
//           <Rotator speed={1} axis = 'z' >
//             <Rotator speed={1} axis='x' >
//               <GLBLoader path="/models/rock_1.glb" scale={0.8} />
//             </Rotator>
//           </Rotator>
//           </Orbiter>
//         </Clickable>
//         </HoverTooltip>


//       </Suspense>
//       <OrbitControls />
//     </Canvas>
//   )
// }
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function MouseCircle() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    // Mapping mouse coordinates (-1 to 1) to the 3D scene
    const targetX = state.mouse.x * 5
    const targetY = state.mouse.y * 3

    // Smoothing the movement (0.05 is the "slowness")
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.8, 64]} />
      {/* toneMapped={false} ensures the color stays bright enough to trigger Bloom */}
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['black']} />
        
        <MouseCircle />

        {/* Bloom Effect configuration */}
        <EffectComposer>
          <Bloom 
            intensity={1.5}      // How strong the glow is
            luminanceThreshold={0} // Glow anything brighter than 0 (everything white)
            luminanceSmoothing={0.9} 
            mipmapBlur           // Makes the glow look soft and professional
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}