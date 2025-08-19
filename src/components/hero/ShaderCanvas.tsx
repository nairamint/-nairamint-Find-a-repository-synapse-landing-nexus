
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShaderCanvasProps {
  colorStart: string;
  colorEnd: string;
  speed: number;
  angle: number;
}

// Custom water plane shader based on ShaderGradient specs
const WaterPlaneShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color() },
    uColor2: { value: new THREE.Color() },
    uDensity: { value: 1.2 },
    uSpeed: { value: 0.2 },
    uStrength: { value: 3.4 },
    uBrightness: { value: 1.2 },
    uReflection: { value: 0.1 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uStrength;
    uniform float uDensity;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 newPosition = position;
      float wave1 = sin(position.x * uDensity + uTime) * uStrength * 0.1;
      float wave2 = cos(position.y * uDensity * 0.8 + uTime * 1.2) * uStrength * 0.08;
      newPosition.z += wave1 + wave2;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTime;
    uniform float uBrightness;
    uniform float uReflection;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Dynamic gradient based on position and time
      float gradient = uv.x + uv.y * 0.5;
      gradient += sin(uv.x * 3.0 + uTime * 0.5) * 0.1;
      gradient += cos(uv.y * 2.0 + uTime * 0.3) * 0.1;
      
      vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 1.0, gradient));
      color *= uBrightness;
      
      // Add subtle reflection effect
      color += uReflection * sin(uv.x * 10.0 + uTime) * 0.1;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const WaterPlane: React.FC<{ colorStart: string; colorEnd: string; speed: number }> = ({ 
  colorStart, 
  colorEnd, 
  speed 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: { ...WaterPlaneShader.uniforms },
      vertexShader: WaterPlaneShader.vertexShader,
      fragmentShader: WaterPlaneShader.fragmentShader,
    });
    
    material.uniforms.uColor1.value.set(colorStart);
    material.uniforms.uColor2.value.set(colorEnd);
    material.uniforms.uSpeed.value = speed;
    
    return material;
  }, [colorStart, colorEnd, speed]);

  // Create plane geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(20, 20, 64, 64);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry}
      material={shaderMaterial}
      rotation={[Math.PI / 4, 0, 0]} // 45-degree rotation
    />
  );
};

const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ colorStart, colorEnd, speed, angle }) => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ 
        position: [0, 0, 4.4], 
        fov: 75,
        zoom: 1
      }}
      style={{ background: 'transparent' }}
      performance={{ min: 0.5 }}
    >
      <WaterPlane colorStart={colorStart} colorEnd={colorEnd} speed={speed} />
    </Canvas>
  );
};

export default ShaderCanvas;
