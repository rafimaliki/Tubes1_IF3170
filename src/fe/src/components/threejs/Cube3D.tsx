import React from "react";
import { Text } from "@react-three/drei";

interface Cube3DProps {
  position: [number, number, number];
  number: number;
  pivot: boolean;
}

const Cube3D: React.FC<Cube3DProps> = ({ position, number, pivot }) => {
  const positions: [number, number, number][] = [
    [0, 0, 0.51],
    [0, 0, -0.51],
    [0.52, 0, 0],
    [-0.52, 0, 0],
    [0, 0.52, 0],
    [0, -0.52, 0],
  ];

  const rotations: [number, number, number][] = [
    [0, 0, 0],
    [0, Math.PI, 0],
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [-Math.PI / 2, 0, 0],
    [Math.PI / 2, 0, 0],
  ];

  const color = false ? "lightcoral" : "mistyrose";

  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />

      {positions.map((pos, index) => (
        <Text
          key={index}
          position={pos}
          rotation={rotations[index] as [number, number, number]}
          fontSize={0.4}
          color="black"
          textAlign="center"
        >
          {number}
        </Text>
      ))}
    </mesh>
  );
};

export default Cube3D;
