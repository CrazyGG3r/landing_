import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/index.js';
import { hexToRgb01 } from '../storage.js';
import { SHAPE_TYPES, BLEND_MODES, normalizeSubjectConfig } from '../shaders/subjects/index.js';

const MAX_SUBJECTS = 8;

const defaultSubjectFromLayers = layers => ({
  type: SHAPE_TYPES.STAR,
  pos: [0.5, 0.5],
  scale: [1.0, 1.0],
  rotation: 0,
  size: 1.0,
  roundness: 1.0,
  opacity: 1.0,
  blendMode: BLEND_MODES.NORMAL,
  z: 0,
  visible: true,
  animType: 0,
  animSpeed: 0,
  layerA: { ...layers[0] },
  layerB: { ...layers[1] },
  layerC: { ...layers[2] },
});

function buildSubjectList(subjects, layers) {
  const fallback = defaultSubjectFromLayers(layers);
  const source = Array.isArray(subjects) && subjects.length > 0 ? subjects : [fallback];
  return source.slice(0, MAX_SUBJECTS).map(subject => normalizeSubjectConfig(subject, fallback));
}

export const ShapeBlur = ({
  layers,
  subjects,
  debugSubjects = false,
  followMouse,
  trackPointer = true,
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
      followMouse,
      subjects,
      debugSubjects,
      impactSize, impactEdge,
      noiseEnabled, noiseIntensity,
      smokeEnabled, smokeIntensity,
      ditherEnabled, ditherIntensity,
    };
  }, [layers, followMouse, subjects, debugSubjects, impactSize, impactEdge, noiseEnabled, noiseIntensity, smokeEnabled, smokeIntensity, ditherEnabled, ditherIntensity]);

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
    const subjectList = buildSubjectList(stateRef.current.subjects, stateRef.current.layers ?? layers);

    const type = new Int32Array(MAX_SUBJECTS);
    const pos = Array.from({ length: MAX_SUBJECTS }, () => new THREE.Vector2(0.5, 0.5));
    const scale = Array.from({ length: MAX_SUBJECTS }, () => new THREE.Vector2(1, 1));
    const rotation = new Float32Array(MAX_SUBJECTS);
    const size = new Float32Array(MAX_SUBJECTS);
    const roundness = new Float32Array(MAX_SUBJECTS);
    const opacity = new Float32Array(MAX_SUBJECTS);
    const blendMode = new Int32Array(MAX_SUBJECTS);
    const z = new Float32Array(MAX_SUBJECTS);
    const visible = new Float32Array(MAX_SUBJECTS);
    const colorA = Array.from({ length: MAX_SUBJECTS }, () => new THREE.Vector3());
    const colorB = Array.from({ length: MAX_SUBJECTS }, () => new THREE.Vector3());
    const colorC = Array.from({ length: MAX_SUBJECTS }, () => new THREE.Vector3());
    const spreadA = new Float32Array(MAX_SUBJECTS);
    const spreadB = new Float32Array(MAX_SUBJECTS);
    const spreadC = new Float32Array(MAX_SUBJECTS);
    const intensityA = new Float32Array(MAX_SUBJECTS);
    const intensityB = new Float32Array(MAX_SUBJECTS);
    const intensityC = new Float32Array(MAX_SUBJECTS);
    const animTime = new Float32Array(MAX_SUBJECTS);
    const animType = new Int32Array(MAX_SUBJECTS);
    const animSpeed = new Float32Array(MAX_SUBJECTS);

    subjectList.forEach((subject, i) => {
      const [aR, aG, aB] = hexToRgb01((subject.layerA ?? layers[0]).color);
      const [bR, bG, bB] = hexToRgb01((subject.layerB ?? layers[1]).color);
      const [cR, cG, cB] = hexToRgb01((subject.layerC ?? layers[2]).color);

      type[i] = subject.type;
      pos[i].set(subject.pos?.[0] ?? 0.5, subject.pos?.[1] ?? 0.5);
      scale[i].set(subject.scale?.[0] ?? 1, subject.scale?.[1] ?? 1);
      rotation[i] = subject.rotation ?? 0;
      size[i] = subject.size ?? 1.0;
      roundness[i] = subject.roundness ?? 1.0;
      opacity[i] = subject.opacity ?? 1.0;
      blendMode[i] = subject.blendMode ?? BLEND_MODES.NORMAL;
      z[i] = subject.z ?? 0;
      visible[i] = subject.visible === false ? 0 : 1;

      colorA[i].set(aR, aG, aB);
      colorB[i].set(bR, bG, bB);
      colorC[i].set(cR, cG, cB);
      spreadA[i] = subject.layerA?.spread ?? layers[0].spread;
      spreadB[i] = subject.layerB?.spread ?? layers[1].spread;
      spreadC[i] = subject.layerC?.spread ?? layers[2].spread;
      intensityA[i] = subject.layerA?.intensity ?? layers[0].intensity;
      intensityB[i] = subject.layerB?.intensity ?? layers[1].intensity;
      intensityC[i] = subject.layerC?.intensity ?? layers[2].intensity;
      animType[i] = subject.animType ?? 0;
      animSpeed[i] = subject.animSpeed ?? 0;
    });

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
        u_debugSubjects: { value: stateRef.current.debugSubjects ? 1 : 0 },
        u_subjectCount: { value: subjectList.length },
        u_subjectType: { value: type },
        u_subjectPos: { value: pos },
        u_subjectScale: { value: scale },
        u_subjectRotation: { value: rotation },
        u_subjectSize: { value: size },
        u_subjectRoundness: { value: roundness },
        u_subjectOpacity: { value: opacity },
        u_subjectBlendMode: { value: blendMode },
        u_subjectZ: { value: z },
        u_subjectVisible: { value: visible },
        u_subjectColorA: { value: colorA },
        u_subjectColorB: { value: colorB },
        u_subjectColorC: { value: colorC },
        u_subjectSpreadA: { value: spreadA },
        u_subjectSpreadB: { value: spreadB },
        u_subjectSpreadC: { value: spreadC },
        u_subjectIntensityA: { value: intensityA },
        u_subjectIntensityB: { value: intensityB },
        u_subjectIntensityC: { value: intensityC },
        u_animTime: { value: animTime },
        u_animType: { value: animType },
        u_animSpeed: { value: animSpeed },
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
    
    if (trackPointer) {
      mount.addEventListener('mousemove', onMove, { passive: true });
      mount.addEventListener('pointermove', onMove, { passive: true });
      mount.addEventListener('touchmove', onMove, { passive: true });
    }

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
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resize);
      ro.observe(mount);
    } else {
      window.addEventListener('resize', resize);
    }

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
      material.uniforms.u_debugSubjects.value = sr.debugSubjects ? 1 : 0;

      const currentLayers = sr.layers ?? layers;
      const activeSubjects = buildSubjectList(sr.subjects, currentLayers);
      material.uniforms.u_subjectCount.value = activeSubjects.length;
      activeSubjects.forEach((subject, i) => {
        material.uniforms.u_subjectType.value[i] = subject.type;
        material.uniforms.u_subjectPos.value[i].set(subject.pos?.[0] ?? 0.5, subject.pos?.[1] ?? 0.5);
        material.uniforms.u_subjectScale.value[i].set(subject.scale?.[0] ?? 1, subject.scale?.[1] ?? 1);
        material.uniforms.u_subjectRotation.value[i] = subject.rotation ?? 0;
        material.uniforms.u_subjectSize.value[i] = subject.size ?? 1.0;
        material.uniforms.u_subjectRoundness.value[i] = subject.roundness ?? 1.0;
        material.uniforms.u_subjectOpacity.value[i] = subject.opacity ?? 1.0;
        material.uniforms.u_subjectBlendMode.value[i] = subject.blendMode ?? BLEND_MODES.NORMAL;
        material.uniforms.u_subjectZ.value[i] = subject.z ?? 0;
        material.uniforms.u_subjectVisible.value[i] = subject.visible === false ? 0 : 1;
        material.uniforms.u_animTime.value[i] = time;
        material.uniforms.u_animType.value[i] = subject.animType ?? 0;
        material.uniforms.u_animSpeed.value[i] = subject.animSpeed ?? 0;

        const [aR, aG, aB] = hexToRgb01((subject.layerA ?? currentLayers[0]).color);
        const [bR, bG, bB] = hexToRgb01((subject.layerB ?? currentLayers[1]).color);
        const [cR, cG, cB] = hexToRgb01((subject.layerC ?? currentLayers[2]).color);
        material.uniforms.u_subjectColorA.value[i].set(aR, aG, aB);
        material.uniforms.u_subjectColorB.value[i].set(bR, bG, bB);
        material.uniforms.u_subjectColorC.value[i].set(cR, cG, cB);
        material.uniforms.u_subjectSpreadA.value[i] = subject.layerA?.spread ?? currentLayers[0].spread;
        material.uniforms.u_subjectSpreadB.value[i] = subject.layerB?.spread ?? currentLayers[1].spread;
        material.uniforms.u_subjectSpreadC.value[i] = subject.layerC?.spread ?? currentLayers[2].spread;
        material.uniforms.u_subjectIntensityA.value[i] = subject.layerA?.intensity ?? currentLayers[0].intensity;
        material.uniforms.u_subjectIntensityB.value[i] = subject.layerB?.intensity ?? currentLayers[1].intensity;
        material.uniforms.u_subjectIntensityC.value[i] = subject.layerC?.intensity ?? currentLayers[2].intensity;
      });
      
      renderer.render(scene, camera);
      animId = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animId);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', resize);
      if (trackPointer) {
        mount.removeEventListener('mousemove', onMove);
        mount.removeEventListener('pointermove', onMove);
        mount.removeEventListener('touchmove', onMove);
      }
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hot-update layer uniforms
  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    ['A', 'B', 'C'].forEach((k, i) => {
      const [r, g, b] = hexToRgb01(layers[i].color);
      m.uniforms[`u_color${k}`].value.set(r, g, b);
      m.uniforms[`u_spread${k}`].value = layers[i].spread;
      m.uniforms[`u_intensity${k}`].value = layers[i].intensity;
    });
  }, [layers]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};
