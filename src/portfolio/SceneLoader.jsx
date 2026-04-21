import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function reportSceneLoadError(error, onError) {
  if (error && !error.type?.includes('progress')) {
    console.error('❌ Failed to load scene:', error)
    onError?.(error)
  }
}

/**
 * Walks a THREE.Object3D tree and collects every Mesh.
 * Separates the camera-path object (any type) from interactive meshes.
 *
 * Path matching is intentionally strict: exact name match (case-insensitive).
 * Fuzzy / contains matching was causing false positives that swallowed real meshes.
 *
 * @param {THREE.Object3D} scene
 * @param {string}         pathObjectName  — exact name of the camera-path object
 * @returns {{
 *   allMeshes:          THREE.Mesh[],
 *   pathObject:         THREE.Object3D|null,   // any type — Mesh, Line, Object3D…
 *   interactiveMeshes:  THREE.Mesh[],
 * }}
 */
export function extractMeshes(scene, pathObjectName = 'CameraPath') {
  const allMeshes   = []
  const allObjects  = []
  let   pathObject  = null

  const needle = pathObjectName.toLowerCase().trim()

  scene.traverse((child) => {
    if (child.name) {
      allObjects.push(`${child.type}: "${child.name}"`)
    }

    // Collect every Mesh regardless — we'll filter path out next
    if (child.isMesh) {
      allMeshes.push(child)
    }

    // Path object: match ANY object type by EXACT name (case-insensitive)
    // We do NOT use .includes() — that swallows objects whose names merely
    // contain the path name as a substring (e.g. "CameraPath_Clone").
    if (!pathObject && child.name.toLowerCase().trim() === needle) {
      pathObject = child
    }
  })

  console.log('📦 All named objects in GLB:\n' + allObjects.join('\n'))

  if (pathObject) {
    console.log(`✅ Path object matched: "${pathObject.name}" (${pathObject.type})`)
    // Hide from rendering immediately — Portfolio will also hide it, but belt-and-suspenders
    pathObject.visible = false
  } else {
    console.warn(
      `⚠️  No object matched pathObjectName="${pathObjectName}".\n` +
      `   Check the object list above and update CONFIG.cameraPathObjectName.`
    )
  }

  // Exclude the path object from interactive meshes.
  // We compare by reference AND by name so even if pathObject is not a Mesh
  // but has Mesh children, those children are also excluded.
  const pathNames = new Set()
  if (pathObject) {
    pathObject.traverse(c => { if (c.name) pathNames.add(c.name) })
  }

  const interactiveMeshes = allMeshes.filter((m) => {
    if (pathObject && m === pathObject)    return false
    if (pathNames.has(m.name))             return false
    // Extra guard: skip degenerate / invisible meshes that would confuse the ID pass
    if (!m.geometry)                       return false
    if (!m.geometry.attributes?.position) return false
    if (m.geometry.attributes.position.count === 0) return false
    return true
  })

  console.log(`   Total meshes      : ${allMeshes.length}`)
  console.log(`   Interactive meshes: ${interactiveMeshes.length}`)
  console.log(`   Path object       : ${pathObject?.name ?? 'not found'} (${pathObject?.type ?? '—'})`)

  return { allMeshes, pathObject, interactiveMeshes }
}

// ─── PROMISE-BASED LOADER (outside React) ────────────────────────────────────

export function loadSceneAsset(modelPath, { clone = false, onError, pathObjectName } = {}) {
  const loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        const scene    = clone ? gltf.scene.clone(true) : gltf.scene
        const meshInfo = extractMeshes(scene, pathObjectName)
        resolve({ gltf, scene, ...meshInfo })
      },
      undefined,
      (error) => { reportSceneLoadError(error, onError); reject(error) }
    )
  })
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

/**
 * useSceneLoader — R3F Suspense-compatible hook.
 *
 * Returns:
 *   gltf               — raw GLTF object
 *   scene              — THREE.Scene (root of the loaded model)
 *   allMeshes          — every Mesh in the scene
 *   pathObject         — the CameraPath object (any type, or null)
 *   interactiveMeshes  — all meshes except pathObject (and its children)
 */
export function useSceneLoader(
  modelPath,
  { onLoad, onError, clone = false, pathObjectName = 'CameraPath' } = {}
) {
  const gltf = useLoader(GLTFLoader, modelPath, undefined, (err) => {
    reportSceneLoadError(err, onError)
  })

  const { scene, allMeshes, pathObject, interactiveMeshes } = useMemo(() => {
    if (!gltf?.scene) return { scene: null, allMeshes: [], pathObject: null, interactiveMeshes: [] }
    const s = clone ? gltf.scene.clone(true) : gltf.scene
    return { scene: s, ...extractMeshes(s, pathObjectName) }
  }, [gltf, clone, pathObjectName])

  useEffect(() => {
    if (!scene) return
    // Fire onLoad with the full breakdown so Portfolio can use it directly
    onLoad?.(scene, gltf, { allMeshes, pathObject, interactiveMeshes })
  }, [scene]) // eslint-disable-line react-hooks/exhaustive-deps

  return { gltf, scene, allMeshes, pathObject, interactiveMeshes }
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

/**
 * <SceneLoader>
 *
 * Props:
 *   modelPath        {string}    path to .glb (relative to /public)
 *   onLoad           {fn}        (scene, gltf, { allMeshes, pathObject, interactiveMeshes }) => void
 *   onError          {fn}        (error) => void
 *   clone            {boolean}   clone scene before use (default false)
 *   pathObjectName   {string}    exact name of the camera-path object (default 'CameraPath')
 *   children         {fn|node}   render-prop: ({ scene, gltf, interactiveMeshes, pathObject }) => node
 */
export default function SceneLoader({
  modelPath,
  onLoad,
  onError,
  clone = false,
  pathObjectName = 'CameraPath',
  children,
  ...props
}) {
  const { gltf, scene, allMeshes, pathObject, interactiveMeshes } = useSceneLoader(modelPath, {
    onLoad,
    onError,
    clone,
    pathObjectName,
  })

  if (!scene) return null

  if (typeof children === 'function') {
    return children({ scene, gltf, allMeshes, pathObject, interactiveMeshes })
  }

  return <primitive object={scene} {...props} />
}