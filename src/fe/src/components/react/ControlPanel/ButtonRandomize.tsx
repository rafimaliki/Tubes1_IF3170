import React from "react";
import MagicCube from "@/class/MagicCube";
import SetState from "@/class/Types";

interface ButtonRandomizeProps {
  setMagicCube: SetState<MagicCube>;
}

const ButtonRandomize = ({ setMagicCube }: ButtonRandomizeProps) => {
  const handleClick = () => {
    console.log("Randomizing");
    setMagicCube(new MagicCube(5, true));
  };

  return (
    <button className="btn" onClick={handleClick}>
      Randomize
    </button>
  );
};

export default ButtonRandomize;
