import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ScribbleModel({ path }) {
  const { scene } = useGLTF(path);
  const materialRef = useRef();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
      },

      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,

      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
        }

        void main() {

          // Edge detection (normal-based)
          float edge = 1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0)));

          // Scribble noise
          float n = hash(gl_FragCoord.xy * 0.5 + time);

          float stroke = smoothstep(0.2, 0.6, edge + n * 0.3);

          vec3 color = vec3(1.0);

          gl_FragColor = vec4(color, stroke);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  return <primitive object={scene} scale={1.5} />;
}

export default ScribbleModel;