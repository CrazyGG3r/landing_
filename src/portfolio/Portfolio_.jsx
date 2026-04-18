// GlassScene.jsx
import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import TextPressure from '../hooks/TextPressure'; // Import the TextPressure component

// ---------- Error Boundary ----------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('3D Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', padding: 20, background: '#111' }}>
          Something went wrong with the 3D scene.
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------- Environment with fallback ----------
const SafeEnvironment = () => {
  try {
    return <Environment preset="city" background={false} />;
  } catch (e) {
    console.warn('Environment preset failed, using generated map');
    const envMap = useEnvironment({ preset: 'city' });
    return <Environment map={envMap} background={false} />;
  }
};

// ---------- Uploaded Model (applies glass material) ----------
const UploadedModel = ({ file, params }) => {
  const groupRef = useRef();
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const gltf = useLoader(GLTFLoader, url);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  useEffect(() => {
    if (!gltf) return;
    const scene = gltf.scene;

    // Auto-scale and center
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.4;
    const newScale = maxDim > 0 ? targetSize / maxDim : 1.2;
    setScale(newScale);

    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Apply glass material to all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshTransmissionMaterial({
          backside: params.backside,
          backsideThickness: params.backsideThickness,
          samples: params.samples,
          thickness: params.thickness,
          chromaticAberration: params.chromaticAberration,
          anisotropy: params.anisotropy,
          distortion: params.distortion,
          distortionScale: params.distortionScale,
          temporalDistortion: params.temporalDistortion,
          iridescence: params.iridescence,
          iridescenceIOR: params.iridescenceIOR,
          iridescenceThicknessRange: params.iridescenceThicknessRange,
          color: params.color,
          roughness: params.roughness,
          metalness: params.metalness,
          clearcoat: params.clearcoat,
          clearcoatRoughness: params.clearcoatRoughness,
          transmission: params.transmission,
          ior: params.ior,
        });
      }
    });
  }, [gltf, params]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  if (!gltf) return null;
  return <primitive ref={groupRef} object={gltf.scene} scale={scale} />;
};

// ---------- Glass Mesh (TorusKnot fallback) ----------
const GlassMesh = ({ params }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
      <MeshTransmissionMaterial {...params} />
    </mesh>
  );
};

