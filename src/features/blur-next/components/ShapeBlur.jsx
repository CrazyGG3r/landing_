import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/index.js';
import { hexToRgb01 } from '../storage.js';

const MAX_SUBJECTS = 8;
const MAX_ANIM_PATH_POINTS = 8;

function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

function createDefaultSubjects(layers) {
  const baseA = hexToRgb01(layers?.[0]?.color ?? '#ff2244');
  const baseB = hexToRgb01(layers?.[1]?.color ?? '#ffffff');
  const baseC = hexToRgb01(layers?.[2]?.color ?? '#2266ff');
  return [
    {
      type: 2,
      position: [0.36, 0.52],
      size: 1.0,
      rotation: 0.0,
      colorA: baseA, colorB: baseB, colorC: baseC,
      spreadA: layers?.[0]?.spread ?? -1.0,
      spreadB: layers?.[1]?.spread ?? 0.0,
      spreadC: layers?.[2]?.spread ?? 1.0,
      intensityA: layers?.[0]?.intensity ?? 1.0,
      intensityB: layers?.[1]?.intensity ?? 1.0,
      intensityC: layers?.[2]?.intensity ?? 1.0,
      animType: 1 | 2 | 4,
      animSpeed: 0.8,
      animPhase: 0.0,
      animAmplitude: 0.45,
      animEasing: 0,
      animLoop: 1,
      animSeed: 0.11,
      animPath: [[0, 0], [0.02, 0.02], [-0.02, -0.02], [0, 0]]
    },
    {
      type: 2,
      position: [0.5, 0.5],
      size: 1.0,
      rotation: 0.0,
      colorA: baseA, colorB: baseB, colorC: baseC,
      spreadA: layers?.[0]?.spread ?? -1.0,
      spreadB: layers?.[1]?.spread ?? 0.0,
      spreadC: layers?.[2]?.spread ?? 1.0,
      intensityA: layers?.[0]?.intensity ?? 1.0,
      intensityB: layers?.[1]?.intensity ?? 1.0,
      intensityC: layers?.[2]?.intensity ?? 1.0,
      animType: 4,
      animSpeed: 0.55,
      animPhase: 1.2,
      animAmplitude: 0.3,
      animEasing: 0,
      animLoop: 1,
      animSeed: 1.77,
      animPath: [[0, 0], [0, 0], [0, 0], [0, 0]]
    },
    {
      type: 2,
      position: [0.64, 0.48],
      size: 1.0,
      rotation: 0.0,
      colorA: baseA, colorB: baseB, colorC: baseC,
      spreadA: layers?.[0]?.spread ?? -1.0,
      spreadB: layers?.[1]?.spread ?? 0.0,
      spreadC: layers?.[2]?.spread ?? 1.0,
      intensityA: layers?.[0]?.intensity ?? 1.0,
      intensityB: layers?.[1]?.intensity ?? 1.0,
      intensityC: layers?.[2]?.intensity ?? 1.0,
      animType: 1 | 8,
      animSpeed: 0.9,
      animPhase: 2.1,
      animAmplitude: 0.35,
      animEasing: 0,
      animLoop: 1,
      animSeed: 3.4,
      animPath: [[0, 0], [0.01, -0.02], [-0.02, 0.02], [0, 0]]
    }
  ];
}

