import React, { useState } from "react";

import Scene from "./components/threejs/Scene";
import ControlPanel from "./components/react/ControlPanel";
import MagicCube from "./class/MagicCube";

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

  const [magicCube, setMagicCube] = useState(new MagicCube(5, false));

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="w-full h-full">
        <ControlPanel
          separate={separate}
          setSeparate={setSeparate}
          magicCube={magicCube}
          setMagicCube={setMagicCube}
        />
        <Scene separate={separate} magicCube={magicCube} />
      </div>
    </div>
  );
};

export default App;
