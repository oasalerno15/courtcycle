"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, forwardRef, useMemo, useCallback } from "react";
import { Vector3, Matrix4, Quaternion } from "three";

// Carboflex 3D Model Component
function CarboflexModel({ onPositionChange, onRotationChange }) {
  const [geometry, setGeometry] = useState(null);
  const meshRef = useRef();
  
  // Load STL file manually
  useEffect(() => {
    const loader = new (require('three/examples/jsm/loaders/STLLoader').STLLoader)();
    loader.load('/Carboflex Cannonball to size.stl', (loadedGeometry) => {
      setGeometry(loadedGeometry);
    });
  }, []);
  
  // Create material for the racket - no hover effects
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ff6600', // Fixed orange color
    metalness: 0.3, // Reduced metalness to make color more visible
    roughness: 0.4, // Increased roughness for better color visibility
    clearcoat: 0.2, // Reduced clearcoat
    clearcoatRoughness: 0.3,
    reflectivity: 0.5, // Reduced reflectivity
    envMapIntensity: 0.8 // Reduced environment map intensity
  }), []);

  // Center and scale the model appropriately
  useEffect(() => {
    if (meshRef.current && geometry) {
      // Center the geometry
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);
      
      // Scale to smaller size
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim; // Smaller scale (was 6, now 2.5)
      meshRef.current.scale.setScalar(scale);
      
      // Lock the racket in the EXACT position you want
      meshRef.current.rotation.x = -0.704; // Locked to your perfect X rotation
      meshRef.current.rotation.y = 0.481;  // Locked to your perfect Y rotation
      meshRef.current.rotation.z = 0.000;  // Locked to your perfect Z rotation
      
      // Fixed position - locked in place
      meshRef.current.position.y = 0;
      meshRef.current.position.x = 0;
      meshRef.current.position.z = 2;
      
      // Call callbacks to update parent component with locked values
      if (onPositionChange) {
        onPositionChange({ x: 0, y: 0, z: 2 });
      }
      if (onRotationChange) {
        onRotationChange({ x: -0.704, y: 0.481, z: 0.000 });
      }
    }
  }, [geometry, onPositionChange, onRotationChange]);

  // Add horizontal spinning animation around X-axis
  useFrame((state) => {
    if (meshRef.current) {
      // Keep your locked rotations and add horizontal spinning
      meshRef.current.rotation.x = -0.704 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1; // Base rotation + gentle spinning
      meshRef.current.rotation.y = 0.481; // Keep your locked Y rotation
      meshRef.current.rotation.z = 0.000; // Keep your locked Z rotation
    }
  });

  // Log position and rotation when it changes (for debugging)
  useEffect(() => {
    if (meshRef.current) {
      const logInfo = () => {
        const pos = meshRef.current.position;
        const rot = meshRef.current.rotation;
        console.log('Racket position:', { x: pos.x, y: pos.y, z: pos.z });
        console.log('Racket rotation:', { x: rot.x, y: rot.y, z: rot.z });
      };
      
      // Log info every 2 seconds
      const interval = setInterval(logInfo, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!geometry) return null;

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material} 
      castShadow 
      receiveShadow
    >
    </mesh>
  );
}

// Coordinate Display Component
function CoordinateDisplay({ position, rotation }) {
  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50">
      <div className="mb-2 font-bold">Racket Coordinates</div>
      <div className="space-y-1">
        <div><span className="text-blue-400">Position:</span> X: {position.x.toFixed(3)} Y: {position.y.toFixed(3)} Z: {position.z.toFixed(3)}</div>
        <div><span className="text-green-400">Rotation:</span> X: {rotation.x.toFixed(3)} Y: {rotation.y.toFixed(3)} Z: {rotation.z.toFixed(3)}</div>
      </div>
    </div>
  );
}

// Enhanced Spotlight component with volumetric effects
function EnhancedSpotlight(props) {
  const light = useRef();
  
  // Uncomment to see a visual helper for the spotlight
  //useHelper(light, THREE.SpotLightHelper, 'red');
  
  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
      }
  }, []);

  return (
    <>
      <SpotLight
        castShadow={false}
        ref={light} 
        {...props} 
      />
    </>
  );
}

// Camera controller for dynamic camera movement
function CameraController() {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Scene content with dramatic lighting
function SceneContent({ onPositionChange, onRotationChange }) {
  const depthBuffer = useDepthBuffer({ 
    size: 2048,
    frames: 1,
    disableRenderLoop: true 
  });
  
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });
  
  return (
    <>
      <EnhancedSpotlight 
        depthBuffer={depthBuffer} 
        color="#aaaace" 
        position={[3, 3, 2]}
        volumetric={true}
        opacity={1}
        penumbra={1}
        distance={17}
        angle={0.8}
        attenuation={30}
        anglePower={6}
        intensity={1}
        shadowMapSize={2048}
        shadowBias={-0.0001}
        shadowAutoUpdate={true}
        castShadow={true}
      />
      
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 7]}
        near={0.1}
        far={1000}
      />

      <CameraController />
      
      {/* Carboflex 3D Model */}
      <Suspense fallback={null}>
        <CarboflexModel 
          onPositionChange={onPositionChange}
          onRotationChange={onRotationChange}
        />
      </Suspense>
      
      {/* Add some atmospheric elements for depth */}
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

// Main scene component
export function Scene() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [racketPosition, setRacketPosition] = useState({ x: 0, y: 0, z: 2 });
  const [racketRotation, setRacketRotation] = useState({ x: -0.704, y: 0.481, z: 0.000 });

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <div className="h-svh w-full relative bg-black overflow-hidden">
    <Canvas
      shadows
        gl={{
          antialias: isDesktop,
          preserveDrawingBuffer: isDesktop,
          powerPreference: isDesktop ? "high-performance" : "default",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
    >
        <SceneContent 
          onPositionChange={setRacketPosition}
          onRotationChange={setRacketRotation}
        />
        {/* <Perf /> */}
    </Canvas>
    </div>
  );
}