function packSubjects(subjectsInput, layers) {
  const defaults = createDefaultSubjects(layers);
  const provided = Array.isArray(subjectsInput) && subjectsInput.length > 0 ? subjectsInput : defaults;
  const count = Math.min(provided.length, MAX_SUBJECTS);
  const subjects = provided.slice(0, count);

  const types = new Int32Array(MAX_SUBJECTS);
  const positions = new Float32Array(MAX_SUBJECTS * 2);
  const sizes = new Float32Array(MAX_SUBJECTS);
  const rotations = new Float32Array(MAX_SUBJECTS);

  const colorsA = new Float32Array(MAX_SUBJECTS * 3);
  const colorsB = new Float32Array(MAX_SUBJECTS * 3);
  const colorsC = new Float32Array(MAX_SUBJECTS * 3);
  const spreadsA = new Float32Array(MAX_SUBJECTS);
  const spreadsB = new Float32Array(MAX_SUBJECTS);
  const spreadsC = new Float32Array(MAX_SUBJECTS);
  const intensitiesA = new Float32Array(MAX_SUBJECTS);
  const intensitiesB = new Float32Array(MAX_SUBJECTS);
  const intensitiesC = new Float32Array(MAX_SUBJECTS);

  const animTime = new Float32Array(MAX_SUBJECTS);
  const animType = new Int32Array(MAX_SUBJECTS);
  const animSpeed = new Float32Array(MAX_SUBJECTS);
  const animPhase = new Float32Array(MAX_SUBJECTS);
  const animAmplitude = new Float32Array(MAX_SUBJECTS);
  const animPath = new Float32Array(MAX_SUBJECTS * MAX_ANIM_PATH_POINTS * 2);
  const animEasing = new Int32Array(MAX_SUBJECTS);
  const animLoop = new Int32Array(MAX_SUBJECTS);
  const animSeed = new Float32Array(MAX_SUBJECTS);

  for (let i = 0; i < count; i += 1) {
    const s = subjects[i] ?? {};
    const pos = s.position ?? [0.5, 0.5];
    const type = Math.max(0, Math.min(3, Math.floor(s.type ?? 2)));
    const size = s.size ?? 1.0;
    const rot = s.rotation ?? 0.0;

    const layerA = hexToRgb01(layers?.[0]?.color ?? '#ff2244');
    const layerB = hexToRgb01(layers?.[1]?.color ?? '#ffffff');
    const layerC = hexToRgb01(layers?.[2]?.color ?? '#2266ff');
    const cA = s.colorA ?? layerA;
    const cB = s.colorB ?? layerB;
    const cC = s.colorC ?? layerC;

    types[i] = type;
    positions[i * 2] = clamp01(pos[0] ?? 0.5);
    positions[i * 2 + 1] = clamp01(pos[1] ?? 0.5);
    sizes[i] = size;
    rotations[i] = rot;

    colorsA.set(cA, i * 3);
    colorsB.set(cB, i * 3);
    colorsC.set(cC, i * 3);
    spreadsA[i] = s.spreadA ?? layers?.[0]?.spread ?? -1.0;
    spreadsB[i] = s.spreadB ?? layers?.[1]?.spread ?? 0.0;
    spreadsC[i] = s.spreadC ?? layers?.[2]?.spread ?? 1.0;
    intensitiesA[i] = s.intensityA ?? layers?.[0]?.intensity ?? 1.0;
    intensitiesB[i] = s.intensityB ?? layers?.[1]?.intensity ?? 1.0;
    intensitiesC[i] = s.intensityC ?? layers?.[2]?.intensity ?? 1.0;

    animTime[i] = s.animTime ?? 0.0;
    animType[i] = s.animType ?? 0;
    animSpeed[i] = s.animSpeed ?? 0.0;
    animPhase[i] = s.animPhase ?? 0.0;
    animAmplitude[i] = s.animAmplitude ?? 0.0;
    animEasing[i] = s.animEasing ?? 0;
    animLoop[i] = s.animLoop ?? 0;
    animSeed[i] = s.animSeed ?? (i * 1.271 + 0.37);

    const path = Array.isArray(s.animPath) ? s.animPath : [];
    for (let p = 0; p < MAX_ANIM_PATH_POINTS; p += 1) {
      const pt = path[p] ?? [0, 0];
      const idx = (i * MAX_ANIM_PATH_POINTS + p) * 2;
      animPath[idx] = pt[0] ?? 0;
      animPath[idx + 1] = pt[1] ?? 0;
    }
  }

  return {
    count,
    types,
    positions,
    sizes,
    rotations,
    colorsA,
    colorsB,
    colorsC,
    spreadsA,
    spreadsB,
    spreadsC,
    intensitiesA,
    intensitiesB,
    intensitiesC,
    animTime,
    animType,
    animSpeed,
    animPhase,
    animAmplitude,
    animPath,
    animEasing,
    animLoop,
    animSeed
  };
}

