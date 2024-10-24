import React from "react";
import { Plane, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MagicCube from "./MagicCube.tsx";

interface SceneProps {
  separate: { x: boolean; y: boolean; z: boolean };
}

const Scene: React.FC<SceneProps> = ({ separate }) => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 6, 10], fov: 75 }}
    >
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <group>
        <Plane
          args={[20, 20, 20, 20]} // width, height, widthSegments, heightSegments
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
        >
          <meshStandardMaterial color="#808080" wireframe />
        </Plane>
        <MagicCube separate={separate} />
      </group>
    </Canvas>
  );
};

export default Scene;
