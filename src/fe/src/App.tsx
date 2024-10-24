import React, { useState } from "react";

import Scene from "./components/threejs/Scene";
import ControlPanel from "./components/react/ControlPanel";

const App: React.FC = () => {
  const [separate, setSeparate] = useState<{
    x: boolean;
    y: boolean;
    z: boolean;
  }>({
    x: false,
    y: false,
    z: false,
  });

  const toggleSeparate = (axis: "x" | "y" | "z") => {
    setSeparate((prev) => ({
      ...prev,
      [axis]: !prev[axis],
    }));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="w-full h-full">
        <ControlPanel separate={separate} toggleSeparate={toggleSeparate} />
        <Scene separate={separate} />
      </div>
    </div>
  );
};

export default App;
