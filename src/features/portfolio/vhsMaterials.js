import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// VHS MATERIALS — shared tint/label/transparency logic for VHSUnit.glb clones.
// Used by both <VHSInstances> (many units placed along the shelf) and
// <EntryScene> (the single selected unit placed at VHSPoint).
// ═══════════════════════════════════════════════════════════════════════════════

export const DEFAULT_VHS_MODEL_PATH = 'models/vhs/VHSUnit.glb'
export const VHS_PRIMARY_MASK_PATH = 'models/vhs/masks/VHS_PrimaryMask.png'
export const VHS_SECONDARY_MASK_PATH = 'models/vhs/masks/VHS_SecondaryMask.png'
export const VHS_LABEL_DIR = 'models/vhs/label'

export const TINT_MATERIAL_NAME = 'VHS'
export const REEL_SUPPORT_MATERIAL_NAME = 'ReelSupport'
export const GLASS_MATERIAL_NAME = 'Glass'
export const COVER_MATERIAL_NAME = 'VHSCover'
export const SOLID_OCCLUDER_NODE_NAMES = new Set(['VHS'])
export const GLASS_NODE_NAMES = new Set(['VHSGlass'])
export const REEL_SUPPORT_NODE_NAMES = new Set(['ReelSupport_L', 'ReelSupport_R'])

// The exported alpha-blended materials (VHS, ReelSupport, Glass) all default
// to `depthWrite: false` once three.js marks them transparent — the standard
// behavior for blended materials, but wrong here: their opacity maps are
// mostly *opaque* with only small genuinely-translucent regions (a window
// cutout, a worn edge), so skipping depth writes made even the fully-opaque
// areas fail to occlude what's behind them — the "see-through" artifact.
// Fix: keep `depthWrite` on and use `alphaTest` to discard only the truly
// transparent texels.
export const TRANSPARENCY_ALPHA_TEST = 0.04

const sharedTextureRequests = new Map()

function loadSharedTexture(path, onReady, _onProgress, onError) {
  const cached = sharedTextureRequests.get(path)
  if (cached?.status === 'loaded') {
    onReady?.(cached.texture)
    return
  }
  if (cached?.status === 'error') return
  if (cached?.status === 'loading') {
    if (onReady) cached.listeners.push(onReady)
    return
  }

  const record = {
    status: 'loading',
    texture: null,
    listeners: onReady ? [onReady] : [],
  }
  sharedTextureRequests.set(path, record)

  const loader = new THREE.TextureLoader()
  loader.load(
    path,
    (texture) => {
      record.status = 'loaded'
      record.texture = texture
      const listeners = record.listeners.splice(0)
      listeners.forEach((listener) => listener(texture))
    },
    undefined,
    (error) => {
      const isOptionalLabel = path.startsWith(`${VHS_LABEL_DIR}/`)
      if (isOptionalLabel) {
        record.status = 'error'
      } else {
        sharedTextureRequests.delete(path)
      }
      record.listeners.length = 0
      onError?.(error)
    },
  )
}

function configureMaskTexture(texture) {
  texture.colorSpace = THREE.NoColorSpace
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.flipY = false
  texture.needsUpdate = true
}

export function fixCutoutTransparency(material) {
  material.transparent = true
  material.depthWrite = true
  material.depthTest = true
  material.alphaTest = TRANSPARENCY_ALPHA_TEST
  material.needsUpdate = true
}

// The duplicated "original" VHS material (applied to VHS/Reel/ReelHolder_L/R)
// deliberately drops its opacity map entirely rather than cutting out by it:
// those meshes are meant to read as one solid, unbroken shell.
export function makeSolidOccluder(material) {
  material.transparent = false
  material.depthWrite = true
  material.depthTest = true
  material.alphaTest = 0
  material.premultipliedAlpha = false
  material.forceSinglePass = true
  material.needsUpdate = true
}

