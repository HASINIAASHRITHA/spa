
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

// Simple floating orbs component instead of complex particles
const FloatingOrbs = () => {
  return (
    <>
      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.3} />
      </mesh>
      <mesh position={[2, -1, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#bb86fc" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color="#03dac6" transparent opacity={0.4} />
      </mesh>
    </>
  );
};

export const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <FloatingOrbs />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
