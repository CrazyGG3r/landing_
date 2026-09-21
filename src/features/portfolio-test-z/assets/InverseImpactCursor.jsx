import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'
import { DEFAULT_INVERSE_IMPACT } from './assetDefaults'

const HOVER_END = 30 / 30

function makeImpactMaterial(source) {
  const material = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    map: source?.map ?? null,
    alphaMap: source?.alphaMap ?? null,
    alphaTest: source?.alphaTest ?? 0,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: source?.side ?? THREE.DoubleSide,
    toneMapped: false,
  })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uImpactPointer = { value: new THREE.Vector2(-10000, -10000) }
    shader.uniforms.uImpactRadius = { value: 120 }
    shader.uniforms.uImpactTime = { value: 0 }
    shader.uniforms.uImpactStrength = { value: 0 }
    shader.uniforms.uImpactScale = { value: 0 }
    shader.uniforms.uImpactAttraction = { value: 0.88 }
    shader.uniforms.uImpactBreath = { value: 0.08 }
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec2 uImpactPointer;
        uniform float uImpactRadius;
        uniform float uImpactTime;
        uniform float uImpactStrength;
        uniform float uImpactScale;
        uniform float uImpactAttraction;
        uniform float uImpactBreath;

        float impactSmoothMin(float a, float b, float k) {
          float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
          return mix(b, a, h) - k * h * (1.0 - h);
        }
      `)
      .replace('#include <opaque_fragment>', `
        float breath = 1.0 + sin(uImpactTime * 2.15) * uImpactBreath;
        float spread = mix(0.72, 0.34, uImpactAttraction);
        vec2 driftA = vec2(cos(uImpactTime * 1.17), sin(uImpactTime * 1.43)) * uImpactRadius * spread;
        vec2 driftB = vec2(cos(uImpactTime * 1.31 + 2.3), sin(uImpactTime * 1.09 + 2.3)) * uImpactRadius * spread;
        vec2 p = gl_FragCoord.xy;
        vec2 coreDelta = (p - uImpactPointer) / vec2(1.08, 0.86);
        float scaledRadius = uImpactRadius * uImpactScale;
        float core = length(coreDelta) - scaledRadius * breath;
        float satelliteA = length((p - (uImpactPointer + driftA * uImpactScale)) / vec2(1.18, 0.82)) - scaledRadius * 0.47;
        float satelliteB = length((p - (uImpactPointer + driftB * uImpactScale)) / vec2(0.86, 1.16)) - scaledRadius * 0.39;
        float field = impactSmoothMin(core, satelliteA, uImpactRadius * 0.3);
        field = impactSmoothMin(field, satelliteB, uImpactRadius * 0.26);
        float blob = 1.0 - smoothstep(-1.5, 1.5, field);
        diffuseColor.rgb = vec3(1.0);
        diffuseColor.a *= blob * uImpactStrength;
        if (diffuseColor.a < 0.01) discard;
        #include <opaque_fragment>
      `)
    material.userData.impactShader = shader
  }
  material.customProgramCacheKey = () => 'inverse-impact-v1'
  return material
}

function ImpactVhsModel({ config, modelConfig, active, subscribePointer }) {
  const { scene, animations } = useGLTF(modelConfig.modelUrl)
  const impactScene = useMemo(() => clone(scene), [scene])
  const materialsRef = useRef([])
  const strengthRef = useRef(0)
  const pointerRef = useRef({ x: -10000, y: -10000 })
  const canvasBoundsRef = useRef(null)
  const activeRef = useRef(active)
  const configRef = useRef(config)
  const { gl, invalidate } = useThree()
  const bounds = useMemo(() => new THREE.Box3().setFromObject(impactScene), [impactScene])
  const center = useMemo(() => bounds.getCenter(new THREE.Vector3()), [bounds])
  const size = useMemo(() => bounds.getSize(new THREE.Vector3()), [bounds])
  const fitScale = (2.7 / Math.max(size.x, size.y, size.z, 0.001)) * modelConfig.scale

  activeRef.current = active
  configRef.current = config

  useEffect(() => invalidate(), [active, invalidate])

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(impactScene)
    animations.forEach((clip) => {
      if (!['VHS_HoverClick', 'Reel_Play', 'VHS_Play', 'Play'].includes(clip.name)) return
      const action = mixer.clipAction(clip)
      action.play()
      action.paused = true
      action.weight = 1
      action.time = clip.name === 'VHS_HoverClick' ? Math.min(HOVER_END, clip.duration) : clip.duration
    })
    mixer.update(0)

    const materials = []
    impactScene.traverse((child) => {
      if (!child.isMesh) return
      child.raycast = () => null
      const sources = Array.isArray(child.material) ? child.material : [child.material]
      const replacements = sources.map((source) => {
        const material = makeImpactMaterial(source)
        materials.push(material)
        return material
      })
      child.material = Array.isArray(child.material) ? replacements : replacements[0]
      child.renderOrder = 20
    })
    materialsRef.current = materials
    return () => {
      mixer.stopAllAction()
      materials.forEach((material) => material.dispose())
      materialsRef.current = []
    }
  }, [animations, impactScene])

  useEffect(() => {
    const updateBounds = () => { canvasBoundsRef.current = gl.domElement.getBoundingClientRect() }
    const observer = new ResizeObserver(updateBounds)
    observer.observe(gl.domElement)
    window.addEventListener('resize', updateBounds, { passive: true })
    updateBounds()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateBounds)
    }
  }, [gl])

  useEffect(() => {
    const move = (event) => {
      if (!activeRef.current) return
      const rect = canvasBoundsRef.current
      if (!rect) return
      const dpr = gl.getPixelRatio()
      pointerRef.current.x = (event.clientX - rect.left) * dpr
      pointerRef.current.y = (rect.bottom - event.clientY) * dpr
    }
    const unsubscribePointer = subscribePointer?.(move)
    if (!unsubscribePointer) window.addEventListener('pointermove', move, { passive: true })
    return () => {
      if (unsubscribePointer) unsubscribePointer()
      else window.removeEventListener('pointermove', move)
    }
  }, [gl, subscribePointer])

  useFrame(({ clock }, delta) => {
    const current = configRef.current
    const target = activeRef.current ? current.opacity : 0
    const response = 1 - Math.exp(-Math.min(delta, 0.05) * current.response)
    strengthRef.current += (target - strengthRef.current) * response
    const normalizedStrength = current.opacity > 0.001 ? THREE.MathUtils.clamp(strengthRef.current / current.opacity, 0, 1) : 0
    const back = normalizedStrength - 1
    const revealScale = normalizedStrength <= 0.001 ? 0 : 1 + 2.70158 * back * back * back + 1.70158 * back * back
    const dpr = gl.getPixelRatio()
    materialsRef.current.forEach((material) => {
      const shader = material.userData.impactShader
      if (!shader) return
      shader.uniforms.uImpactPointer.value.set(pointerRef.current.x, pointerRef.current.y)
      shader.uniforms.uImpactRadius.value = current.size * dpr
      shader.uniforms.uImpactTime.value = current.paused ? 0 : clock.elapsedTime
      shader.uniforms.uImpactStrength.value = strengthRef.current
      shader.uniforms.uImpactScale.value = revealScale
      shader.uniforms.uImpactAttraction.value = current.attraction
      shader.uniforms.uImpactBreath.value = current.breath
    })
    if (activeRef.current || Math.abs(target - strengthRef.current) > 0.002) invalidate()
  })

  return <group position={[-center.x * fitScale, -center.y * fitScale, -center.z * fitScale]} rotation={[
    THREE.MathUtils.degToRad(modelConfig.rotationX),
    THREE.MathUtils.degToRad(modelConfig.rotationY),
    THREE.MathUtils.degToRad(modelConfig.rotationZ),
  ]}>
    <primitive object={impactScene} scale={fitScale} />
  </group>
}

export function InverseImpactVhsLayer({ config = DEFAULT_INVERSE_IMPACT, modelConfig, active, textActive = false, subscribePointer }) {
  const promptRef = useRef(null)
  const promptBoundsRef = useRef(null)
  const [promptVisible, setPromptVisible] = useState(false)

  useEffect(() => {
    if (!textActive) {
      setPromptVisible(false)
      return undefined
    }
    let interval = 0
    const entrance = window.setTimeout(() => {
      setPromptVisible(true)
      interval = window.setInterval(() => setPromptVisible((visible) => !visible), 2000)
    }, 2000)
    return () => {
      window.clearTimeout(entrance)
      window.clearInterval(interval)
    }
  }, [textActive])

  useEffect(() => {
    const prompt = promptRef.current
    const parent = prompt?.parentElement
    if (!parent) return undefined
    const updateBounds = () => { promptBoundsRef.current = parent.getBoundingClientRect() }
    const observer = new ResizeObserver(updateBounds)
    observer.observe(parent)
    window.addEventListener('resize', updateBounds, { passive: true })
    updateBounds()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateBounds)
    }
  }, [])

  useEffect(() => {
    const move = (event) => {
      const prompt = promptRef.current
      if (!prompt) return
      const parentBounds = promptBoundsRef.current
      const x = event.clientX - (parentBounds?.left ?? 0)
      const y = event.clientY - (parentBounds?.top ?? 0)
      prompt.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }
    const unsubscribePointer = subscribePointer?.(move)
    if (!unsubscribePointer) window.addEventListener('pointermove', move, { passive: true })
    return () => {
      if (unsubscribePointer) unsubscribePointer()
      else window.removeEventListener('pointermove', move)
    }
  }, [subscribePointer])

  return <>
    <div className="inverse-impact-vhs-layer" data-active={active} aria-hidden="true">
      <Canvas style={{ pointerEvents: 'none' }} frameloop="demand" camera={{ position: [0, 0, 4.2], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}><ImpactVhsModel config={config} modelConfig={modelConfig} active={active} subscribePointer={subscribePointer} /></Suspense>
      </Canvas>
    </div>
    <div className="inverse-impact-vhs-prompt-layer" aria-hidden="true">
      <span ref={promptRef} className="inverse-impact-vhs-prompt" data-visible={promptVisible && textActive}>
        <span>Click</span><span>To</span><span>View</span>
      </span>
    </div>
  </>
}

export function InverseImpactOverlayLayer({ config = DEFAULT_INVERSE_IMPACT, active, subscribePointer }) {
  const rootRef = useRef(null)
  const circlesRef = useRef([[], []])
  const wakeRef = useRef(() => {})
  const activeRef = useRef(active)
  const configRef = useRef(config)
  activeRef.current = active
  configRef.current = config

  useEffect(() => {
    wakeRef.current()
  }, [active])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const pointer = { x: -1000, y: -1000 }
    const state = { x: -1000, y: -1000, vx: 0, vy: 0, strength: 0 }
    let frame = 0
    let running = false
    let previous = performance.now()
    const move = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      if (activeRef.current || state.strength > 0.001) schedule()
    }
    const render = (time) => {
      const current = configRef.current
      const delta = Math.min(34, Math.max(6, time - previous))
      previous = time
      const frameScale = delta / 16.667
      const spring = Math.min(0.52, current.response * 0.012 * frameScale)
      state.vx = (state.vx + (pointer.x - state.x) * spring) * Math.pow(0.66, frameScale)
      state.vy = (state.vy + (pointer.y - state.y) * spring) * Math.pow(0.66, frameScale)
      state.x += state.vx * frameScale
      state.y += state.vy * frameScale
      state.strength += ((activeRef.current ? current.opacity : 0) - state.strength) * (1 - Math.exp(-delta / 110))
      root.style.opacity = state.strength.toFixed(3)
      const normalizedStrength = current.opacity > 0.001 ? Math.max(0, Math.min(1, state.strength / current.opacity)) : 0
      const back = normalizedStrength - 1
      const revealScale = normalizedStrength <= 0.001 ? 0 : 1 + 2.70158 * back ** 3 + 1.70158 * back ** 2
      const phase = current.paused ? 0 : time * 0.001
      if (!activeRef.current && state.strength < 0.001) {
        root.style.opacity = '0'
        running = false
        return
      }
      const bounds = root.getBoundingClientRect()
      const localScaleX = root.clientWidth / Math.max(1, bounds.width)
      const localScaleY = root.clientHeight / Math.max(1, bounds.height)
      const localScale = Math.sqrt(localScaleX * localScaleY)
      const localX = (state.x - bounds.left) * localScaleX
      const localY = (state.y - bounds.top) * localScaleY
      const radius = current.size * localScale * revealScale * (1 + Math.sin(phase * 2.15) * current.breath)
      const spread = radius * (0.72 - current.attraction * 0.38)
      const positions = [
        [localX, localY, radius, radius * 0.86],
        [localX + Math.cos(phase * 1.17) * spread, localY + Math.sin(phase * 1.43) * spread, radius * 0.5, radius * 0.39],
        [localX + Math.cos(phase * 1.31 + 2.3) * spread, localY + Math.sin(phase * 1.09 + 2.3) * spread, radius * 0.4, radius * 0.47],
      ]
      circlesRef.current.forEach((region) => {
        region.forEach((circle, index) => {
          if (!circle) return
          const [cx, cy, rx, ry] = positions[index]
          circle.setAttribute('cx', cx)
          circle.setAttribute('cy', cy)
          circle.setAttribute('rx', rx)
          circle.setAttribute('ry', ry)
        })
      })
      frame = requestAnimationFrame(render)
    }
    function schedule() {
      if (running) return
      running = true
      previous = performance.now()
      frame = requestAnimationFrame(render)
    }
    wakeRef.current = schedule
    const unsubscribePointer = subscribePointer?.(move)
    if (!unsubscribePointer) window.addEventListener('pointermove', move, { passive: true })
    schedule()
    return () => {
      wakeRef.current = () => {}
      if (unsubscribePointer) unsubscribePointer()
      else window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [subscribePointer])

  return <div ref={rootRef} className="inverse-impact-overlay-surface" aria-hidden="true">
    {['detail', 'title'].map((region, regionIndex) => <svg key={region} className={`inverse-impact-overlay-layer inverse-impact-overlay-layer--${region}`}>
      {[0, 1, 2].map((index) => <ellipse key={index} ref={(node) => { circlesRef.current[regionIndex][index] = node }} />)}
    </svg>)}
  </div>
}
