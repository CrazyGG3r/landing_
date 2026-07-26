import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GL_FRAG, GL_VERT } from '../../home/three/shaders';

/**
 * A beveled slab of the same glass the landing page's FluidGlass is made of,
 * floating behind the sign-in card. It samples the ColorBends backdrop canvas
 * as its refraction buffer, so the field genuinely bends through the panel
 * rather than being faked with a blur.
 */

function roundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

const CAMERA_DISTANCE = 6;
const CAMERA_FOV = 32;
const MAX_TILT = 0.13; // radians — small enough that the DOM card stays aligned

const GlassSlab = memo(function GlassSlab({
  backdropRef,
  pointerRef,
  cardWidth,
  cardHeight,
  cornerRadius = 34,
  bleed = 30,
}) {
  const mountRef = useRef(null);
  const sizeRef = useRef({ cardWidth, cardHeight, cornerRadius, bleed });
  const rebuildRef = useRef(null);

  // Card metrics change on resize and on font swap; keep them out of the main
  // effect's deps so a layout nudge reshapes the slab instead of tearing down
  // and rebuilding the whole GL context.
  useEffect(() => {
    sizeRef.current = { cardWidth, cardHeight, cornerRadius, bleed };
    rebuildRef.current?.();
  }, [cardWidth, cardHeight, cornerRadius, bleed]);

  useEffect(() => {
    const mount = mountRef.current;
    const backdrop = backdropRef?.current;
    if (!mount || !backdrop) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      console.warn('GlassSlab: WebGL unavailable, falling back to flat card.', error);
      return undefined;
    }

    const constrained = window.matchMedia(
      '(max-width: 800px), (pointer: coarse), (hover: none)',
    ).matches;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, constrained ? 1 : 1.75),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = CAMERA_DISTANCE;

    const backdropTexture = new THREE.CanvasTexture(backdrop);
    backdropTexture.minFilter = THREE.LinearFilter;
    backdropTexture.magFilter = THREE.LinearFilter;

    const material = new THREE.ShaderMaterial({
      vertexShader: GL_VERT,
      fragmentShader: GL_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uBuffer: { value: backdropTexture },
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uIOR: { value: 1.22 },
        uChroma: { value: 0.34 },
        uFrost: { value: 0.62 },
        uSmoke: { value: 0.3 },
        uRoughness: { value: 0.16 },
        uFresnel: { value: 2.1 },
        uRimIntensity: { value: 0.85 },
        uRimPower: { value: 3.4 },
        uRimStart: { value: 0.42 },
      },
    });

    let mesh = null;
    let geometry = null;

    /** World units per CSS pixel, so the slab lines up with the DOM card. */
    const worldPerPixel = () =>
      (2 * CAMERA_DISTANCE * Math.tan((CAMERA_FOV * Math.PI) / 360)) / window.innerHeight;

    const buildMesh = () => {
      const { cardWidth: w, cardHeight: h, cornerRadius: r, bleed: b } = sizeRef.current;
      if (!w || !h) return;

      const unit = worldPerPixel();
      const width = (w + b * 2) * unit;
      const height = (h + b * 2) * unit;

      geometry?.dispose();
      geometry = new THREE.ExtrudeGeometry(
        roundedRectShape(width, height, (r + b) * unit),
        {
          depth: 0.16,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: constrained ? 3 : 6,
          curveSegments: constrained ? 16 : 28,
        },
      );
      geometry.center();

      if (mesh) {
        mesh.geometry = geometry;
      } else {
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      }
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      const target = renderer.getDrawingBufferSize(new THREE.Vector2());
      material.uniforms.uRes.value.set(target.x, target.y);
      buildMesh();
    };
    resize();
    window.addEventListener('resize', resize);
    rebuildRef.current = buildMesh;

    const start = performance.now();
    const tilt = { x: 0, y: 0 };
    let frame;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || !mesh) return;

      const elapsed = (performance.now() - start) / 1000;
      const pointer = pointerRef?.current ?? { x: 0, y: 0 };

      tilt.x += (-pointer.y * MAX_TILT - tilt.x) * 0.06;
      tilt.y += (pointer.x * MAX_TILT - tilt.y) * 0.06;

      mesh.rotation.x = tilt.x + Math.sin(elapsed * 0.4) * 0.012;
      mesh.rotation.y = tilt.y + Math.cos(elapsed * 0.32) * 0.014;
      mesh.position.y = Math.sin(elapsed * 0.55) * 0.018;

      material.uniforms.uTime.value = elapsed;
      backdropTexture.needsUpdate = true;

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      rebuildRef.current = null;
      window.removeEventListener('resize', resize);
      geometry?.dispose();
      material.dispose();
      backdropTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [backdropRef, pointerRef]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
    />
  );
});

export default GlassSlab;
