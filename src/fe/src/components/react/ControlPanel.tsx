import React from "react";
import MagicCube from "../../class/MagicCube";
import axios from "axios";

interface ControlPanelProps {
  separate: { x: boolean; y: boolean; z: boolean };
  setSeparate: React.Dispatch<
    React.SetStateAction<{ x: boolean; y: boolean; z: boolean }>
  >;
  magicCube: MagicCube;
  setMagicCube: React.Dispatch<React.SetStateAction<MagicCube>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  separate,
  setSeparate,
  magicCube,
  setMagicCube,
}) => {
  const btn_style =
    " bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-md shadow-md text-sm";

  const toggleSeparate = (axis: "x" | "y" | "z") => {
    setSeparate((prev) => ({
      ...prev,
      [axis]: !prev[axis],
    }));
  };

  const solveCube = (algorithm: string) => {
    const params = new URLSearchParams();
    params.append("cube", JSON.stringify(magicCube.getBuffer()));
    console.log("Params:", algorithm);

    axios
      .get(`http://localhost:8080/${algorithm}/`, { params })
      .then((response) => {
        console.log("Response:", response.data);

        const newMagicCube = new MagicCube(magicCube.getSize(), false);
        newMagicCube.setCube(response.data.result);

        setMagicCube(newMagicCube);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="absolute w-full flex justify-around top-2 z-50">
      <button onClick={() => toggleSeparate("x")} className={btn_style}>
        Separate-X: {separate.x ? "On" : "Off"}
      </button>
      <button onClick={() => toggleSeparate("y")} className={btn_style}>
        Separate-Y: {separate.y ? "On" : "Off"}
      </button>
      <button onClick={() => toggleSeparate("z")} className={btn_style}>
        Separate-Z: {separate.z ? "On" : "Off"}
      </button>
      <button
        onClick={() => setMagicCube(new MagicCube(5, true))}
        className={btn_style}
      >
        Randomize
      </button>
      <button onClick={() => solveCube("hill-climbing")} className={btn_style}>
        Hill-Climbing
      </button>
      <button
        onClick={() => solveCube("simulated-annealing")}
        className={btn_style}
      >
        Simulated-Annealing
      </button>
      <button
        onClick={() => solveCube("genetic-algorithm")}
        className={btn_style}
      >
        Genetic-Algorithm
      </button>
    </div>
  );
};

export default ControlPanel;