// Minimalistic stand-in for a full glass shader: a standard PBR material
// reusing the "VHS" material's own albedo/normal/roughness+metalness maps —
// VHSGlass sits directly over the same printed-label UVs.
export function createVhsGlassMaterial(sourceVhsMaterial) {
  const material = new THREE.MeshStandardMaterial({
    map: sourceVhsMaterial.map ?? null,
    normalMap: sourceVhsMaterial.normalMap ?? null,
    roughnessMap: sourceVhsMaterial.roughnessMap ?? null,
    metalnessMap: sourceVhsMaterial.metalnessMap ?? null,
    roughness: sourceVhsMaterial.roughness ?? 0.3,
    metalness: sourceVhsMaterial.metalness ?? 0,
    side: THREE.DoubleSide,
  })
  fixCutoutTransparency(material)
  return material
}

// ─── DEDICATED COLOR PALETTE ─────────────────────────────────────────────────
// Primary = extremely dark shade of the hue, Secondary = bright shade of the
// (slightly offset) hue. One dedicated pair per VHS unit, keyed by index so
// any single unit's colors can be reproduced later without the full set.

export function buildVhsPalette(count) {
  const safeCount = Math.max(1, count)
  const palette = []
  for (let i = 0; i < safeCount; i += 1) {
    const hue = i / safeCount
    const primary = new THREE.Color().setHSL(hue, 0.55, 0.065)
    const secondary = new THREE.Color().setHSL((hue + 0.045) % 1, 0.78, 0.62)
    palette.push({ primary, secondary })
  }
  return palette
}

export function buildVhsPaletteEntry(index, count) {
  const palette = buildVhsPalette(count)
  return palette[index % palette.length]
}

// ─── MASK TEXTURE LOADING (non-suspending, graceful when files are missing) ──

export function makeBlankMaskTexture() {
  const tex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat)
  tex.needsUpdate = true
  return tex
}

export function loadMaskTextureInto(uniformHolder, path) {
  loadSharedTexture(
    path,
    (tex) => {
      tex.colorSpace = THREE.NoColorSpace
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      // GLTFLoader loads the "VHS" base-color texture with flipY = false (the
      // glTF UV convention), but TextureLoader defaults to flipY = true. Left
      // mismatched, the masks are sampled vertically flipped relative to the
      // albedo — the "offset" against the mesh UVs. Match the glTF convention so
      // the masks track the VHS material's UVs exactly.
      tex.flipY = false
      tex.needsUpdate = true
      uniformHolder.value = tex
    },
    undefined,
    () => {
      // Mask PNG not present yet — keep the blank fallback so the base color
      // texture renders untouched until the real file is dropped in at this path.
    },
  )
}

// ─── PER-UNIT LABEL OVERLAY LOADING (non-suspending, graceful when missing) ──

export function preloadVhsMaterialTextures() {
  loadSharedTexture(VHS_PRIMARY_MASK_PATH, configureMaskTexture)
  loadSharedTexture(VHS_SECONDARY_MASK_PATH, configureMaskTexture)
}

export function makeBlankLabelTexture() {
  const tex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1, THREE.RGBAFormat)
  tex.needsUpdate = true
  return tex
}

export function loadLabelTextureInto(uniformHolder, path) {
  loadSharedTexture(
    path,
    (tex) => {
      // Label art is authored color (not a coverage mask), so it needs the
      // same sRGB decode as any other albedo texture.
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.needsUpdate = true
      uniformHolder.value = tex
    },
    undefined,
    () => {
      // Label PNG not present yet for this unit — keep the blank/transparent
      // fallback so VHSCover's base albedo renders untouched.
    },
  )
}

// ─── DUAL-MASK CONSTANT-COLOR TINT SHADER ────────────────────────────────────

