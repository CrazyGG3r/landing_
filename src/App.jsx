import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useState } from 'react'

import {  Platform, GLBLoader } from './components/Platforms'
import { Light, } from './components/Lights'
import { FloatingLight } from './components/Float'
import { HDRIEnvironment } from './components/ExrLoader'
import { Orbiter, Rotator } from './components/MotionWrap'
import { Clickable, HoverTooltip} from './components/SelectControls'

export default function App() {
  // <-- Add this for hover control
  const [hovered, setHovered] = useState(false)

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50, near: 0.01, far: 1000 }}
      style={{ width: '100vw', height: '100vh' }}
      shadows
    >
      {/* Ambient + Bloom */}
      <ambientLight intensity={0.3} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
      </EffectComposer>

      {/* Scene Content */}
      <Suspense fallback={null}>
        <HDRIEnvironment path="/hdri/space8k2.exr" intensity={0.1} />

        {/* Static Platforms */}
        <Platform path="/models/main_1.glb" position={[0, 0, 0]} scale={1} />
        <Platform path="/models/station.glb" position={[0, 0, 0]} scale={1} />
        <Platform path="/models/man_1.glb" position={[0, 0, 0]} scale={1} />
        <Platform path="/models/p1.glb" position={[0, 0, 0]} scale={1.2} />

        {/* Directional Light */}
        <Light type="directional" intensity={1.5} position={[-3, -1, 1]} />

        {/* Floating Light */}
        <FloatingLight
          color="#00ffff"
          target={[0, 1, 0]}
          orbitRadius={3}
          orbitSpeed={0.9}
          height={1.2}
          intensity={30}
          lightType="point"
        />


        <HoverTooltip content="Visit LinkedIn" position={[0, 1.5, 0]}>
        <Clickable  outlineColor="#00ffff"  link="https://www.linkedin.com/in/shaheerulislam/"  setHovered={setHovered}>
          <Orbiter target={[0, 0, 0]} radius={3} speed={0.3} bob>
          <Rotator speed={1} axis = 'z' >
            <Rotator speed={1} axis='x' >
              <GLBLoader path="/models/rock_1.glb" scale={0.8} />
            </Rotator>
          </Rotator>
          </Orbiter>
        </Clickable>
        </HoverTooltip>


      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
