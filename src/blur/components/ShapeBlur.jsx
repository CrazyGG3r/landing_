import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/index.js';
import { hexToRgb01 } from '../storage.js';

export const ShapeBlur = ({
  layers,
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
      followMouse,
      impactSize, impactEdge,
      noiseEnabled, noiseIntensity,
      smokeEnabled, smokeIntensity,
      ditherEnabled, ditherIntensity,
    };
  }, [followMouse, impactSize, impactEdge, noiseEnabled, noiseIntensity, smokeEnabled, smokeIntensity, ditherEnabled, ditherIntensity]);

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