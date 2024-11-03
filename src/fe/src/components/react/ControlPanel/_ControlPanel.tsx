import { useState } from "react";
import SetState from "@/class/Types";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import Config from "@/class/Config";
import SeparateButtons from "./SeparateButtons";
import AlgorithmSelector from "./AlgorithmSelector";
import ButtonSolve from "./ButtonSolve";
import RandomizeButton from "./ButtonRandomize";

interface ControlPanelProps {
  separate: { x: boolean; y: boolean; z: boolean };
  setSeparate: SetState<{ x: boolean; y: boolean; z: boolean }>;
  magicCube: MagicCube;
  setMagicCube: SetState<MagicCube>;
  setResult: SetState<Result | null>;
  setHighlightIndex: SetState<number[][] | null>;
}

const ControlPanel = ({
  separate,
  setSeparate,
  magicCube,
  setMagicCube,
  setResult,
  setHighlightIndex,
}: ControlPanelProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    Config.algorithms[4].endpoint
  );

  return (
    <div
      className={`flex flex-col justify-start items-center absolute z-50 right-2 transition-transform duration-500 w-56 h-96 bg-white border rounded-md shadow-2xl top-1/2 transform -translate-y-1/2 ${
        isHidden ? "translate-x-48" : ""
      }`}
    >
      <div>
        <button
          onClick={() => setIsHidden((prev) => !prev)}
          className="absolute left-2 top-2"
        >
          <p
            className={`text-neutral-300 hover:text-neutral-500 transition-transform duration-500 font-extrabold px-2 rounded-lg hover:bg-neutral-200 ${
              isHidden ? "rotate-180" : ""
            }`}
          >
            &gt;
          </p>
        </button>
        <p className="font-bold font-sans cursor-default text-lg mt-1">
          Magic Cube
        </p>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <SeparateButtons separate={separate} setSeparate={setSeparate} />
        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <div className="flex flex-col items-center justify-center mt-10">
          <RandomizeButton setMagicCube={setMagicCube} />
          <ButtonSolve
            selectedAlgorithm={selectedAlgorithm}
            magicCube={magicCube}
            setMagicCube={setMagicCube}
            setResult={setResult}
            setHighlightIndex={setHighlightIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
