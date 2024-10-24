import React from "react";
import Cube from "./Cube";

const SIZE = 5;

const createMatrix = (size: number) => {
  const matrix = [];
  let counter = 1;

  for (let x = 0; x < size; x++) {
    const plane = [];
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let z = 0; z < size; z++) {
        row.push(counter++);
      }
      plane.push(row);
    }
    matrix.push(plane);
  }

  return matrix;
};

interface MagicCubeProps {
  separate: { x: boolean; y: boolean; z: boolean };
}

const MagicCube: React.FC<MagicCubeProps> = ({ separate }) => {
  const numbersMatrix = createMatrix(SIZE);
  const cubes = [];

  const { x: separateX, y: separateY, z: separateZ } = separate;

  const offsetX = separateX ? 2 : 1;
  const offsetY = separateY ? 2 : 1;
  const offsetZ = separateZ ? 2 : 1;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      for (let z = 0; z < SIZE; z++) {
        const number = numbersMatrix[x][y][z];
        cubes.push(
          <Cube
            key={`${x}-${y}-${z}`}
            position={[
              (z - SIZE + 3) * offsetX,
              (SIZE - y - 3) * offsetY,
              (SIZE - x - 3) * offsetZ,
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

export default MagicCube;
