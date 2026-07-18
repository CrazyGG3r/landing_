import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { MouseContext } from '../core/mouseContextValue';
import { subscribeFrame } from '../core/frameScheduler';
import { getRenderProfile } from '../core/renderProfile';
import {
  BLOOM_RADIUS,
  BLOOM_STRENGTH,
  BLOOM_THRESHOLD,
  CHROMA_SHIFT,
  DOF_APERTURE,
  DOF_FOCUS,
  DOF_MAX_BLUR,
  FINAL_BLUR_DEFAULT,
  GHOST_GLARE_ENABLED,
  LENS_BLUR,
  MODEL_FRESNEL,
  MODEL_ROUGHNESS,
  RIM_INTENSITY,
  RIM_POWER,
  RIM_START,
  SMAA_ENABLED,
} from '../core/constants';
import { DitherNoiseShader, GhostGlareShader } from './postfx';
import { GL_FRAG, GL_VERT } from './shaders';

// Model configuration for specific models
const MODEL_CONFIGS = {
  'Suzanne.glb': {
    scale: 1.5,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  'Eva.glb': {
    scale: 1.5,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
};

const DEFAULT_MODEL_CONFIG = {
  scale: 1.5,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
};

const FluidGlass = memo(function FluidGlass({ bgCanvasRef, modelUrl, onReady }) {
  const mountRef = useRef(null);
  const mouseRef = useContext(MouseContext);
  const onReadyRef = useRef(onReady);
  const renderProfile = useMemo(getRenderProfile, []);
  const [modelConfig, setModelConfig] = useState(DEFAULT_MODEL_CONFIG);
  const [modelPath, setModelPath] = useState(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!modelUrl) {
      setModelPath(null);
      return;
    }
    const filename = modelUrl.split('/').pop();
    const config = MODEL_CONFIGS[filename] || DEFAULT_MODEL_CONFIG;
    setModelConfig(config);
    setModelPath(modelUrl);
  }, [modelUrl]);

  useEffect(() => {
    if (!modelPath) return;

    const mount = mountRef.current;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: renderProfile.antialias,
        alpha: true,
      });
    } catch (err) {
      console.warn('FluidGlass: WebGL renderer unavailable, skipping scene.', err);
      return undefined;
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, renderProfile.maxDpr),
    );
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    let composer = null;
    let renderPass = null;
    let bloomPass = null;
    let chromaPass = null;
    let ghostGlarePass = null;
    let hBlurPass = null;
    let vBlurPass = null;
    let bokehPass = null;
    let smaaPass = null;
    let finalHBlurPass = null;
    let finalVBlurPass = null;
    let ditherPass = null;
    let disposed = false;
    let blurObserver = null;
    let modelSettled = false;
    let postSettled = false;
    let readyPending = false;
    let readyNotified = false;
    const queueReadyFrame = () => {
      if (!disposed && modelSettled && postSettled) readyPending = true;
    };

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 6.5);
    const glScene = new THREE.Scene();
    const mirrorScene = new THREE.Scene();
    const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mkFBO = () => new THREE.WebGLRenderTarget(
      mount.clientWidth, mount.clientHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        samples: renderProfile.samples
      }
    );
    let fbo = mkFBO();

    const bgTex = new THREE.CanvasTexture(bgCanvasRef.current);
    bgTex.minFilter = THREE.LinearFilter;
    bgTex.magFilter = THREE.LinearFilter;
    glScene.background = bgTex;
    const mirrorGeometry = new THREE.PlaneGeometry(2, 2);
    const mirrorMaterial = new THREE.MeshBasicMaterial({ map: bgTex });
    const mirrorPlane = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
    mirrorScene.add(mirrorPlane);

    const glassMat = new THREE.ShaderMaterial({
      uniforms: {
        uBuffer: { value: fbo.texture },
        uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
        uTime: { value: 0 },
        uIOR: { value: 1.2 },
        uChroma: { value: 1.0 },
        uFrost: { value: 1.8 },
        uSmoke: { value: 0.6 },
        uRoughness: { value: MODEL_ROUGHNESS },
        uFresnel: { value: MODEL_FRESNEL },
        uRimIntensity: { value: RIM_INTENSITY },
        uRimPower: { value: RIM_POWER },
        uRimStart: { value: RIM_START },
      },
      vertexShader: GL_VERT,
      fragmentShader: GL_FRAG,
      transparent: true,
      side: THREE.FrontSide,
    });

    const glassMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 1.55, 1.55),
      glassMat,
    );
    glScene.add(glassMesh);
    let targetObject = glassMesh;
    let loadedScene = null;

    const disposeMaterial = (material) => {
      if (!material || material === glassMat) return;
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose?.();
    };

    const disposeScene = (root) => {
      root?.traverse?.((child) => {
        child.geometry?.dispose?.();
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach(disposeMaterial);
      });
    };

    import('three/examples/jsm/loaders/GLTFLoader').then(({ GLTFLoader }) => {
      const loader = new GLTFLoader();
      const onLoad = (gltf) => {
          if (disposed) {
            disposeScene(gltf.scene);
            return;
          }

          const box = new THREE.Box3().setFromObject(gltf.scene);
          const cnt = box.getCenter(new THREE.Vector3());

          gltf.scene.position.set(
            modelConfig.position.x - cnt.x,
            modelConfig.position.y - cnt.y,
            modelConfig.position.z - cnt.z
          );

          gltf.scene.scale.setScalar(modelConfig.scale);

          gltf.scene.rotation.set(
            modelConfig.rotation.x,
            modelConfig.rotation.y,
            modelConfig.rotation.z
          );

          gltf.scene.traverse(child => {
            if (child.isMesh) {
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];
              materials.forEach(disposeMaterial);
              child.material = glassMat;
            }
          });
          glScene.remove(glassMesh);
          glScene.add(gltf.scene);
          loadedScene = gltf.scene;
          targetObject = gltf.scene;
          modelSettled = true;
          queueReadyFrame();
      };
      const onError = (error) => {
        console.error('Failed to load GLB:', error);
        modelSettled = true;
        queueReadyFrame();
      };

      loader.load(modelPath, onLoad, undefined, onError);
    }).catch((error) => {
      if (!disposed) {
        console.warn('FluidGlass loader could not initialize.', error);
        modelSettled = true;
        queueReadyFrame();
      }
    });

    const envLight = new THREE.PointLight(0xffffff, 3.0, 12);
    glScene.add(envLight);

    let postReady = false;
    const initPost = async () => {
      const [
        { EffectComposer },
        { RenderPass },
        { UnrealBloomPass },
        { ShaderPass },
        { HorizontalBlurShader },
        { VerticalBlurShader },
      ] = await Promise.all([
        import('three/examples/jsm/postprocessing/EffectComposer'),
        import('three/examples/jsm/postprocessing/RenderPass'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass'),
        import('three/examples/jsm/postprocessing/ShaderPass'),
        import('three/examples/jsm/shaders/HorizontalBlurShader'),
        import('three/examples/jsm/shaders/VerticalBlurShader'),
      ]);

      if (disposed) return;

      const [{ BokehPass }, { SMAAPass }] = await Promise.all([
        renderProfile.enableDepthOfField
          ? import('three/examples/jsm/postprocessing/BokehPass')
          : Promise.resolve({ BokehPass: null }),
        SMAA_ENABLED && renderProfile.enableSmaa
          ? import('three/examples/jsm/postprocessing/SMAAPass')
          : Promise.resolve({ SMAAPass: null }),
      ]);

      if (disposed) return;

      composer = new EffectComposer(renderer);
      renderPass = new RenderPass(glScene, camera);
      composer.addPass(renderPass);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        BLOOM_STRENGTH,
        BLOOM_RADIUS,
        BLOOM_THRESHOLD
      );
      composer.addPass(bloomPass);

      if (GHOST_GLARE_ENABLED && renderProfile.level !== 'low') {
        ghostGlarePass = new ShaderPass(GhostGlareShader);
        composer.addPass(ghostGlarePass);
      }

      const chromaShader = {
        uniforms: {
          tDiffuse: { value: null },
          uAmount: { value: CHROMA_SHIFT },
          uAngle: { value: 0.6 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float uAmount;
          uniform float uAngle;
          varying vec2 vUv;
          void main(){
            vec2 dir = vec2(cos(uAngle), sin(uAngle));
            vec2 off = dir * uAmount;
            float r = texture2D(tDiffuse, vUv + off).r;
            float g = texture2D(tDiffuse, vUv).g;
            float b = texture2D(tDiffuse, vUv - off).b;
            gl_FragColor = vec4(r,g,b,1.0);
          }
        `,
      };
      chromaPass = new ShaderPass(chromaShader);
      composer.addPass(chromaPass);

      if (renderProfile.enableLensBlur) {
        hBlurPass = new ShaderPass(HorizontalBlurShader);
        vBlurPass = new ShaderPass(VerticalBlurShader);
        hBlurPass.uniforms.h.value = (LENS_BLUR / mount.clientWidth);
        vBlurPass.uniforms.v.value = (LENS_BLUR / mount.clientHeight);
        composer.addPass(hBlurPass);
        composer.addPass(vBlurPass);
      }

      if (renderProfile.enableDepthOfField) {
        bokehPass = new BokehPass(glScene, camera, {
          focus: DOF_FOCUS,
          aperture: DOF_APERTURE,
          maxblur: DOF_MAX_BLUR,
          width: mount.clientWidth,
          height: mount.clientHeight,
        });
        composer.addPass(bokehPass);
      }

      if (SMAA_ENABLED && renderProfile.enableSmaa) {
        smaaPass = new SMAAPass(mount.clientWidth, mount.clientHeight);
        composer.addPass(smaaPass);
      }

      finalHBlurPass = new ShaderPass(HorizontalBlurShader);
      finalVBlurPass = new ShaderPass(VerticalBlurShader);

      const updateBlur = () => {
        const blurValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-blur')) || FINAL_BLUR_DEFAULT;
        if (finalHBlurPass && mount.clientWidth) {
          finalHBlurPass.uniforms.h.value = blurValue / mount.clientWidth;
        }
        if (finalVBlurPass && mount.clientHeight) {
          finalVBlurPass.uniforms.v.value = blurValue / mount.clientHeight;
        }
        // --final-blur only ever animates during the preloader's ~3s window,
        // then settles permanently at FINAL_BLUR_DEFAULT — once it's there,
        // there's nothing left to observe for the rest of the page's life.
        if (blurObserver && Math.abs(blurValue - FINAL_BLUR_DEFAULT) < 0.001) {
          blurObserver.disconnect();
          blurObserver = null;
        }
      };

      blurObserver = new MutationObserver(updateBlur);
      blurObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

      composer.addPass(finalHBlurPass);
      composer.addPass(finalVBlurPass);

      ditherPass = new ShaderPass(DitherNoiseShader);
      composer.addPass(ditherPass);

      postReady = true;
      updateBlur();
      postSettled = true;
      queueReadyFrame();
    };
    initPost().catch((error) => {
      if (!disposed) {
        console.warn('FluidGlass post-processing was skipped.', error);
        postSettled = true;
        queueReadyFrame();
      }
    });

    const clock = new THREE.Clock();
    const SMOOTH_FACTOR = 0.08;
    let contextLost = false;
    const handleContextLost = (event) => {
      event.preventDefault();
      contextLost = true;
    };
    const handleContextRestored = () => {
      contextLost = false;
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const loop = () => {
      if (contextLost) return;
      const t = clock.getElapsedTime();

      const mx = mouseRef.current?.x ?? 0;
      const my = mouseRef.current?.y ?? 0;

      targetRotation.current = {
        x: my * 0.8,
        y: mx * 0.8
      };

      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * SMOOTH_FACTOR;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * SMOOTH_FACTOR;

      if (targetObject) {
        targetObject.rotation.x = currentRotation.current.x;
        targetObject.rotation.y = currentRotation.current.y;
      }

      glassMesh.position.y = Math.sin(t * 0.5) * 0.06;

      envLight.position.set(Math.sin(t * 0.3) * 4, 2.5, Math.cos(t * 0.3) * 3);

      glassMat.uniforms.uTime.value = t;
      if (ditherPass) ditherPass.uniforms.uTime.value = t;

      bgTex.needsUpdate = true;
      renderer.setRenderTarget(fbo);
      renderer.render(mirrorScene, ortho);

      renderer.setRenderTarget(null);
      if (postReady && composer) composer.render();
      else renderer.render(glScene, camera);

      if (readyPending && !readyNotified) {
        readyPending = false;
        readyNotified = true;
        onReadyRef.current?.();
      }
    };
    const unsubscribeFrame = subscribeFrame(loop, {
      fps: renderProfile.animationFps,
    });

    let resizeFrame = 0;
    let lastWidth = mount.clientWidth;
    let lastHeight = mount.clientHeight;
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h || (w === lastWidth && h === lastHeight)) return;
      lastWidth = w;
      lastHeight = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, renderProfile.maxDpr),
      );
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      fbo.dispose(); fbo = mkFBO();
      glassMat.uniforms.uBuffer.value = fbo.texture;
      glassMat.uniforms.uRes.value.set(w, h);
      if (hBlurPass) hBlurPass.uniforms.h.value = (LENS_BLUR / w);
      if (vBlurPass) vBlurPass.uniforms.v.value = (LENS_BLUR / h);
      const blurValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-blur')) || FINAL_BLUR_DEFAULT;
      if (finalHBlurPass) finalHBlurPass.uniforms.h.value = blurValue / w;
      if (finalVBlurPass) finalVBlurPass.uniforms.v.value = blurValue / h;
      if (bokehPass) {
        bokehPass.materialBokeh.uniforms.focus.value = DOF_FOCUS;
        bokehPass.materialBokeh.uniforms.aperture.value = DOF_APERTURE;
        bokehPass.materialBokeh.uniforms.maxblur.value = DOF_MAX_BLUR;
      }
      if (bloomPass) bloomPass.setSize(w, h);
      if (smaaPass) smaaPass.setSize(w, h);
    };
    const ro = new ResizeObserver(() => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
      });
    });
    ro.observe(mount);

    return () => {
      disposed = true;
      unsubscribeFrame();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      ro.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      if (loadedScene) {
        glScene.remove(loadedScene);
        disposeScene(loadedScene);
      }
      glassMesh.geometry.dispose();
      mirrorGeometry.dispose();
      mirrorMaterial.dispose();
      glassMat.dispose();
      fbo.dispose();
      bgTex.dispose();
      if (renderPass && renderPass.dispose) renderPass.dispose();
      if (bloomPass && bloomPass.dispose) bloomPass.dispose();
      if (chromaPass && chromaPass.dispose) chromaPass.dispose();
      if (ghostGlarePass && ghostGlarePass.dispose) ghostGlarePass.dispose();
      if (hBlurPass && hBlurPass.dispose) hBlurPass.dispose();
      if (vBlurPass && vBlurPass.dispose) vBlurPass.dispose();
      if (finalHBlurPass && finalHBlurPass.dispose) finalHBlurPass.dispose();
      if (finalVBlurPass && finalVBlurPass.dispose) finalVBlurPass.dispose();
      if (ditherPass && ditherPass.dispose) ditherPass.dispose();
      if (bokehPass && bokehPass.dispose) bokehPass.dispose();
      if (smaaPass && smaaPass.dispose) smaaPass.dispose();
      if (composer && composer.renderTarget1) {
        composer.renderTarget1.dispose();
        composer.renderTarget2.dispose();
      }
      if (blurObserver) blurObserver.disconnect();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [bgCanvasRef, modelPath, modelConfig, mouseRef, renderProfile]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
});

export default FluidGlass;
