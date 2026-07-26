import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { CB_FRAG, CB_VERT } from '../../home/three/shaders';

/**
 * The landing page's ColorBends field, re-tuned for the sign-in screen: same
 * shader, deeper palette, slower drift. It renders into a plain WebGL canvas
 * that the glass slab then samples as a texture, exactly like the home page
 * feeds FluidGlass.
 */
const AuthBackdrop = memo(forwardRef(function AuthBackdrop({
  pointerRef,
  colors = ['#2a0a4f', '#c2179c', '#1fb6ff'],
  rotation = 32,
  autoRotate = 0.55,
  speed = 0.11,
  scale = 1.15,
  frequency = 0.92,
  warpStrength = 0.45,
  mouseInfluence = 0.8,
  parallax = 0.85,
  noise = 0.06,
  exposure = 0.62,
}, forwardedRef) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const propsRef = useRef({ rotation, autoRotate });

  const setCanvasNode = useCallback((node) => {
    canvasRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);

  const colorArray = useMemo(() => {
    const out = [];
    for (let i = 0; i < 8; i += 1) {
      const hex = (colors[i] || '#000000').replace('#', '');
      out.push(
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
      );
    }
    return new Float32Array(out);
  }, [colors]);

  useEffect(() => {
    propsRef.current.rotation = rotation;
    propsRef.current.autoRotate = autoRotate;
  }, [rotation, autoRotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // `preserveDrawingBuffer` matters here: the glass slab lifts this canvas
    // into a texture on its own frame, after this context has already
    // presented. Without it the copy comes back empty on most drivers.
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    if (!gl) return undefined;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    const vertexShader = compile(gl.VERTEX_SHADER, CB_VERT);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, CB_FRAG);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const location = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      uCanvas: location('uCanvas'),
      uTime: location('uTime'),
      uRot: location('uRot'),
      uPointer: location('uPointer'),
      uColors: location('uColors'),
      uColorCount: location('uColorCount'),
      uTransparent: location('uTransparent'),
      uSpeed: location('uSpeed'),
      uScale: location('uScale'),
      uFrequency: location('uFrequency'),
      uWarpStrength: location('uWarpStrength'),
      uMouseInfluence: location('uMouseInfluence'),
      uParallax: location('uParallax'),
      uNoise: location('uNoise'),
      uExposure: location('uExposure'),
    };

    stateRef.current = { gl, program, uniforms };

    const resize = () => {
      const constrained = window.matchMedia(
        '(max-width: 800px), (pointer: coarse), (hover: none)',
      ).matches;
      const dpr = Math.min(window.devicePixelRatio || 1, constrained ? 1.25 : 2);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.uCanvas, width, height);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    const smoothed = { x: 0, y: 0 };
    let frame;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (document.hidden) return;

      const elapsed = (performance.now() - start) / 1000;
      const { rotation: rot, autoRotate: spin } = propsRef.current;
      const radians = (((rot % 360) + spin * elapsed) * Math.PI) / 180;
      const pointer = pointerRef?.current ?? { x: 0, y: 0 };

      smoothed.x += (pointer.x - smoothed.x) * 0.06;
      smoothed.y += (pointer.y - smoothed.y) * 0.06;

      gl.uniform1f(uniforms.uTime, elapsed);
      gl.uniform2f(uniforms.uRot, Math.cos(radians), Math.sin(radians));
      gl.uniform2f(uniforms.uPointer, smoothed.x, smoothed.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      stateRef.current = null;
    };
  }, [pointerRef]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    const { gl, program, uniforms } = state;
    gl.useProgram(program);
    gl.uniform1i(uniforms.uTransparent, 0);
    gl.uniform1f(uniforms.uSpeed, speed);
    gl.uniform1f(uniforms.uScale, scale);
    gl.uniform1f(uniforms.uFrequency, frequency);
    gl.uniform1f(uniforms.uWarpStrength, warpStrength);
    gl.uniform1f(uniforms.uMouseInfluence, mouseInfluence);
    gl.uniform1f(uniforms.uParallax, parallax);
    gl.uniform1f(uniforms.uNoise, noise);
    gl.uniform1f(uniforms.uExposure, exposure);
    gl.uniform3fv(uniforms.uColors, colorArray);
    gl.uniform1i(uniforms.uColorCount, Math.min(colors.length, 8));
  }, [speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, exposure, colorArray, colors.length]);

  return (
    <canvas
      ref={setCanvasNode}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}));

export default AuthBackdrop;
