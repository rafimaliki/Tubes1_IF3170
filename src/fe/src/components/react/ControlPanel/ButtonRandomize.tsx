import React from "react";
import MagicCube from "@/class/MagicCube";
import SetState from "@/class/Types";

interface ButtonRandomizeProps {
  setMagicCube: SetState<MagicCube>;
  setResult: SetState<any>;
  setHighlightIndex: SetState<any>;
}

const ButtonRandomize = ({
  setMagicCube,
  setResult,
  setHighlightIndex,
}: ButtonRandomizeProps) => {
  const handleClick = () => {
    console.log("Randomizing");
    setResult(null);
    setHighlightIndex(null);
    setMagicCube(new MagicCube(5, true));
  };

  return (
    <button className="btn" onClick={handleClick}>
      Randomize
    </button>
  );
};

export default ButtonRandomize;
