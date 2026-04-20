// MetaCursor.jsx (corrected)
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// --- Shaders (unchanged) ---
const ID_VERTEX_SHADER = `uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`
const ID_FRAGMENT_SHADER = `precision mediump float;uniform float u_id;void main(){gl_FragColor=vec4(u_id,0.,0.,1.);}`
const BLOB_VERTEX_SHADER = `void main(){gl_Position=vec4(position.xy,0.,1.);}`
const BLOB_FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_res;uniform vec3 u_blobs[8];uniform int u_count;uniform float u_k;uniform float u_edge;
uniform float u_alpha;uniform float u_time;uniform float u_pulseScale;
uniform vec3 u_blobColors[8];uniform vec3 u_cursorColor;uniform vec3 u_hoverColor;uniform float u_hoverMix;
uniform int u_activeIdx;uniform sampler2D tScene;uniform float u_trigNoise;
uniform float u_noiseScale;uniform float u_chromStr;uniform int u_ghostCount;uniform float u_ghostRadius;
uniform float u_ghostAlpha;uniform float u_lightness;uniform float u_breathe;uniform float u_curl;
uniform float u_prism;uniform vec3 u_ripples[6];
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=noise(p)*a;p*=2.1;a*=.5;}return s;}
vec2 curl(vec2 p){float e=.01;return vec2((fbm(p+vec2(e,0.))-fbm(p-vec2(e,0.)))/(2.*e),-(fbm(p+vec2(0.,e))-fbm(p-vec2(0.,e)))/(2.*e));}
float sdf(vec2 uv,float na){float f=1e9;for(int i=0;i<8;i++){if(i>=u_count)break;float d=length(uv-u_blobs[i].xy)-u_blobs[i].z*u_breathe;f=smin(f,d,u_k*u_blobs[0].z);}return f+na;}
void main(){
  vec2 uv=gl_FragCoord.xy;
  vec3 scene=texture2D(tScene,uv/u_res).rgb;
  float baseF=sdf(uv,0.);
  float baseIns=1.-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,baseF);
  vec2 co=curl(uv*u_noiseScale*.5+u_time*.1)*u_curl*u_alpha;
  float nAmt=fbm((uv+co)*u_noiseScale+u_time*.2)*u_trigNoise*u_alpha;
  float trigIns=1.-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,sdf(uv+co,nAmt));
  float ghostIns=0.;
  if(u_alpha>0.){for(int g=0;g<4;g++){if(g>=u_ghostCount)break;float ang=float(g)*6.28318/float(u_ghostCount)+u_time*1.8;float gr=u_ghostRadius*(.6+.4*sin(float(g)*1.7+u_time*2.5));vec2 off=vec2(cos(ang),sin(ang))*gr;float gf=sdf(uv-off,fbm((uv-off)*u_noiseScale+u_time*.2)*u_trigNoise*u_alpha);ghostIns=min(1.,ghostIns+(1.-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,gf))*u_ghostAlpha*u_alpha);}}
  float ins=min(1.,baseIns+(trigIns-baseIns)*u_alpha+ghostIns);
  float ripGlow=0.;for(int r=0;r<6;r++){if(u_ripples[r].x<0.)continue;ripGlow+=smoothstep(3.,0.,abs(baseF-u_ripples[r].x))*u_ripples[r].y;}
  vec3 tgt=u_activeIdx>=0?u_blobColors[u_activeIdx]:u_cursorColor;
  tgt=mix(tgt,u_hoverColor,clamp(u_hoverMix,0.,1.));
  vec3 blobCol=mix(mix(tgt,vec3(1.),u_lightness),tgt,u_alpha)*u_pulseScale;
  float et=smoothstep(0.,.3,ins)*(1.-smoothstep(.7,1.,ins));
  vec3 prism=(vec3(.9,.2,.1)+vec3(.1,.9,.2)*.8+vec3(.1,.2,.9)*.6)*et*u_prism*u_alpha;
  vec3 fs=scene;
  if(u_alpha>0.&&u_chromStr>0.){vec2 rd=length(uv-u_blobs[0].xy)>.001?normalize(uv-u_blobs[0].xy):vec2(1,0);float cs=u_chromStr*ins*u_alpha;fs=vec3(texture2D(tScene,(uv+rd*cs)/u_res).r,scene.g,texture2D(tScene,(uv-rd*cs*.7)/u_res).b);}
  vec3 res=mix(fs,mix(fs,blobCol,ins),1.-u_alpha);res=mix(res,1.-fs,ins*u_alpha);res+=prism*(1.-res);res=mix(res,vec3(.95,.85,1.),ripGlow*.4*u_alpha);
  gl_FragColor=vec4(res,1.);
}`

// --- Default configuration ---
export const DEFAULT_CFG = {
  trailCount: 3,
  sizes: [18, 38, 22],
  fastDur: 110,
  slowDur: 750,
  smin_k: 0.22,
  edgeSoftness: 0.0006,
  dwellMs: 900,
  fadeInMs: 500,
  fadeOutMs: 140,
  reanchorMs: 110,
  idRes: 256,
  margin: 1.2,
  pulseScale: 1.28,
  pulseDuration: 380,
  baseAlpha: 0.28,
  triggeredNoiseStrength: 90,
  lightness: 0.65,
  untriggeredSizeScale: 0.72,
  blobNoiseScale: 0.028,
  chromaticStrength: 2.2,
  ghostCount: 4,
  ghostRadius: 14,
  ghostAlphaFactor: 0.55,
  rippleCount: 3,
  breatheAmp: 0.06,
  breatheFreq: 0.9,
  curlStrength: 18,
  prismStrength: 0.7,
  hoverTintColor: 0x9fe8ff,
  hoverTintMix: 0.78,
  preWrapMs: 260,
  preWrapScale: 1.58,
  preWrapEasePower: 3,
}

// --- Helper functions (unchanged) ---
function normalizeNameCollection(values) {
  if (!values) return null
  return values instanceof Set ? values : new Set(values)
}

function createBlobColor(index) {
  const color = new THREE.Color()
  color.setHSL((index * 0.17) % 1, 0.72, 0.56)
  return color
}

function getDisplayName(name, fallbackIndex) {
  if (!name) return `Object ${fallbackIndex + 1}`
  return name.replace(/[_-]+/g, ' ').trim() || `Object ${fallbackIndex + 1}`
}

export function extractSceneObjects(scene, options = {}) {
  const ignoredNames = normalizeNameCollection(options.ignoredNames) ?? new Set()
  const includeNames = normalizeNameCollection(options.includeNames)
  const description = options.description ?? 'Interactive mesh in the portfolio scene.'
  const maxObjects = Math.max(1, options.maxObjects ?? 4)
  const maxProjectionSamples = Math.max(1, options.maxProjectionSamples ?? 180)
  const maxVertexCount = Math.max(1, options.maxVertexCount ?? 12000)
  const objects = []

  scene.traverse((child) => {
    if (objects.length >= maxObjects) return
    if (!child.isMesh || !child.geometry || ignoredNames.has(child.name)) return
    if (includeNames && !includeNames.has(child.name)) return
    if (child.visible === false || child.material?.visible === false) return

    const positionAttr = child.geometry.attributes?.position
    const vertexCount = positionAttr?.count ?? 0
    if (!includeNames && vertexCount > maxVertexCount) return

    const baseColor = child.material?.color?.clone?.() ?? new THREE.Color(0.75, 0.78, 0.88)
    const activeColor = baseColor.clone().offsetHSL(0, 0, 0.12)
    const stride = Math.max(1, Math.ceil(vertexCount / maxProjectionSamples))

    objects.push({
      mesh: child,
      geometry: child.geometry,
      blobColor: createBlobColor(objects.length),
      colorA: baseColor,
      colorB: activeColor,
      material: child.material,
      wireframe: null,
      stride,
      label: getDisplayName(child.name, objects.length),
      title: getDisplayName(child.name, objects.length),
      desc: description,
    })
  })

  return objects
}

// --- Cursor state machine (unchanged) ---
function createCursorState(cfg) {
  const { trailCount, fastDur, slowDur, fadeInMs, fadeOutMs, reanchorMs, dwellMs, baseAlpha } = cfg
  const trail = Array.from({ length: trailCount }, () => ({ x: -999, y: -999 }))
  const goal = { x: -999, y: -999 }
  const ripples = Array.from({ length: cfg.rippleCount * 2 }, () => ({ r: -1, str: 0 }))
  let alpha = baseAlpha
  let anchor = 0
  let progress = 0
  let fadeTgt = baseAlpha
  let anchorTgt = 0
  let activeId = 0
  let pulseScale = 1
  let preWrap = 0
  let preWrapFrom = 0
  let preWrapTo = 0
  let preWrapProg = 0
  let lerpRaf = null
  let fadeRaf = null
  let preWrapRaf = null
  let dwellTimer = null
  let pulseTimer = null
  let lerpLast = null
  let fadeLast = null
  let preWrapLast = null
  const easeBack = (t) => {
    const c2 = 1.70158 * 2.525
    return t < 0.5
      ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2
  }
  const easeOut = (t, p = 3) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), p)

  function lerpTick(now) {
    const dt = Math.min(lerpLast ? now - lerpLast : 16, 64)
    lerpLast = now
    let moving = false

    for (let i = 0; i < trailCount; i++) {
      const g = i === trailCount - 1 ? goal : trail[i + 1]
      const a = 1 - Math.exp(-dt / ((i === trailCount - 1 ? fastDur : slowDur) * 0.25))
      trail[i].x += (g.x - trail[i].x) * a
      trail[i].y += (g.y - trail[i].y) * a
      if (Math.abs(g.x - trail[i].x) > 0.05 || Math.abs(g.y - trail[i].y) > 0.05) moving = true
    }

    lerpRaf = moving ? requestAnimationFrame(lerpTick) : (lerpLast = null)
  }

  function fadeTick(now) {
    const dt = Math.min(fadeLast ? now - fadeLast : 16, 64)
    fadeLast = now
    const entering = fadeTgt > 0.5
    const dir = entering ? 1 : -1
    progress = Math.min(1, Math.max(0, progress + dir * dt / (entering ? fadeInMs : fadeOutMs)))
    alpha = entering ? Math.max(baseAlpha, easeBack(progress)) : Math.min(1, baseAlpha + progress * (1 - baseAlpha))
    anchor = Math.min(1, Math.max(0, anchor + Math.sign(anchorTgt - anchor) * dt / (entering ? fadeInMs : reanchorMs)))

    if (progress > 0 && progress < 1) {
      fadeRaf = requestAnimationFrame(fadeTick)
    } else {
      alpha = fadeTgt
      anchor = anchorTgt
      fadeRaf = null
      fadeLast = null
    }
  }

  function preWrapTick(now) {
    const dt = Math.min(preWrapLast ? now - preWrapLast : 16, 64)
    preWrapLast = now
    preWrapProg = Math.min(1, preWrapProg + dt / cfg.preWrapMs)
    preWrap = preWrapFrom + (preWrapTo - preWrapFrom) * easeOut(preWrapProg, cfg.preWrapEasePower)
    if (preWrapProg < 1) {
      preWrapRaf = requestAnimationFrame(preWrapTick)
    } else {
      preWrap = preWrapTo
      preWrapRaf = null
      preWrapLast = null
    }
  }

  const startFade = (a, anc = a) => {
    fadeTgt = a
    anchorTgt = anc
    if (!fadeRaf) fadeRaf = requestAnimationFrame(fadeTick)
  }

  const startPreWrap = (t) => {
    if (Math.abs(preWrap - t) < 0.001 && !preWrapRaf) return
    if (preWrapRaf) cancelAnimationFrame(preWrapRaf)
    preWrapFrom = preWrap
    preWrapTo = t
    preWrapProg = 0
    preWrapLast = null
    preWrapRaf = requestAnimationFrame(preWrapTick)
  }

  function spawnRipples() {
    for (let i = 0; i < cfg.rippleCount; i++) {
      ripples[i % ripples.length] = { r: 0, str: 1, speed: 120 + i * 60, t0: performance.now() }
    }
  }

  function triggerPulse() {
    if (pulseTimer) cancelAnimationFrame(pulseTimer)
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / cfg.pulseDuration)
      pulseScale = 1 + (cfg.pulseScale - 1) * (1 - t)
      if (t < 1) pulseTimer = requestAnimationFrame(tick)
      else {
        pulseScale = 1
        pulseTimer = null
      }
    }
    pulseTimer = requestAnimationFrame(tick)
    spawnRipples()
  }

  return {
    get trail() { return trail },
    get alpha() { return alpha },
    get anchor() { return anchor },
    get activeId() { return activeId },
    get preWrap() { return preWrap },
    get pulseScale() { return pulseScale },
    get ripples() { return ripples },
    moveTo(x, y) {
      goal.x = x
      goal.y = y
      if (!lerpRaf) lerpRaf = requestAnimationFrame(lerpTick)
    },
    setHoveredId(id) {
      if (id === activeId) return
      if (dwellTimer) clearTimeout(dwellTimer)
      activeId = id
      if (!id) {
        startPreWrap(0)
        startFade(baseAlpha, 0)
        return
      }
      startPreWrap(1)
      startFade(baseAlpha, 0)
      dwellTimer = setTimeout(() => {
        startFade(1, 1)
        triggerPulse()
        dwellTimer = null
      }, dwellMs)
    },
    forceLeave() {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (pulseTimer) cancelAnimationFrame(pulseTimer)
      activeId = 0
      pulseScale = 1
      startPreWrap(0)
      startFade(baseAlpha, 0)
    },
    updateRipples(now) {
      for (const rp of ripples) {
        if (rp.r < 0) continue
        const e = (now - rp.t0) * 0.001
        rp.r = e * rp.speed
        rp.str = Math.max(0, 1 - e * 1.2)
        if (rp.str <= 0) rp.r = -1
      }
    },
    dispose() {
      ;[lerpRaf, fadeRaf, preWrapRaf, pulseTimer].forEach((r) => r && cancelAnimationFrame(r))
      if (dwellTimer) clearTimeout(dwellTimer)
    },
  }
}

// --- Projector (unchanged) ---
const TMP_WORLD = new THREE.Vector3()
const TMP_NDC = new THREE.Vector3()

function createProjector(stride = 3) {
  let cache = null
  const lastPos = new THREE.Vector3()
  let dirty = 0

  return {
    project(mesh, geo, camera, width, height) {
      mesh.updateWorldMatrix(true, false)
      const wp = mesh.getWorldPosition(new THREE.Vector3())
      if (wp.distanceTo(lastPos) > 0.001 || dirty++ % 4 === 0) {
        lastPos.copy(wp)
        const mw = mesh.matrixWorld
        const pos = geo.attributes.position
        const count = pos.count
        let minX = Infinity
        let maxX = -Infinity
        let minY = Infinity
        let maxY = -Infinity
        let visibleSamples = 0

        for (let i = 0; i < count; i += stride) {
          TMP_WORLD.fromBufferAttribute(pos, i).applyMatrix4(mw)
          TMP_NDC.copy(TMP_WORLD).project(camera)
          if (TMP_NDC.z > 1) continue
          const sx = (TMP_NDC.x * 0.5 + 0.5) * width
          const sy = (1 - (TMP_NDC.y * 0.5 + 0.5)) * height
          if (sx < minX) minX = sx
          if (sx > maxX) maxX = sx
          if (sy < minY) minY = sy
          if (sy > maxY) maxY = sy
          visibleSamples++
        }

        cache = visibleSamples === 0
          ? { cx: width / 2, cy: height / 2, r: 40 }
          : { cx: (minX + maxX) * 0.5, cy: (minY + maxY) * 0.5, r: Math.hypot(maxX - minX, maxY - minY) * 0.5 }
      }
      return cache
    },
    invalidate() {
      dirty = 0
    },
  }
}

// --- Blob pipeline (unchanged) ---
function createBlobPipeline(renderer, camera, objects, cfg) {
  const el = renderer.domElement
  const initialWidth = el.width
  const initialHeight = el.height
  const trackedObjects = objects.slice(0, 8)
  const rtID = new THREE.WebGLRenderTarget(cfg.idRes, cfg.idRes, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.UnsignedByteType,
  })
  const idScene = new THREE.Scene()
  idScene.background = new THREE.Color(0, 0, 0)
  const idMeshes = trackedObjects.map((obj, i) => {
    const mesh = new THREE.Mesh(
      obj.geometry,
      new THREE.RawShaderMaterial({
        vertexShader: ID_VERTEX_SHADER,
        fragmentShader: ID_FRAGMENT_SHADER,
        uniforms: { u_id: { value: (i + 1) / 255 } },
      })
    )
    idScene.add(mesh)
    return mesh
  })
  const rtScene = new THREE.WebGLRenderTarget(initialWidth, initialHeight, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  })
  const blobScene = new THREE.Scene()
  const blobCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const rippleUniforms = Array.from({ length: 6 }, () => new THREE.Vector3(-1, 0, 0))
  const blobColorArr = new Float32Array(
    trackedObjects.flatMap((obj) => [obj.blobColor.r, obj.blobColor.g, obj.blobColor.b]).concat(Array(Math.max(0, 24 - trackedObjects.length * 3)).fill(0))
  )
  const material = new THREE.ShaderMaterial({
    vertexShader: BLOB_VERTEX_SHADER,
    fragmentShader: BLOB_FRAGMENT_SHADER,
    uniforms: {
      u_res: { value: new THREE.Vector2(initialWidth, initialHeight) },
      u_blobs: { value: Array.from({ length: 8 }, () => new THREE.Vector3(-9999, -9999, 0)) },
      u_count: { value: Math.min(cfg.trailCount, 8) },
      u_k: { value: cfg.smin_k },
      u_edge: { value: cfg.edgeSoftness },
      u_alpha: { value: 0 },
      u_time: { value: 0 },
      u_pulseScale: { value: 1 },
      u_blobColors: { value: blobColorArr },
      u_cursorColor: { value: new THREE.Color(0xffffff) },
      u_hoverColor: { value: new THREE.Color(cfg.hoverTintColor) },
      u_hoverMix: { value: 0 },
      u_activeIdx: { value: -1 },
      u_trigNoise: { value: cfg.triggeredNoiseStrength },
      u_noiseScale: { value: cfg.blobNoiseScale },
      u_chromStr: { value: cfg.chromaticStrength },
      u_ghostCount: { value: cfg.ghostCount },
      u_ghostRadius: { value: cfg.ghostRadius },
      u_ghostAlpha: { value: cfg.ghostAlphaFactor },
      u_lightness: { value: cfg.lightness },
      u_breathe: { value: 1 },
      u_curl: { value: cfg.curlStrength },
      u_prism: { value: cfg.prismStrength },
      u_ripples: { value: rippleUniforms },
      tScene: { value: rtScene.texture },
    },
    depthTest: false,
    depthWrite: false,
  })
  blobScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))
  const projectors = trackedObjects.map((obj) => createProjector(obj.stride ?? 3))
  const smoothProj = trackedObjects.map(() => ({ cx: 0, cy: 0, r: 0, init: false }))
  let lastProj = { cx: 0, cy: 0, r: 0, id: 0 }
  const pixelBuffer = new Uint8Array(4)
  const tmpColor = new THREE.Color()

  return {
    projectors,
    render(cursorState, scene, cursorPx) {
      const now = performance.now()
      const time = now * 0.001
      const clientWidth = el.clientWidth
      const clientHeight = el.clientHeight
      const dpr = renderer.getPixelRatio()
      const renderWidth = clientWidth * dpr
      const renderHeight = clientHeight * dpr

      cursorState.updateRipples(now)

      idMeshes.forEach((mesh, i) => {
        trackedObjects[i].mesh.updateWorldMatrix(true, false)
        mesh.matrixAutoUpdate = false
        mesh.matrix.copy(trackedObjects[i].mesh.matrixWorld)
        mesh.matrixWorld.copy(trackedObjects[i].mesh.matrixWorld)
      })

      renderer.setRenderTarget(rtID)
      renderer.clear()
      renderer.render(idScene, camera)

      const sx = Math.max(0, Math.min(cfg.idRes - 1, Math.round((cursorPx.x / Math.max(clientWidth, 1)) * cfg.idRes)))
      const sy = Math.max(0, Math.min(cfg.idRes - 1, Math.round((1 - cursorPx.y / Math.max(clientHeight, 1)) * cfg.idRes)))
      renderer.readRenderTargetPixels(rtID, sx, sy, 1, 1, pixelBuffer)
      cursorState.setHoveredId(pixelBuffer[0] > trackedObjects.length ? 0 : pixelBuffer[0])

      const alpha = cursorState.alpha
      const anchor = cursorState.anchor

      trackedObjects.forEach((obj, i) => {
        const active = i === cursorState.activeId - 1
        if (obj.colorA && obj.colorB) {
          tmpColor.lerpColors(obj.colorA, obj.colorB, active ? alpha : 0)
          if (obj.material?.color) obj.material.color.copy(tmpColor)
          if (obj.material?.emissive) obj.material.emissive.setScalar(active ? alpha * 0.4 : 0)
        }
      })

      if (rtScene.width !== renderWidth || rtScene.height !== renderHeight) {
        rtScene.setSize(renderWidth, renderHeight)
        material.uniforms.u_res.value.set(renderWidth, renderHeight)
      }

      renderer.setRenderTarget(rtScene)
      renderer.clear()
      renderer.render(scene, camera)
      renderer.setRenderTarget(null)
      renderer.clearDepth()

      material.uniforms.u_alpha.value = alpha
      material.uniforms.u_activeIdx.value = cursorState.activeId > 0 ? Math.min(cursorState.activeId - 1, trackedObjects.length - 1, 7) : -1
      material.uniforms.u_hoverMix.value = (1 - anchor) * cursorState.preWrap * cfg.hoverTintMix
      material.uniforms.u_time.value = time
      material.uniforms.u_pulseScale.value = cursorState.pulseScale
      material.uniforms.u_breathe.value = 1 + Math.sin(time * cfg.breatheFreq * Math.PI * 2) * cfg.breatheAmp

      const ru = material.uniforms.u_ripples.value
      const ripples = cursorState.ripples
      for (let i = 0; i < 6; i++) {
        const rp = ripples[i % ripples.length]
        rp && rp.r >= 0 ? ru[i].set(rp.r, rp.str, 0) : ru[i].set(-1, 0, 0)
      }

      const projIdx = cursorState.activeId > 0
        ? cursorState.activeId - 1
        : alpha > cfg.baseAlpha + 0.01
          ? lastProj.id - 1
          : -1

      if (projIdx >= 0 && projIdx < trackedObjects.length) {
        const obj = trackedObjects[projIdx]
        const raw = projectors[projIdx].project(obj.mesh, obj.geometry, camera, renderWidth, renderHeight)
        const targetRadius = raw.r * cfg.margin
        const smooth = smoothProj[projIdx]
        if (!smooth.init) {
          smooth.cx = raw.cx
          smooth.cy = raw.cy
          smooth.r = targetRadius
          smooth.init = true
        }
        const lerp = 0.14
        smooth.cx += (raw.cx - smooth.cx) * lerp
        smooth.cy += (raw.cy - smooth.cy) * lerp
        smooth.r += (targetRadius - smooth.r) * lerp
      }

      let projCx = 0
      let projCy = 0
      let projR = 0

      if (cursorState.activeId > 0) {
        const smooth = smoothProj[cursorState.activeId - 1]
        projCx = smooth.cx
        projCy = smooth.cy
        projR = smooth.r
        lastProj = { cx: projCx, cy: projCy, r: projR, id: cursorState.activeId }
      } else if (alpha > cfg.baseAlpha + 0.01) {
        projCx = lastProj.cx
        projCy = lastProj.cy
        projR = lastProj.r
      }

      const blobs = material.uniforms.u_blobs.value
      const hoverBlend = THREE.MathUtils.clamp((alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha), 0, 1)
      for (let i = 0; i < cfg.trailCount; i++) {
        const point = cursorState.trail[i]
        const cx = point.x * dpr
        const cy = renderHeight - point.y * dpr
        const bx = projCx * anchor + cx * (1 - anchor)
        const by = (renderHeight - projCy) * anchor + cy * (1 - anchor)
        const baseRadius = (cfg.sizes[i] ?? cfg.sizes[0]) * dpr * 0.5
        const idleRadius = baseRadius * cfg.untriggeredSizeScale * (1 + (cfg.preWrapScale - 1) * cursorState.preWrap * (1 - anchor))
        blobs[i].set(bx, by, THREE.MathUtils.lerp(idleRadius, projR > 0 ? projR : idleRadius, hoverBlend))
      }
      for (let i = cfg.trailCount; i < 8; i++) blobs[i].set(-9999, -9999, 0)

      renderer.render(blobScene, blobCam)
    },
    dispose() {
      rtID.dispose()
      rtScene.dispose()
      material.dispose()
      idMeshes.forEach((mesh) => mesh.material.dispose())
    },
  }
}

// --- Tooltip components (unchanged) ---
function ObjectTooltip({ title, desc, x, y, color, visible, alpha }) {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)

  return (
    <div
      style={{
        position: 'absolute',
        left: x + 28,
        top: y + 28,
        pointerEvents: 'none',
        maxWidth: 220,
        opacity: visible ? alpha : 0,
        transform: `translateY(${visible ? 0 : 8}px)`,
        transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={{ display: 'inline-block', width: 18, height: 2, borderRadius: 1, background: `rgb(${r},${g},${b})`, marginBottom: 7, boxShadow: `0 0 8px rgb(${r},${g},${b})` }} />
      {title && <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: 5 }}>{title}</div>}
      {desc && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, letterSpacing: '0.01em' }}>{desc}</div>}
    </div>
  )
}

function MetaballCursorOverlay({ objects, labelState, showHint }) {
  const obj = labelState.idx >= 0 ? objects[labelState.idx] : null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {obj && (
        <ObjectTooltip
          title={obj.title}
          desc={obj.desc}
          x={labelState.x}
          y={labelState.y}
          color={obj.blobColor}
          visible={labelState.visible}
          alpha={labelState.alpha}
        />
      )}
      {showHint && (
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
          hover any object
        </div>
      )}
    </div>
  )
}

// --- Main component (fixed useFrame dependencies) ---
export function R3FMetaballCursor({ objects, config = {}, showHint = true, enabled = true, overlayRoot = null }) {
  const cfg = useMemo(() => ({ ...DEFAULT_CFG, ...config }), [config])
  const { gl: renderer, scene, camera } = useThree()
  const [labelState, setLabelState] = useState({ idx: -1, x: 0, y: 0, visible: false, alpha: 0 })
  const labelAlphaRef = useRef({ last: 0 })
  const pipelineRef = useRef(null)
  const cursorStateRef = useRef(null)
  const pointerRef = useRef({ x: -999, y: -999 })
  const hoverRef = useRef(-1)

  useEffect(() => {
    if (!enabled || !renderer || !camera || !scene || !objects?.length) return

    const el = renderer.domElement
    const trackedObjects = objects.slice(0, 8)
    const pipeline = createBlobPipeline(renderer, camera, trackedObjects, cfg)
    const cursorState = createCursorState(cfg)

    pipelineRef.current = pipeline
    cursorStateRef.current = cursorState

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      pointerRef.current.x = event.clientX - rect.left
      pointerRef.current.y = event.clientY - rect.top
      cursorState.moveTo(pointerRef.current.x, pointerRef.current.y)
    }

    const onLeave = () => {
      cursorState.forceLeave()
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cursorState.dispose()
      pipeline.dispose()
      pipelineRef.current = null
      cursorStateRef.current = null
    }
  }, [enabled, renderer, camera, scene, objects, cfg])

  useFrame(() => {
    if (!enabled || !pipelineRef.current || !cursorStateRef.current || !objects?.length) return

    const pipeline = pipelineRef.current
    const cursorState = cursorStateRef.current
    const trackedObjects = objects.slice(0, 8)

    trackedObjects.forEach((_, i) => {
      pipeline.projectors[i]?.invalidate()
    })

    pipeline.render(cursorState, scene, pointerRef.current)

    const newHover = cursorState.activeId - 1
    const currentAlpha = cursorState.anchor > 0.01
      ? Math.min(1, (cursorState.alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha))
      : 0

    if (newHover !== hoverRef.current) {
      hoverRef.current = newHover
      if (newHover >= 0 && trackedObjects[newHover]) {
        const mesh = trackedObjects[newHover].mesh
        const worldPos = mesh.getWorldPosition(new THREE.Vector3())
        const ndc = worldPos.clone().project(camera)
        const width = renderer.domElement.clientWidth
        const height = renderer.domElement.clientHeight

        setLabelState({
          idx: newHover,
          x: (ndc.x * 0.5 + 0.5) * width,
          y: (1 - (ndc.y * 0.5 + 0.5)) * height,
          visible: true,
          alpha: 0,
        })
      } else {
        setLabelState((prev) => ({ ...prev, visible: false }))
      }
    }

    if (newHover >= 0 && Math.abs(currentAlpha - labelAlphaRef.current.last) > 0.015) {
      labelAlphaRef.current.last = currentAlpha
      setLabelState((prev) => (prev.visible ? { ...prev, alpha: currentAlpha } : prev))
    }
  }, [enabled, cfg])  // ✅ FIXED: proper dependency array

  if (!overlayRoot) return null

  return createPortal(
    <MetaballCursorOverlay objects={objects.slice(0, 8)} labelState={labelState} showHint={showHint} />,
    overlayRoot
  )
}

export default R3FMetaballCursor