import { Plane, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import MagicCube from "@/class/MagicCube.ts";
import MagicCube3D from "./MagicCube3D.tsx";

interface SceneProps {
  separate: { x: boolean; y: boolean; z: boolean };
  magicCube: MagicCube;
  highlightIndex: number[][] | null;
}

const Scene = ({ separate, magicCube, highlightIndex }: SceneProps) => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 6, 10], fov: 75 }}
    >
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />

      <group>
        <Plane
          args={[20, 20, 20, 20]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
        >
          <meshStandardMaterial color="#E4E5E4" wireframe />
        </Plane>
        {/* <Text
          position={[0, -4.8, 0]}
          fontSize={2.5}
          color="black"
          textAlign="center"
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          →
        </Text> */}
        <MagicCube3D
          separate={separate}
          magicCube={magicCube}
          highlightIndex={highlightIndex}
        />
      </group>
    </Canvas>
  );
};

export default Scene;
