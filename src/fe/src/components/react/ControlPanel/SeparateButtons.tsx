import React from "react";

interface SeparateButtonsProps {
  separate: { x: boolean; y: boolean; z: boolean };
  setSeparate: React.Dispatch<React.SetStateAction<{ x: boolean; y: boolean; z: boolean }>>;
}

const SeparateButtons = ({ separate, setSeparate }: SeparateButtonsProps) => {
  const toggleSeparate = (axis: "x" | "y" | "z") => {
    setSeparate((prev) => ({
      ...prev,
      [axis]: !prev[axis],
    }));
  };

  return (
    <div id="separate-buttons">
      <p className="w-full px-2 mb-2 mt-5 cursor-default">Separate Cubes :</p>
      <div>
        {["x", "y", "z"].map((axis) => (
          <button
            key={axis}
            className={`btn-toggle ${separate[axis as "x" | "y" | "z"] ? "btn-toggle-active" : ""}`}
            onClick={() => toggleSeparate(axis as "x" | "y" | "z")}
          >
            {axis}-axis
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeparateButtons;
