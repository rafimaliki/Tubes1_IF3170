import React from "react";

interface ControlPanelProps {
  separate: { x: boolean; y: boolean; z: boolean };
  toggleSeparate: (axis: "x" | "y" | "z") => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  separate,
  toggleSeparate,
}) => {
  return (
    <div className="absolute w-full flex justify-around top-2 z-50">
      <button
        onClick={() => toggleSeparate("x")}
        className="border border-black bg-white hover:bg-slate-300 cursor-pointer p-2 rounded-md"
      >
        Separate-X: {separate.x ? "On" : "Off"}
      </button>
      <button
        onClick={() => toggleSeparate("y")}
        className="border border-black bg-white hover:bg-slate-300 cursor-pointer p-2 rounded-md"
      >
        Separate-Y: {separate.y ? "On" : "Off"}
      </button>
      <button
        onClick={() => toggleSeparate("z")}
        className="border border-black bg-white hover:bg-slate-300 cursor-pointer p-2 rounded-md"
      >
        Separate-Z: {separate.z ? "On" : "Off"}
      </button>
    </div>
  );
};

export default ControlPanel;
