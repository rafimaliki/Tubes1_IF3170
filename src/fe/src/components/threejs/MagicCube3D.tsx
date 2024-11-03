import Cube3D from "./Cube3D";
import MagicCube from "@/class/MagicCube";

interface MagicCube3DProps {
  separate: { x: boolean; y: boolean; z: boolean };
  magicCube: MagicCube;
  highlightIndex: number[][] | null;
}

const MagicCube3D = ({
  separate,
  magicCube,
  highlightIndex,
}: MagicCube3DProps) => {
  const numbersMatrix = magicCube.getBuffer();
  const size = magicCube.getSize();
  const offSet = (size + 1) / 2;

  const { x: separateX, y: separateY, z: separateZ } = separate;

  const cubes = [];

  const offsetX = separateX ? 2 : 1;
  const offsetY = separateY ? 2 : 1;
  const offsetZ = separateZ ? 2 : 1;

  // console.log("Highlight index:", highlightIndex);

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
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
            highlight={
              (highlightIndex &&
                ((x === highlightIndex[0][0] &&
                  y === highlightIndex[0][1] &&
                  z === highlightIndex[0][2]) ||
                  (x === highlightIndex[1][0] &&
                    y === highlightIndex[1][1] &&
                    z === highlightIndex[1][2]))) ||
              false
            }
          />
        );
      }
    }
  }

  return <group>{cubes}</group>;
};

export default MagicCube3D;
