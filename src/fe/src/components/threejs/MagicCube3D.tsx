import React from "react";
import Cube3D from "./Cube3D";
import MagicCube from "../../class/MagicCube";

interface MagicCube3DProps {
  separate: { x: boolean; y: boolean; z: boolean };
  magicCube: MagicCube;
}

const MagicCube3D: React.FC<MagicCube3DProps> = ({ separate, magicCube }) => {
  const numbersMatrix = magicCube.getBuffer();
  const size = magicCube.getSize();
  const offSet = (size + 1) / 2;

  const { x: separateX, y: separateY, z: separateZ } = separate;

  const cubes = [];

  const offsetX = separateX ? 2 : 1;
  const offsetY = separateY ? 2 : 1;
  const offsetZ = separateZ ? 2 : 1;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        // random chance not render
        const number = numbersMatrix[x][y][z];
        cubes.push(
          <Cube3D
            key={`${x}-${y}-${z}`}
            position={[
              (z - size + offSet) * offsetX,
              (size - y - offSet) * offsetY,
              (size - x - offSet) * offsetZ,
            ]}
            number={number}
            pivot={x === 0 && y === 0 && z === 0}
          />
        );
      }
    }
  }

  return <group>{cubes}</group>;
};

export default MagicCube3D;
