import * as THREE from 'three'

const CINEMATIC_PALETTE = [
  '#d84b49',
  '#e7b63f',
  '#3e9f91',
  '#5d79b8',
  '#bb5d88',
  '#c96e3f',
  '#72964c',
  '#8d69ad',
]

function parseInteractiveName(rawName) {
  if (!rawName.startsWith('I_')) {
    return { label: rawName, title: rawName, desc: null }
  }

  const payload = rawName.slice(2)
  const delimiterIndex = payload.indexOf('__')

  if (delimiterIndex === -1) {
    const title = payload.replace(/_/g, ' ').trim()
    return { label: title || rawName, title: title || rawName, desc: null }
  }

  const title = payload.slice(0, delimiterIndex).replace(/_/g, ' ').trim()
  const desc = payload.slice(delimiterIndex + 2).replace(/_/g, ' ').trim() || null
  return { label: title || rawName, title: title || rawName, desc }
}

export function buildCinematicHoverObjects(meshes) {
  return meshes.map((mesh, index) => {
    const accentColor = new THREE.Color(CINEMATIC_PALETTE[index % CINEMATIC_PALETTE.length])
    const { label, title, desc } = parseInteractiveName(mesh.name ?? `Object ${index + 1}`)

    return {
      mesh,
      renderRoot: mesh.cursorRenderRoot ?? mesh,
      geometry: mesh.geometry,
      material: mesh.material ?? null,
      accentColor,
      stride: Math.max(1, Math.floor((mesh.geometry?.attributes?.position?.count ?? 1) / 600)),
      label,
      title,
      desc,
    }
  })
}
