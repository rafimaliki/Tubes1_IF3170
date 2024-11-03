import React from "react";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import SetState from "@/class/Types";
import axios from "axios";

interface ButtonSolveProps {
  selectedAlgorithm: string;
  magicCube: MagicCube;
  setMagicCube: SetState<MagicCube>;
  setResult: SetState<Result | null>;
  setHighlightIndex: SetState<number[][] | null>;
}

const SolveButton = ({
  selectedAlgorithm,
  magicCube,
  setMagicCube,
  setResult,
  setHighlightIndex,
}: ButtonSolveProps) => {
  const handleClick = () => {
    console.log("Solving with", selectedAlgorithm);

    const params = new URLSearchParams();
    params.append("cube", JSON.stringify(magicCube.getBuffer()));

    setResult(null);

    axios
      .get(`http://localhost:8080/${selectedAlgorithm}/`, { params })
      .then((response) => {
        // console.log("Response:", response.data);
        setResult(
          new Result({ ...response.data.result, MagicCube: magicCube })
        );

        const newMagicCube = new MagicCube(magicCube.getSize(), false);
        newMagicCube.setCube(response.data.result.Buffer);

        const lastSwapIdx =
          response.data.result.IndexChange[
            response.data.result.IndexChange.length - 1
          ];
        // console.log("Last swap:", lastSwapIdx);

        setHighlightIndex(lastSwapIdx);
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