export const ShapeBlur = ({
  layers,
  subjects,
  debugMode = false,
  followMouse,
  impactSize, impactEdge,
  noiseEnabled, noiseIntensity,
  smokeEnabled, smokeIntensity,
  ditherEnabled, ditherIntensity,
}) => {
  const mountRef = useRef();
  const matRef = useRef();
  const stateRef = useRef({});

  useEffect(() => {
    stateRef.current = {
      layers,
      subjects,
      debugMode,
      followMouse,
      impactSize, impactEdge,
      noiseEnabled, noiseIntensity,
      smokeEnabled, smokeIntensity,
      ditherEnabled, ditherIntensity,
    };
  }, [layers, subjects, debugMode, followMouse, impactSize, impactEdge, noiseEnabled, noiseIntensity, smokeEnabled, smokeIntensity, ditherEnabled, ditherIntensity]);

  // Three.js init — runs once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    
    let animId, time = 0, lastTime = 0;
    const vMouse = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();
    const vShapeTarget = new THREE.Vector2(0.5, 0.5);
    const vShapeDamp = new THREE.Vector2(0.5, 0.5);
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const [rA, gA, bA] = hexToRgb01(layers[0].color);
    const [rB, gB, bB] = hexToRgb01(layers[1].color);
    const [rC, gC, bC] = hexToRgb01(layers[2].color);
    const packed = packSubjects(subjects, layers);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: 2 },
        u_shapeSize: { value: 1.0 },
        u_roundness: { value: 1.0 },
        u_borderSize: { value: 0.05 },
        u_circleSize: { value: 0.25 },
        u_circleEdge: { value: 1.0 },
        u_impactSize: { value: stateRef.current.impactSize ?? 0.25 },
        u_impactEdge: { value: stateRef.current.impactEdge ?? 1.0 },
        u_colorA: { value: new THREE.Vector3(rA, gA, bA) },
        u_colorB: { value: new THREE.Vector3(rB, gB, bB) },
        u_colorC: { value: new THREE.Vector3(rC, gC, bC) },
        u_spreadA: { value: layers[0].spread },
        u_spreadB: { value: layers[1].spread },
        u_spreadC: { value: layers[2].spread },
        u_intensityA: { value: layers[0].intensity },
        u_intensityB: { value: layers[1].intensity },
        u_intensityC: { value: layers[2].intensity },
        u_shapePos: { value: new THREE.Vector2(0.5, 0.5) },
        u_noise: { value: 0 },
        u_smoke: { value: 0 },
        u_dither: { value: 0 },
        u_time: { value: 0 },
        u_debugMode: { value: debugMode ? 1 : 0 },

        u_subjectCount: { value: packed.count },
        u_subjectTypes: { value: packed.types },
        u_subjectPositions: { value: packed.positions },
        u_subjectSizes: { value: packed.sizes },
        u_subjectRotations: { value: packed.rotations },

        u_subjectColorsA: { value: packed.colorsA },
        u_subjectColorsB: { value: packed.colorsB },
        u_subjectColorsC: { value: packed.colorsC },
        u_subjectSpreadsA: { value: packed.spreadsA },
        u_subjectSpreadsB: { value: packed.spreadsB },
        u_subjectSpreadsC: { value: packed.spreadsC },
        u_subjectIntensitiesA: { value: packed.intensitiesA },
        u_subjectIntensitiesB: { value: packed.intensitiesB },
        u_subjectIntensitiesC: { value: packed.intensitiesC },

        u_animTime: { value: packed.animTime },
        u_animType: { value: packed.animType },
        u_animSpeed: { value: packed.animSpeed },
        u_animPhase: { value: packed.animPhase },
        u_animAmplitude: { value: packed.animAmplitude },
        u_animPath: { value: packed.animPath },
        u_animEasing: { value: packed.animEasing },
        u_animLoop: { value: packed.animLoop },
        u_animSeed: { value: packed.animSeed },
      },
      transparent: true
    });

    matRef.current = material;
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const onMove = e => {
      const rect = mount.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      vMouse.set(src.clientX - rect.left, src.clientY - rect.top);
      if (stateRef.current.followMouse) {
        vShapeTarget.set(
          (src.clientX - rect.left) / rect.width,
          (src.clientY - rect.top) / rect.height
        );
      }
    };
    
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      quad.scale.set(w, h, 1);
      vResolution.set(w, h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    };
    
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const update = () => {
      time = performance.now() * 0.001;
      const dt = Math.min(time - lastTime, 0.05);
      lastTime = time;
      
      ['x', 'y'].forEach(k => {
        vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 8, dt);
      });
      
      if (!stateRef.current.followMouse) vShapeTarget.set(0.5, 0.5);
      vShapeDamp.x = THREE.MathUtils.damp(vShapeDamp.x, vShapeTarget.x, 5, dt);
      vShapeDamp.y = THREE.MathUtils.damp(vShapeDamp.y, vShapeTarget.y, 5, dt);
      material.uniforms.u_shapePos.value.set(vShapeDamp.x, vShapeDamp.y);
      
      const sr = stateRef.current;
      material.uniforms.u_impactSize.value = sr.impactSize ?? 0.25;
      material.uniforms.u_impactEdge.value = sr.impactEdge ?? 1.0;
      material.uniforms.u_noise.value = sr.noiseEnabled ? sr.noiseIntensity : 0;
      material.uniforms.u_smoke.value = sr.smokeEnabled ? (sr.smokeIntensity ?? 0.6) : 0;
      material.uniforms.u_dither.value = sr.ditherEnabled ? sr.ditherIntensity : 0;
      material.uniforms.u_time.value = time;
      material.uniforms.u_debugMode.value = sr.debugMode ? 1 : 0;

      const livePacked = packSubjects(sr.subjects, sr.layers);
      const animTime = livePacked.animTime.slice();
      for (let i = 0; i < livePacked.count; i += 1) animTime[i] = time;
      material.uniforms.u_subjectCount.value = livePacked.count;
      material.uniforms.u_subjectTypes.value = livePacked.types;
      material.uniforms.u_subjectPositions.value = livePacked.positions;
      material.uniforms.u_subjectSizes.value = livePacked.sizes;
      material.uniforms.u_subjectRotations.value = livePacked.rotations;
      material.uniforms.u_subjectColorsA.value = livePacked.colorsA;
      material.uniforms.u_subjectColorsB.value = livePacked.colorsB;
      material.uniforms.u_subjectColorsC.value = livePacked.colorsC;
      material.uniforms.u_subjectSpreadsA.value = livePacked.spreadsA;
      material.uniforms.u_subjectSpreadsB.value = livePacked.spreadsB;
      material.uniforms.u_subjectSpreadsC.value = livePacked.spreadsC;
      material.uniforms.u_subjectIntensitiesA.value = livePacked.intensitiesA;
      material.uniforms.u_subjectIntensitiesB.value = livePacked.intensitiesB;
      material.uniforms.u_subjectIntensitiesC.value = livePacked.intensitiesC;
      material.uniforms.u_animTime.value = animTime;
      material.uniforms.u_animType.value = livePacked.animType;
      material.uniforms.u_animSpeed.value = livePacked.animSpeed;
      material.uniforms.u_animPhase.value = livePacked.animPhase;
      material.uniforms.u_animAmplitude.value = livePacked.animAmplitude;
      material.uniforms.u_animPath.value = livePacked.animPath;
      material.uniforms.u_animEasing.value = livePacked.animEasing;
      material.uniforms.u_animLoop.value = livePacked.animLoop;
      material.uniforms.u_animSeed.value = livePacked.animSeed;
      
      renderer.render(scene, camera);
      animId = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onMove);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hot-update layer and subject uniforms
  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    ['A', 'B', 'C'].forEach((k, i) => {
      const [r, g, b] = hexToRgb01(layers[i].color);
      m.uniforms[`u_color${k}`].value.set(r, g, b);
      m.uniforms[`u_spread${k}`].value = layers[i].spread;
      m.uniforms[`u_intensity${k}`].value = layers[i].intensity;
    });
    const packed = packSubjects(subjects, layers);
    m.uniforms.u_subjectCount.value = packed.count;
    m.uniforms.u_subjectTypes.value = packed.types;
    m.uniforms.u_subjectPositions.value = packed.positions;
    m.uniforms.u_subjectSizes.value = packed.sizes;
    m.uniforms.u_subjectRotations.value = packed.rotations;
    m.uniforms.u_subjectColorsA.value = packed.colorsA;
    m.uniforms.u_subjectColorsB.value = packed.colorsB;
    m.uniforms.u_subjectColorsC.value = packed.colorsC;
    m.uniforms.u_subjectSpreadsA.value = packed.spreadsA;
    m.uniforms.u_subjectSpreadsB.value = packed.spreadsB;
    m.uniforms.u_subjectSpreadsC.value = packed.spreadsC;
    m.uniforms.u_subjectIntensitiesA.value = packed.intensitiesA;
    m.uniforms.u_subjectIntensitiesB.value = packed.intensitiesB;
    m.uniforms.u_subjectIntensitiesC.value = packed.intensitiesC;
    m.uniforms.u_animType.value = packed.animType;
    m.uniforms.u_animSpeed.value = packed.animSpeed;
    m.uniforms.u_animPhase.value = packed.animPhase;
    m.uniforms.u_animAmplitude.value = packed.animAmplitude;
    m.uniforms.u_animPath.value = packed.animPath;
    m.uniforms.u_animEasing.value = packed.animEasing;
    m.uniforms.u_animLoop.value = packed.animLoop;
    m.uniforms.u_animSeed.value = packed.animSeed;
  }, [layers, subjects]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};
