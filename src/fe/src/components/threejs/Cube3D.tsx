import { Text } from "@react-three/drei";

interface Cube3DProps {
  position: [number, number, number];
  number: number;
  highlight: boolean;
}

const Cube3D = ({ position, number, highlight }: Cube3DProps) => {
  const positions: [number, number, number][] = [
    [0, 0, 0.51],
    // [0, 0, -0.51],
    // [0.51, 0, 0],
    // [-0.51, 0, 0],
    // [0, 0.51, 0],
    // [0, -0.51, 0],
  ];

  const rotations: [number, number, number][] = [
    [0, 0, 0],
    [0, Math.PI, 0],
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [-Math.PI / 2, 0, 0],
    [Math.PI / 2, 0, 0],
  ];

  const color = highlight ? "lightcoral" : "mistyrose";

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