export function applyDualMaskTint(material, { primaryMaskUniform, secondaryMaskUniform, primaryColor, secondaryColor }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uVhsPrimaryMask = primaryMaskUniform
    shader.uniforms.uVhsSecondaryMask = secondaryMaskUniform
    shader.uniforms.uVhsPrimaryColor = { value: primaryColor }
    shader.uniforms.uVhsSecondaryColor = { value: secondaryColor }

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      uniform sampler2D uVhsPrimaryMask;
      uniform sampler2D uVhsSecondaryMask;
      uniform vec3 uVhsPrimaryColor;
      uniform vec3 uVhsSecondaryColor;`,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      #ifdef USE_MAP
      {
        float vhsPrimaryMask = texture2D( uVhsPrimaryMask, vMapUv ).r;
        float vhsSecondaryMask = texture2D( uVhsSecondaryMask, vMapUv ).r;
        diffuseColor.rgb = mix( diffuseColor.rgb, uVhsPrimaryColor, vhsPrimaryMask );
        diffuseColor.rgb = mix( diffuseColor.rgb, uVhsSecondaryColor, vhsSecondaryMask );
      }
      #endif`,
    )
  }
  material.needsUpdate = true
}

// ─── PER-UNIT LABEL OVERLAY SHADER ───────────────────────────────────────────

export function applyLabelOverlay(material, { labelUniform }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uVhsLabelMap = labelUniform

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      uniform sampler2D uVhsLabelMap;`,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      #ifdef USE_MAP
      {
        vec4 vhsLabelSample = texture2D( uVhsLabelMap, vMapUv );
        diffuseColor.rgb = mix( diffuseColor.rgb, vhsLabelSample.rgb, vhsLabelSample.a );
      }
      #endif`,
    )
  }
  material.needsUpdate = true
}

// ─── SOURCE MATERIAL DISCOVERY ───────────────────────────────────────────────
// GLTFLoader clones a glTF material per-mesh whenever that mesh's geometry
// needs different derivative-tangent / vertex-color / flat-shading handling
// than whichever mesh first claimed the material — so several *distinct*
// THREE.Material objects can end up sharing the authored name "VHS" (or
// "ReelSupport"). Collect every distinct object sharing each name instead of
// assuming there's only one.
export function collectVhsSourceMaterials(gltfScene) {
  const vhsSourceMaterials = []
  const reelSupportSourceMaterials = []
  const glassSourceMaterials = []
  const coverSourceMaterials = []

  gltfScene.traverse((child) => {
    if (!child.isMesh) return
    const mats = Array.isArray(child.material) ? child.material : [child.material]
    mats.forEach((m) => {
      if (!m) return
      if (m.name === TINT_MATERIAL_NAME && !vhsSourceMaterials.includes(m)) vhsSourceMaterials.push(m)
      if (m.name === REEL_SUPPORT_MATERIAL_NAME && !reelSupportSourceMaterials.includes(m)) reelSupportSourceMaterials.push(m)
      if (m.name === GLASS_MATERIAL_NAME && !glassSourceMaterials.includes(m)) glassSourceMaterials.push(m)
      if (m.name === COVER_MATERIAL_NAME && !coverSourceMaterials.includes(m)) coverSourceMaterials.push(m)
    })
  })

  return { vhsSourceMaterials, reelSupportSourceMaterials, glassSourceMaterials, coverSourceMaterials }
}