// ---------- Control Panel ----------
const ControlPanel = ({ params, setParams, uploadedFile, setUploadedFile }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleRangeChange = (key, index, value) => {
    setParams((prev) => {
      const newRange = [...prev[key]];
      newRange[index] = parseFloat(value);
      return { ...prev, [key]: newRange };
    });
  };

  const handleFileUpload = (file) => {
    if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
      setUploadedFile(file);
    } else {
      alert('Please upload a .glb or .gltf file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        width: 280,
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'rgba(20,20,30,0.85)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        backdropFilter: 'blur(8px)',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 100,
        border: '1px solid #444',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <h3 style={{ margin: '0 0 10px', textAlign: 'center' }}>Glass Tweaker</h3>

      {/* Upload Section */}
      <div style={{ marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid #444' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <label style={{ fontWeight: 'bold' }}>Upload Model</label>
          {uploadedFile && (
            <button
              onClick={clearUpload}
              style={{
                background: 'none',
                border: '1px solid #666',
                color: '#ccc',
                borderRadius: 4,
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              Clear
            </button>
          )}
        </div>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragActive ? '#88aaff' : '#555'}`,
            borderRadius: 8,
            padding: '20px 10px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragActive ? 'rgba(136,170,255,0.1)' : 'rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <div style={{ fontSize: 24, marginBottom: 5 }}>📁</div>
          {uploadedFile ? (
            <div style={{ color: '#88aaff' }}>
              {uploadedFile.name.length > 25
                ? uploadedFile.name.substring(0, 25) + '…'
                : uploadedFile.name}
            </div>
          ) : (
            <>
              <div>Drop .glb/.gltf here</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: 5 }}>or click to browse</div>
            </>
          )}
        </div>
        {uploadedFile && (
          <div style={{ marginTop: 8, fontSize: 11, color: '#aaa' }}>
            ✓ Loaded. Using your model.
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Color</label>
        <input
          type="color"
          value={params.color}
          onChange={(e) => handleChange('color', e.target.value)}
          style={{ width: '100%', height: 30, border: 'none', borderRadius: 4 }}
        />
      </div>

      {/* Sliders */}
      {[
        { label: 'Backside Thickness', key: 'backsideThickness', min: 0, max: 2, step: 0.01 },
        { label: 'Samples', key: 'samples', min: 1, max: 32, step: 1 },
        { label: 'Thickness', key: 'thickness', min: 0, max: 2, step: 0.01 },
        { label: 'Chromatic Aberration', key: 'chromaticAberration', min: 0, max: 0.5, step: 0.001 },
        { label: 'Anisotropy', key: 'anisotropy', min: 0, max: 1, step: 0.01 },
        { label: 'Distortion', key: 'distortion', min: 0, max: 2, step: 0.01 },
        { label: 'Distortion Scale', key: 'distortionScale', min: 0, max: 2, step: 0.01 },
        { label: 'Temporal Distortion', key: 'temporalDistortion', min: 0, max: 1, step: 0.01 },
        { label: 'Iridescence', key: 'iridescence', min: 0, max: 2, step: 0.01 },
        { label: 'Iridescence IOR', key: 'iridescenceIOR', min: 0.5, max: 2.5, step: 0.01 },
        { label: 'Roughness', key: 'roughness', min: 0, max: 1, step: 0.01 },
        { label: 'Metalness', key: 'metalness', min: 0, max: 1, step: 0.01 },
        { label: 'Clearcoat', key: 'clearcoat', min: 0, max: 1, step: 0.01 },
        { label: 'Clearcoat Roughness', key: 'clearcoatRoughness', min: 0, max: 1, step: 0.01 },
        { label: 'Transmission', key: 'transmission', min: 0, max: 1, step: 0.01 },
        { label: 'IOR', key: 'ior', min: 1, max: 2.5, step: 0.01 },
      ].map(({ label, key, min, max, step }) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>{label}</label>
            <span>{typeof params[key] === 'number' ? params[key].toFixed(3) : params[key]}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={params[key]}
            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      ))}

      {/* Iridescence Range */}
      <div style={{ marginBottom: 10 }}>
        <label>Iridescence Thickness Range</label>
        <div style={{ display: 'flex', gap: 5 }}>
          <input
            type="number"
            min={0}
            max={2000}
            step={10}
            value={params.iridescenceThicknessRange[0]}
            onChange={(e) => handleRangeChange('iridescenceThicknessRange', 0, e.target.value)}
            style={{ width: '45%', background: '#333', color: 'white', border: '1px solid #555' }}
          />
          <input
            type="number"
            min={0}
            max={2000}
            step={10}
            value={params.iridescenceThicknessRange[1]}
            onChange={(e) => handleRangeChange('iridescenceThicknessRange', 1, e.target.value)}
            style={{ width: '45%', background: '#333', color: 'white', border: '1px solid #555' }}
          />
        </div>
      </div>

      {/* Backside Toggle */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={params.backside}
            onChange={(e) => handleChange('backside', e.target.checked)}
          />
          Backside
        </label>
      </div>
    </div>
  );
};

// ---------- Main Scene ----------
export default function GlassScene() {
  const [params, setParams] = useState({
    backside: true,
    backsideThickness: 0.5,
    samples: 24.0,
    thickness: 0.09,
    chromaticAberration: 0.1,
    anisotropy: 0.1,
    distortion: 0.5,
    distortionScale: 0.9,
    temporalDistortion: 0.25,
    iridescence: 1,
    iridescenceIOR: 1,
    iridescenceThicknessRange: [0, 1400],
    color: '#88aaff',
    roughness: 0.54,
    metalness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transmission: 1,
    ior: 1.5,
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      {/* Background Text: BOLTFORGED with Compressa VF */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <TextPressure
          text="BOLTFORGED"
          colors={{
            text: '#ffffff',
            background: '#000000', // dark background to make text pop through glass
          }}
          physics={{
            enabled: false, // disable physics to avoid interference, keep static but visible
          }}
          layout={{
            textScale: 1.2, // make text prominent
            centerAlign: true,
          }}
        />
      </div>

      {/* 3D Glass Scene on top with transparent background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0); // fully transparent clear color
            }}
          >
            <SafeEnvironment />
            <ambientLight intensity={0.2} />
            <Suspense fallback={null}>
              {uploadedFile ? (
                <UploadedModel file={uploadedFile} params={params} />
              ) : (
                <GlassMesh params={params} />
              )}
            </Suspense>
            <OrbitControls enableZoom enablePan={false} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Control Panel always on top */}
      <ControlPanel
        params={params}
        setParams={setParams}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />
    </div>
  );
}