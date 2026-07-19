import { useEffect } from 'react'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// CRT GLASS
// ═══════════════════════════════════════════════════════════════════════════════
//
// Binds the "CRTTVScreen" mesh (the curved glass sitting in front of the picture
// tube) by name and gives it a minimal, genuinely see-through glass material: a
// clear MeshPhysicalMaterial with full transmission and very low roughness by
// default. If the mesh's authored material already carries a normal map and/or a
// roughness map, those are preserved and drive the glass; otherwise it falls back
// to flat base settings.
//
// Bind-by-name and defensive on purpose: the mesh does not exist in the current
// EntryScene.glb yet. Until it is added this component simply does nothing (no
// error, no side effects), and the moment a mesh named "CRTTVScreen" ships in the
// glb it is picked up automatically.
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_GLASS = {
  color: '#ffffff',
  roughness: 0.04,       // very low — clearly see-through
  metalness: 0.0,
  transmission: 1.0,     // fully transmissive glass
  ior: 1.5,              // typical glass
  thickness: 0.05,
  opacity: 0.11,
  clearcoat: 1.0,
  reflectivity: 0.5,
  envMapIntensity: 1.0,
}

function findNamedMesh(root, name) {
  let found = null
  root.traverse((child) => {
    if (!found && child.isMesh && child.name === name) found = child
  })
  return found
}

export default function CRTGlass({
  sceneRoot,
  nodeName = 'CRTTVScreen',
  // Edge refraction strength only: 0 = none, 1 = full configured glass bend.
  refraction = 0.35,
  settings,
}) {
  useEffect(() => {
    if (!sceneRoot) return undefined

    const mesh = findNamedMesh(sceneRoot, nodeName)
    if (!mesh) return undefined // mesh not present yet — clean no-op

    const opts = { ...DEFAULT_GLASS, ...(settings || {}) }
    const refractionStrength = THREE.MathUtils.clamp(Number(refraction) || 0, 0, 1)
    const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material

    // Preserve authored normal/roughness maps if the source material has them,
    // so the glass can carry surface detail; otherwise stay minimal/flat.
    const hasRoughnessMap = !!source?.roughnessMap
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(opts.color),
      metalness: opts.metalness,
      roughness: hasRoughnessMap ? 1.0 : opts.roughness, // let the map drive it
      roughnessMap: source?.roughnessMap ?? null,
      normalMap: source?.normalMap ?? null,
      normalScale: source?.normalScale ? source.normalScale.clone() : new THREE.Vector2(1, 1),
      transmission: opts.transmission,
      ior: opts.ior,
      thickness: opts.thickness,
      clearcoat: opts.clearcoat,
      reflectivity: opts.reflectivity,
      envMapIntensity: opts.envMapIntensity,
      transparent: true,
      side: THREE.FrontSide,
    })

    // MeshPhysicalMaterial already owns the transmission buffer. Modulate only
    // its IOR/thickness near grazing angles for a realistic curved CRT edge bend,
    // avoiding another scene capture or post-processing pass.
    glass.onBeforeCompile = (shader) => {
      shader.uniforms.uCrtRefraction = { value: refractionStrength }
      shader.fragmentShader = `uniform float uCrtRefraction;\n${shader.fragmentShader}`
        .replace(
          'vec3 n = inverseTransformDirection( normal, viewMatrix );',
          `vec3 n = inverseTransformDirection( normal, viewMatrix );
          float crtFresnel = pow( 1.0 - clamp( abs( dot( normalize( n ), normalize( v ) ) ), 0.0, 1.0 ), 2.0 );
          float crtEdgeRefraction = smoothstep( 0.02, 0.72, crtFresnel ) * uCrtRefraction;
          float crtIor = mix( 1.0, material.ior, crtEdgeRefraction );
          float crtThickness = material.thickness * crtEdgeRefraction;`,
        )
        .replace(
          'material.dispersion, material.ior, material.thickness,',
          'material.dispersion, crtIor, crtThickness,',
        )
    }
    glass.customProgramCacheKey = () => 'crt-edge-refraction-v1'

    const previous = mesh.material
    mesh.material = glass

    return () => {
      mesh.material = previous
      glass.dispose()
    }
  }, [sceneRoot, nodeName, refraction, settings])

  return null
}