// ─── PER-INSTANCE MATERIAL APPLICATION ───────────────────────────────────────
// Walks one cloned VHSUnit.glb root, swapping in a tinted/labeled clone of
// each source material (memoized per distinct source object so a material
// shared across several meshes on this unit isn't cloned twice), and returns
// the "VHS" shell mesh (used for hit-testing / static-pose baking upstream).
export function applyVhsMaterials(root, {
  vhsSourceMaterials,
  glassSourceMaterials,
  coverSourceMaterials,
  maskUniforms,
  colors,
  labelUniform,
  envMapIntensity,
}) {
  let shellMesh = null

  if (!vhsSourceMaterials.length && !coverSourceMaterials.length) {
    root.traverse((child) => {
      if (!shellMesh && child.isMesh) shellMesh = child
    })
    return shellMesh
  }

  const tintedByOriginal = new Map()
  const tintedGlassByOriginal = new Map()
  const labeledByOriginal = new Map()

  // The "original" VHS material — applied to VHS, Reel, ReelHolder_L and
  // ReelHolder_R — has its opacity map removed entirely (solid occluder, see
  // makeSolidOccluder) so those meshes read as one unbroken shell.
  const getTinted = (original) => {
    let tinted = tintedByOriginal.get(original)
    if (!tinted) {
      tinted = original.clone()
      applyDualMaskTint(tinted, {
        primaryMaskUniform: maskUniforms.primary,
        secondaryMaskUniform: maskUniforms.secondary,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
      })
      tinted.envMapIntensity = envMapIntensity
      makeSolidOccluder(tinted)
      tintedByOriginal.set(original, tinted)
    }
    return tinted
  }

  // The duplicated VHS material — applied only to VHSGlass — keeps its
  // opacity map alive (real alpha-tested cutout) via fixCutoutTransparency.
  const getTintedGlass = (original) => {
    let tintedGlass = tintedGlassByOriginal.get(original)
    if (!tintedGlass) {
      tintedGlass = createVhsGlassMaterial(vhsSourceMaterials[0] ?? original)
      applyDualMaskTint(tintedGlass, {
        primaryMaskUniform: maskUniforms.primary,
        secondaryMaskUniform: maskUniforms.secondary,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
      })
      tintedGlass.envMapIntensity = envMapIntensity
      fixCutoutTransparency(tintedGlass)
      tintedGlassByOriginal.set(original, tintedGlass)
    }
    return tintedGlass
  }

  // "VHSCover" — applied to VHSCase, VHSLabel1, VHSLabel2 — gets this unit's
  // numbered label art blended over its base albedo.
  const getLabeled = (original) => {
    let labeled = labeledByOriginal.get(original)
    if (!labeled) {
      labeled = original.clone()
      applyLabelOverlay(labeled, { labelUniform })
      labeled.envMapIntensity = envMapIntensity
      labeled.needsUpdate = true
      labeledByOriginal.set(original, labeled)
    }
    return labeled
  }

  root.traverse((child) => {
    if (!child.isMesh) return
    const isArrayMaterial = Array.isArray(child.material)
    const mats = isArrayMaterial ? child.material : [child.material]
    const nextMats = mats.map((m) => {
      if (m && vhsSourceMaterials.includes(m)) return getTinted(m)
      if (m && glassSourceMaterials.includes(m)) return getTintedGlass(m)
      if (m && coverSourceMaterials.includes(m)) return getLabeled(m)
      return m
    })
    child.material = isArrayMaterial ? nextMats : nextMats[0]

    const authoredName = child.userData?.name ?? child.name
    if (SOLID_OCCLUDER_NODE_NAMES.has(authoredName)) {
      child.renderOrder = 20
      const appliedMats = Array.isArray(child.material) ? child.material : [child.material]
      appliedMats.forEach((material) => {
        if (material) makeSolidOccluder(material)
      })
    } else if (GLASS_NODE_NAMES.has(authoredName)) {
      child.renderOrder = 20
      const appliedMats = Array.isArray(child.material) ? child.material : [child.material]
      appliedMats.forEach((material) => {
        if (material) fixCutoutTransparency(material)
      })
    } else if (REEL_SUPPORT_NODE_NAMES.has(authoredName)) {
      child.renderOrder = 10
      const appliedMats = Array.isArray(child.material) ? child.material : [child.material]
      appliedMats.forEach((material) => {
        if (material) fixCutoutTransparency(material)
      })
    }

    // userData.name survives clone() and keeps the *original* glTF node name
    // even if GLTFLoader had to de-duplicate `.name` (two nodes in this rig
    // are both authored "VHS" — a group and the cassette mesh).
    if (!shellMesh && child.userData?.name === TINT_MATERIAL_NAME) {
      shellMesh = child
    }
  })

  if (!shellMesh) {
    root.traverse((child) => {
      if (!shellMesh && child.isMesh) shellMesh = child
    })
  }

  return shellMesh
}
