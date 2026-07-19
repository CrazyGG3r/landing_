import { useLayoutEffect } from 'react'
import * as THREE from 'three'

// The CRT glass deliberately stays on MeshPhysicalMaterial so Three.js can use
// its shared transmission buffer. That makes every opaque object already behind
// the tube available to the refraction without a second scene render or a
// component-owned framebuffer.

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
}) {
  useLayoutEffect(() => {
    if (!sceneRoot) return undefined

    const mesh = findNamedMesh(sceneRoot, nodeName)
    if (!mesh) return undefined

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
      transmission: opts.transmission,
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

    glass.onBeforeCompile = (shader) => {
      patchCrtTransmission(shader, refractionStrength, uvTransform)
    }
    glass.customProgramCacheKey = () => 'crt-soft-bevel-transmission-v2'

    const previous = mesh.material
    mesh.material = glass

    return () => {
      mesh.material = previous
      glass.dispose()
    }
  }, [sceneRoot, nodeName, refraction, settings])

  return null
}
