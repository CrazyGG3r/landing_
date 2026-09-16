import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Keep the CRT optics on MeshPhysicalMaterial, but feed them a component-owned
// background capture. Three's shared transmission buffer contains every opaque
// object visible to the camera, including foreground geometry; a strong curved
// refraction can therefore pull pixels from the VHS player back into the glass.
// The dedicated capture below excludes only the known foreground roots while
// the normal scene render remains completely unchanged.

const DEFAULT_GLASS = {
  color: '#f4f8ff',
  roughness: 0.075,
  metalness: 0,
  transmission: 1,
  ior: 1.49,
  thickness: 0.085,
  clearcoat: 0.75,
  clearcoatRoughness: 0.12,
  reflectivity: 0.5,
  envMapIntensity: 1.15,
  attenuationColor: '#dcecff',
  attenuationDistance: 1.5,
}

const DEFAULT_EXCLUDED_NODE_NAMES = ['VHSPlayerRig', 'VHSPoint']
const TRANSMISSION_NORMAL = 'vec3 n = inverseTransformDirection( normal, viewMatrix );'
const TRANSMISSION_VOLUME =
  'material.dispersion, material.ior, material.thickness,'

function findNamedMesh(root, name) {
  let found = null
  root.traverse((child) => {
    if (!found && child.isMesh && child.name === name) found = child
  })
  return found
}

function findNamedObject(root, name) {
  let found = null
  root.traverse((child) => {
    if (!found && child.name === name) found = child
  })
  return found
}

function getUvTransform(geometry) {
  const uv = geometry?.getAttribute?.('uv')
  const min = new THREE.Vector2(0, 0)
  const range = new THREE.Vector2(1, 1)
  if (!uv?.count) return { min, range }

  min.set(Infinity, Infinity)
  const max = new THREE.Vector2(-Infinity, -Infinity)
  for (let index = 0; index < uv.count; index += 1) {
    min.x = Math.min(min.x, uv.getX(index))
    min.y = Math.min(min.y, uv.getY(index))
    max.x = Math.max(max.x, uv.getX(index))
    max.y = Math.max(max.y, uv.getY(index))
  }

  range.subVectors(max, min)
  range.set(Math.max(range.x, 0.0001), Math.max(range.y, 0.0001))
  return { min, range }
}

