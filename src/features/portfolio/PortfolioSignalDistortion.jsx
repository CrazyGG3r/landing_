import { forwardRef, useMemo, useRef } from 'react'
import { EffectComposer } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { BlendFunction, Effect } from 'postprocessing'
import * as THREE from 'three'

const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uFocus;
  uniform float uImpulse;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float intensity = clamp(uIntensity, 0.0, 1.0);
    if (intensity < 0.001) {
      outputColor = inputColor;
      return;
    }

    float timeSlice = floor(uTime * 22.0);
    float rowNoise = hash(vec2(floor(uv.y * 190.0), timeSlice));
    float fineJitter = (rowNoise - 0.5) * 0.0024 * intensity;

    float trackingCenter = fract(uTime * 0.115 + hash(vec2(floor(uTime * 0.32), 4.7)));
    float trackingDistance = abs(uv.y - trackingCenter);
    float trackingBand = 1.0 - smoothstep(0.012, 0.055, trackingDistance);
    float trackingFault = trackingBand * (0.004 + uImpulse * 0.022) * intensity;

    float chapterKick = (hash(vec2(timeSlice, floor(uv.y * 24.0))) - 0.5) *
      uImpulse * step(0.68, hash(vec2(floor(uv.y * 31.0), timeSlice)));
    float horizontalOffset = fineJitter + trackingFault + chapterKick * 0.018;

    vec2 displacedUv = uv + vec2(horizontalOffset, uImpulse * 0.0012);
    displacedUv = clamp(displacedUv, vec2(0.001), vec2(0.999));

    float chroma = (0.0012 + uFocus * 0.0036 + uImpulse * 0.0065) * intensity;
    float edgeBias = pow(abs(uv.x - 0.5) * 2.0, 1.8);
    chroma *= 0.55 + edgeBias * 0.9;
    vec2 chromaVector = vec2(chroma, chroma * 0.22);

    float red = texture2D(inputBuffer, clamp(displacedUv + chromaVector, 0.001, 0.999)).r;
    float green = texture2D(inputBuffer, displacedUv).g;
    float blue = texture2D(inputBuffer, clamp(displacedUv - chromaVector, 0.001, 0.999)).b;
    vec3 color = vec3(red, green, blue);

    float scan = sin((uv.y + uTime * 0.008) * 1500.0) * 0.5 + 0.5;
    color *= 1.0 - scan * (0.018 + uFocus * 0.018) * intensity;

    float noise = hash(gl_FragCoord.xy + timeSlice) - 0.5;
    color += noise * (0.018 + uImpulse * 0.055) * intensity;

    float dropoutSeed = hash(vec2(floor(uv.y * 320.0), timeSlice));
    float dropout = step(0.993 - uImpulse * 0.02, dropoutSeed) * intensity;
    color = mix(color, vec3(0.92), dropout * (0.14 + uImpulse * 0.28));

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(luma), uImpulse * 0.08);
    outputColor = vec4(color, inputColor.a);
  }
`

class PortfolioSignalEffectImpl extends Effect {
  constructor() {
    super('PortfolioSignalDistortion', fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([
        ['uTime', new THREE.Uniform(0)],
        ['uIntensity', new THREE.Uniform(0)],
        ['uFocus', new THREE.Uniform(0)],
        ['uImpulse', new THREE.Uniform(0)],
      ]),
    })
  }
}

const PortfolioSignalEffect = forwardRef(function PortfolioSignalEffect(
  { progress = 0, stateRef },
  forwardedRef,
) {
  const effect = useMemo(() => new PortfolioSignalEffectImpl(), [])
  const lastChapterRef = useRef(Math.floor(progress * 5))
  const impulseRef = useRef(0)
  const intensityRef = useRef(0)
  const focusRef = useRef(0)

  useFrame(({ clock }, delta) => {
    const chapter = Math.min(4, Math.floor(Math.min(0.9999, Math.max(0, progress)) * 5))
    if (chapter !== lastChapterRef.current) {
      lastChapterRef.current = chapter
      impulseRef.current = 1
    }

    impulseRef.current = THREE.MathUtils.damp(impulseRef.current, 0, 5.8, delta)
    const targetFocus = THREE.MathUtils.clamp(stateRef?.current?.cs?.anchor ?? 0, 0, 1)
    focusRef.current = THREE.MathUtils.damp(focusRef.current, targetFocus, 8.5, delta)

    const targetIntensity = Math.max(
      focusRef.current * 0.82,
      impulseRef.current,
    )
    intensityRef.current = THREE.MathUtils.damp(
      intensityRef.current,
      targetIntensity,
      targetIntensity > intensityRef.current ? 14 : 5.5,
      delta,
    )

    effect.uniforms.get('uTime').value = clock.elapsedTime
    effect.uniforms.get('uIntensity').value = intensityRef.current
    effect.uniforms.get('uFocus').value = focusRef.current
    effect.uniforms.get('uImpulse').value = impulseRef.current
  })

  return <primitive ref={forwardedRef} object={effect} dispose={null} />
})

export default function PortfolioSignalDistortion({
  enabled = true,
  progress = 0,
  stateRef,
}) {
  if (!enabled) return null

  return (
    <EffectComposer
      multisampling={0}
      enableNormalPass={false}
      resolutionScale={1}
    >
      <PortfolioSignalEffect progress={progress} stateRef={stateRef} />
    </EffectComposer>
  )
}
