import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import SetState from "@/class/Types";
import axios from "axios";
import Config from "@/class/Config";

interface ButtonSolveProps {
  selectedAlgorithm: string;
  magicCube: MagicCube;
  setMagicCube: SetState<MagicCube>;
  setResult: SetState<Result | null>;
  setHighlightIndex: SetState<number[][] | null>;
  maxSideways: number;
  maxRestart: number;
  startPopulation: number;
  maxIteration: number;
  setIsLoading: SetState<boolean>;
}

const SolveButton = ({
  selectedAlgorithm,
  magicCube,
  setMagicCube,
  setResult,
  setHighlightIndex,
  maxSideways,
  maxRestart,
  startPopulation,
  maxIteration,
  setIsLoading,
}: ButtonSolveProps) => {
  const handleClick = () => {
    console.log("Solving with", selectedAlgorithm);

    const params = new URLSearchParams();
    params.append("cube", JSON.stringify(magicCube.getBuffer()));

    if (selectedAlgorithm === "sideways-move-hill-climbing") {
      maxSideways =
        maxSideways && maxSideways > 0 ? maxSideways : Config.maxSideways;
      params.append("maxSideways", maxSideways.toString());
    }

    if (selectedAlgorithm === "random-restart-hill-climbing") {
      maxRestart =
        maxRestart && maxRestart > 0 ? maxRestart : Config.maxRestart;
      params.append("maxRestart", maxRestart.toString());
    }
    if (selectedAlgorithm === "genetic-algorithm") {
      startPopulation =
        startPopulation && startPopulation > 0
          ? startPopulation
          : Config.startPopulation;
      maxIteration =
        maxIteration && maxIteration > 0 ? maxIteration : Config.maxIteration;
      params.append("startPopulation", startPopulation.toString());
      params.append("maxIteration", maxIteration.toString());
    }

    setResult(null);
    setIsLoading(true);

    axios
      .get(`http://localhost:8080/${selectedAlgorithm}/`, { params })
      .then((response) => {
        setIsLoading(false);
        console.log(
          "Response size:",
          JSON.stringify(response.data).length / 1024 / 1024,
          "MB"
        );

        console.log("Response:", response.data);
        setResult(
          new Result({
            ...response.data.result,
            MagicCube: magicCube,
            Algorithm: selectedAlgorithm,
            Population: startPopulation,
          })
        );

        const newMagicCube = new MagicCube(magicCube.getSize(), false);
        newMagicCube.setCube(response.data.result.Buffer);

        if (response.data.result.IndexChange) {
          const lastSwapIdx =
            response.data.result.IndexChange[
              response.data.result.IndexChange.length - 1
            ];
          setHighlightIndex(lastSwapIdx);
        } else {
          setHighlightIndex(null);
        }
        setMagicCube(newMagicCube);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <button className="btn" onClick={handleClick}>
      Solve
    </button>
  );
};

export default SolveButton;
