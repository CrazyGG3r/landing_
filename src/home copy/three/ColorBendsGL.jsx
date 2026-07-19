import { forwardRef, memo, useCallback, useContext, useEffect, useRef } from 'react';
import { CB_EXPOSURE } from '../core/constants';
import { useResizeObserver } from '../core/hooks';
import { MouseContext } from '../core/MouseContext';
import { CB_FRAG, CB_VERT } from './shaders';

const ColorBendsGL = memo(forwardRef(function ColorBendsGL({
  colors = ['#ff2929', '#00ff00', '#0000ff'],
  rotation = 45,
  autoRotate = 1,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 0,
  mouseInfluence = 1,
  parallax = 1,
  noise = 0.08,
  transparent = true,
}, forwardedRef) {
  const canvasRef = useRef(null);
  const mouseRef = useContext(MouseContext);
  const stateRef = useRef(null);
  const setCanvasNode = useCallback((node) => {
    canvasRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef && typeof forwardedRef === 'object') forwardedRef.current = node;
  }, [forwardedRef]);

  const parseColors = useCallback(cols => {
    const out = [];
    for (let i = 0; i < 8; i++) {
      const h = (cols[i] || '#000000').replace('#', '');
      out.push(
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
      );
    }
    return new Float32Array(out);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    const vShader = mkShader(gl.VERTEX_SHADER, CB_VERT);
    const fShader = mkShader(gl.FRAGMENT_SHADER, CB_FRAG);
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = n => gl.getUniformLocation(prog, n);
    const uniforms = {
      uCanvas: U('uCanvas'), uTime: U('uTime'), uRot: U('uRot'),
      uPointer: U('uPointer'), uColors: U('uColors'),
      uColorCount: U('uColorCount'), uTransparent: U('uTransparent'),
      uSpeed: U('uSpeed'), uScale: U('uScale'),
      uFrequency: U('uFrequency'), uWarpStrength: U('uWarpStrength'),
      uMouseInfluence: U('uMouseInfluence'),
      uParallax: U('uParallax'), uNoise: U('uNoise'),
      uExposure: U('uExposure'),
    };

    stateRef.current = { gl, prog, buf, uniforms, vShader, fShader };

    gl.uniform1i(uniforms.uTransparent, transparent ? 1 : 0);
    gl.uniform1f(uniforms.uSpeed, speed);
    gl.uniform1f(uniforms.uScale, scale);
    gl.uniform1f(uniforms.uFrequency, frequency);
    gl.uniform1f(uniforms.uWarpStrength, warpStrength);
    gl.uniform1f(uniforms.uMouseInfluence, mouseInfluence);
    gl.uniform1f(uniforms.uParallax, parallax);
    gl.uniform1f(uniforms.uNoise, noise);
    gl.uniform1f(uniforms.uExposure, CB_EXPOSURE);
    gl.uniform3fv(uniforms.uColors, parseColors(colors));
    gl.uniform1i(uniforms.uColorCount, Math.min(colors.length, 8));

    const start = performance.now();
    let raf;
    const ptrS = { x: 0, y: 0 };

    const loop = () => {
      const elapsed = (performance.now() - start) / 1000;
      const deg = (rotation % 360) + autoRotate * elapsed;
      const rad = deg * Math.PI / 180;
      ptrS.x += (mouseRef.current.x - ptrS.x) * 0.08;
      ptrS.y += (mouseRef.current.y - ptrS.y) * 0.08;
      gl.uniform1f(uniforms.uTime, elapsed);
      gl.uniform2f(uniforms.uRot, Math.cos(rad), Math.sin(rad));
      gl.uniform2f(uniforms.uPointer, ptrS.x, ptrS.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
      const loseExt = gl.getExtension('WEBGL_lose_context');
      if (loseExt && loseExt.loseContext) loseExt.loseContext();
    };
  }, [colors, rotation, autoRotate, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, transparent, mouseRef, parseColors]);

  useResizeObserver(canvasRef, () => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const { gl, uniforms } = stateRef.current;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uniforms.uCanvas, w, h);
  });

  return (
    <canvas
      ref={setCanvasNode}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}));

export default ColorBendsGL;
