import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function SurfaceLine({ model }) {
  const mesh = useMemo(() => {
    let found = null;
    model.traverse((child) => {
      if (child.isMesh && !found) found = child;
    });
    return found;
  }, [model]);

  const tube = useMemo(() => {
    if (!mesh) return null;

    const raycaster = new THREE.Raycaster();

    // Create a simple curve across the object
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0),
    ]);

    const samples = curve.getPoints(200);
    const surfacePoints = [];

    const direction = new THREE.Vector3(0, 0, 1);

    samples.forEach((p) => {
      raycaster.set(p, direction);

      const intersects = raycaster.intersectObject(mesh, true);
      if (intersects.length > 0) {
        surfacePoints.push(intersects[0].point.clone());
      }
    });

    if (surfacePoints.length < 2) return null;

    const surfaceCurve = new THREE.CatmullRomCurve3(surfacePoints);
    return new THREE.TubeGeometry(surfaceCurve, 200, 0.01, 8, false);
  }, [mesh]);

  if (!tube) return null;

  return (
    <mesh geometry={tube}>
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function Landing() {
  const { scene } = useGLTF("/models/temp/rock_1.glb");

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.8} />

        <Model path="/models/temp/rock_1.glb" />

        <SurfaceLine model={scene} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}