function patchCrtTransmission(shader, refractionStrength, uvTransform) {
  shader.uniforms.uCrtRefraction = { value: refractionStrength }
  shader.uniforms.uCrtUvMin = { value: uvTransform.min }
  shader.uniforms.uCrtUvRange = { value: uvTransform.range }

  // CRTTVScreen already has useful curved vertex normals, but its shallow
  // profile alone produces only a sub-pixel bend. The UV profile below adds a
  // smooth optical bevel to the outer ~15% of the glass. It changes the normal
  // used by the transmission lookup only; lighting continues to use the
  // authored normals, so the glass does not acquire a fake faceted highlight.
  shader.vertexShader = shader.vertexShader
    .replace(
      '#include <common>',
      `#include <common>
      varying vec2 vCrtGlassUv;`,
    )
    .replace(
      '#include <uv_vertex>',
      `#include <uv_vertex>
      vCrtGlassUv = uv;`,
    )

  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
      uniform float uCrtRefraction;
      uniform vec2 uCrtUvMin;
      uniform vec2 uCrtUvRange;
      varying vec2 vCrtGlassUv;`,
    )
    .replace(
      TRANSMISSION_NORMAL,
      `${TRANSMISSION_NORMAL}

      vec2 crtNormalizedUv = ( vCrtGlassUv - uCrtUvMin ) / uCrtUvRange;
      vec2 crtSignedUv = crtNormalizedUv * 2.0 - 1.0;
      vec2 crtEdgeDistance = 1.0 - abs( crtSignedUv );
      vec2 crtAxisBevel = 1.0 - smoothstep(
        vec2( 0.0 ),
        vec2( 0.30 ),
        crtEdgeDistance
      );
      float crtBevel = max( crtAxisBevel.x, crtAxisBevel.y );
      crtBevel = crtBevel * crtBevel * ( 3.0 - 2.0 * crtBevel );

      vec2 crtBevelDirection = crtSignedUv * crtAxisBevel;
      float crtDirectionLength = max( length( crtBevelDirection ), 0.0001 );
      crtBevelDirection /= crtDirectionLength;

      vec3 crtTangentX = normalize( modelMatrix[ 0 ].xyz );
      vec3 crtTangentY = normalize( modelMatrix[ 1 ].xyz );
      vec3 crtFlatNormal = normalize( cross( crtTangentX, crtTangentY ) );
      crtFlatNormal *= dot( crtFlatNormal, n ) < 0.0 ? -1.0 : 1.0;

      vec3 crtAuthoredSlope = n - crtFlatNormal * dot( n, crtFlatNormal );
      vec3 crtBevelNormal = normalize(
        crtFlatNormal +
        crtAuthoredSlope * 1.2 +
        ( crtTangentX * crtBevelDirection.x +
          crtTangentY * crtBevelDirection.y ) * ( 0.48 * crtBevel )
      );

      float crtStrength = clamp( uCrtRefraction, 0.0, 1.0 );
      n = normalize( mix( n, crtBevelNormal, crtStrength * crtBevel ) );

      // A thin optical center keeps the picture legible. Thickness and IOR ramp
      // smoothly through the bevel, where a real CRT faceplate bends most.
      float crtOpticalProfile = crtStrength * mix( 0.10, 1.0, crtBevel );
      float crtIor = mix( 1.0, material.ior, crtOpticalProfile );
      float crtThickness = material.thickness * crtOpticalProfile;`,
    )
    .replace(
      TRANSMISSION_VOLUME,
      'material.dispersion, crtIor, crtThickness,',
    )
}

export default function CRTGlass({
  sceneRoot,
  nodeName = 'CRTTVScreen',
  refraction = 0.7,
  settings,
  excludedNodeNames = DEFAULT_EXCLUDED_NODE_NAMES,
  captureScale = 0.62,
  captureFps = 24,
  captureSamples = 0,
}) {
  const { gl, scene, camera } = useThree()
  const glassMeshRef = useRef(null)
  const excludedRootsRef = useRef([])
  const drawingBufferSizeRef = useRef(new THREE.Vector2())
  const lastCaptureAtRef = useRef(-Infinity)
  const adaptiveScaleRef = useRef(captureScale)
  const frameTimeRef = useRef({ average: 1 / 60, samples: 0 })
  const cameraStateRef = useRef(null)
  const cameraMotionUntilRef = useRef(0)
  const transmissionSize = useMemo(() => new THREE.Vector2(1, 1), [])
  const transmissionTarget = useMemo(() => {
    const supportsHalfFloat =
      gl.extensions.has('EXT_color_buffer_half_float') ||
      gl.extensions.has('EXT_color_buffer_float')
    const target = new THREE.WebGLRenderTarget(1, 1, {
      generateMipmaps: false,
      type: supportsHalfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      colorSpace: THREE.ColorManagement.workingColorSpace,
    })
    target.texture.name = 'CRT background-only transmission'
    target.samples = captureSamples
    return target
  }, [captureSamples, gl])

  useEffect(() => {
    adaptiveScaleRef.current = captureScale
  }, [captureScale])

  useEffect(() => () => transmissionTarget.dispose(), [transmissionTarget])

  useLayoutEffect(() => {
    if (!sceneRoot) return undefined

    const mesh = findNamedMesh(sceneRoot, nodeName)
    if (!mesh) return undefined
    glassMeshRef.current = mesh
    excludedRootsRef.current = excludedNodeNames
      .map((name) => findNamedObject(sceneRoot, name))
      .filter(Boolean)

    const opts = { ...DEFAULT_GLASS, ...(settings || {}) }
    const numericRefraction = Number(refraction)
    const refractionStrength = Number.isFinite(numericRefraction)
      ? THREE.MathUtils.clamp(numericRefraction, 0, 1)
      : 0
    const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
    const hasRoughnessMap = !!source?.roughnessMap
    const uvTransform = getUvTransform(mesh.geometry)

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(opts.color),
      metalness: opts.metalness,
      roughness: hasRoughnessMap ? 1 : opts.roughness,
      roughnessMap: source?.roughnessMap ?? null,
      normalMap: source?.normalMap ?? null,
      normalScale: source?.normalScale
        ? source.normalScale.clone()
        : new THREE.Vector2(1, 1),
      // Keep this at zero so Three.js does not run its shared transmission
      // pre-pass. USE_TRANSMISSION is forced below and receives our clean FBO.
      transmission: 0,
      ior: opts.ior,
      thickness: opts.thickness,
      attenuationColor: new THREE.Color(opts.attenuationColor),
      attenuationDistance: opts.attenuationDistance,
      clearcoat: opts.clearcoat,
      clearcoatRoughness: opts.clearcoatRoughness,
      reflectivity: opts.reflectivity,
      envMapIntensity: opts.envMapIntensity,
      side: THREE.FrontSide,
      depthWrite: true,
    })
    glass.defines = { ...glass.defines, USE_TRANSMISSION: '' }

    glass.onBeforeCompile = (shader) => {
      shader.uniforms.transmission = { value: opts.transmission }
      shader.uniforms.thickness = { value: opts.thickness }
      shader.uniforms.attenuationColor = {
        value: new THREE.Color(opts.attenuationColor),
      }
      shader.uniforms.attenuationDistance = {
        value: opts.attenuationDistance,
      }
      shader.uniforms.transmissionSamplerMap = {
        value: transmissionTarget.texture,
      }
      shader.uniforms.transmissionSamplerSize = {
        value: transmissionSize,
      }
      patchCrtTransmission(shader, refractionStrength, uvTransform)
    }
    glass.customProgramCacheKey = () => 'crt-soft-bevel-background-transmission-v3'

    const previous = mesh.material
    mesh.material = glass

    return () => {
      mesh.material = previous
      if (glassMeshRef.current === mesh) glassMeshRef.current = null
      excludedRootsRef.current = []
      glass.dispose()
    }
  }, [
    sceneRoot,
    nodeName,
    refraction,
    settings,
    excludedNodeNames,
    transmissionSize,
    transmissionTarget,
  ])

  useFrame((state, delta) => {
    const glassMesh = glassMeshRef.current
    if (!glassMesh || document.visibilityState === 'hidden') return

    // The capture is a secondary optical input, not the visible scene itself.
    // Keep it responsive while avoiding a second full-resolution scene render
    // on every display refresh. Slowly trim its resolution on sustained slow
    // devices and recover it when the frame budget becomes healthy again.
    const frameTime = frameTimeRef.current
    frameTime.average = THREE.MathUtils.lerp(
      frameTime.average,
      Math.min(delta, 0.1),
      0.035,
    )
    frameTime.samples += 1
    if (frameTime.samples >= 180) {
      const minimumScale = Math.min(0.42, captureScale)
      if (frameTime.average > 1 / 42) {
        adaptiveScaleRef.current = Math.max(
          minimumScale,
          adaptiveScaleRef.current - 0.08,
        )
      } else if (frameTime.average < 1 / 57) {
        adaptiveScaleRef.current = Math.min(
          captureScale,
          adaptiveScaleRef.current + 0.04,
        )
      }
      frameTime.samples = 0
    }

    const now = state.clock.elapsedTime
    const cameraState = cameraStateRef.current
    const cameraMoved = cameraState
      ? camera.position.distanceToSquared(cameraState.position) > 1e-10 ||
        1 - Math.abs(camera.quaternion.dot(cameraState.quaternion)) > 1e-9 ||
        Math.abs(camera.fov - cameraState.fov) > 1e-4
      : true

    if (!cameraState) {
      cameraStateRef.current = {
        position: camera.position.clone(),
        quaternion: camera.quaternion.clone(),
        fov: camera.fov,
      }
    } else if (cameraMoved) {
      cameraState.position.copy(camera.position)
      cameraState.quaternion.copy(camera.quaternion)
      cameraState.fov = camera.fov
    }

    if (cameraMoved) cameraMotionUntilRef.current = now + 0.16
    const cameraInMotion = now < cameraMotionUntilRef.current
    const minimumInterval = cameraInMotion ? 0 : 1 / Math.max(1, captureFps)
    if (minimumInterval > 0 && now - lastCaptureAtRef.current < minimumInterval) return
    lastCaptureAtRef.current = now

    gl.getDrawingBufferSize(drawingBufferSizeRef.current)
    const scale = adaptiveScaleRef.current
    const width = Math.max(1, Math.round(drawingBufferSizeRef.current.x * scale))
    const height = Math.max(1, Math.round(drawingBufferSizeRef.current.y * scale))
    if (transmissionTarget.width !== width || transmissionTarget.height !== height) {
      transmissionTarget.setSize(width, height)
      transmissionSize.set(width, height)
    }

    const hiddenObjects = [glassMesh, ...excludedRootsRef.current]
    const previousVisibility = hiddenObjects.map((object) => object.visible)
    const previousTarget = gl.getRenderTarget()
    const previousCubeFace = gl.getActiveCubeFace()
    const previousMipmapLevel = gl.getActiveMipmapLevel()
    const previousToneMapping = gl.toneMapping
    const previousCameraViewport = camera.viewport

    hiddenObjects.forEach((object) => {
      object.visible = false
    })

    try {
      gl.toneMapping = THREE.NoToneMapping
      if (camera.viewport !== undefined) camera.viewport = undefined
      gl.setRenderTarget(transmissionTarget)
      gl.render(scene, camera)
    } finally {
      gl.setRenderTarget(previousTarget, previousCubeFace, previousMipmapLevel)
      gl.toneMapping = previousToneMapping
      camera.viewport = previousCameraViewport
      hiddenObjects.forEach((object, index) => {
        object.visible = previousVisibility[index]
      })
    }
  })

  return null
}
