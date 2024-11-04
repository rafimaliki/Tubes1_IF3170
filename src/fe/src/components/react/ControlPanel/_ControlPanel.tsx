import { useState } from "react";
import SetState from "@/class/Types";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import Config from "@/class/Config";
import SeparateButtons from "./SeparateButtons";
import AlgorithmSelector from "./AlgorithmSelector";
import ButtonSolve from "./ButtonSolve";
import RandomizeButton from "./ButtonRandomize";
import InputValue from "./InputValue";

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

  const [maxSideways, setMaxSideways] = useState(Config.maxSideways);
  const [maxRestart, setMaxRestart] = useState(Config.maxRestart);
  const [startPopulation, setStartPopulation] = useState(
    Config.startPopulation
  );
  const [maxIteration, setMaxIteration] = useState(Config.maxIteration);

  return (
    <div
      className={`flex flex-col justify-start items-center absolute z-20 right-2 transition-transform duration-500 w-56 h-[70%] bg-white border rounded-md shadow-2xl top-1/2 transform -translate-y-1/2 ${
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
        className={`flex flex-col justify-between transition-opacity duration-300 h-full ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <div>
          <SeparateButtons separate={separate} setSeparate={setSeparate} />
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
          {selectedAlgorithm === Config.algorithms[1].endpoint ? (
            <InputValue
              title="Max sideways"
              placeHolder={Config.maxSideways.toString()}
              setter={setMaxSideways}
            />
          ) : null}
          {selectedAlgorithm === Config.algorithms[2].endpoint ? (
            <InputValue
              title="Max restart"
              placeHolder={Config.maxRestart.toString()}
              setter={setMaxRestart}
            />
          ) : null}
          {selectedAlgorithm === Config.algorithms[5].endpoint ? (
            <>
              <InputValue
                title="Start population"
                placeHolder={Config.startPopulation.toString()}
                setter={setStartPopulation}
              />
              <InputValue
                title="Max iteration"
                placeHolder={Config.maxIteration.toString()}
                setter={setMaxIteration}
              />
            </>
          ) : null}
        </div>
        <div className="flex items-center justify-center mb-3">
          <RandomizeButton setMagicCube={setMagicCube} />
          <ButtonSolve
            selectedAlgorithm={selectedAlgorithm}
            magicCube={magicCube}
            setMagicCube={setMagicCube}
            setResult={setResult}
            setHighlightIndex={setHighlightIndex}
            maxSideways={maxSideways}
            maxRestart={maxRestart}
            startPopulation={startPopulation}
            maxIteration={maxIteration}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
