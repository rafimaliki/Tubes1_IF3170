import React, { useState } from "react";

import Scene from "@/components/threejs/Scene";
import ControlPanel from "@/components/react/ControlPanel/_ControlPanel";
import ReplayPanel from "@/components/react/ReplayPanel/_ReplayPanel";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";

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
  const [result, setResult] = useState<Result | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number[][] | null>(null);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200 overflow-hidden relative">
      <div className="w-full h-full">
        <ControlPanel
          separate={separate}
          setSeparate={setSeparate}
          magicCube={magicCube}
          setMagicCube={setMagicCube}
          setResult={setResult}
          setHighlightIndex={setHighlightIndex}
        />
        <ReplayPanel
          magicCube={magicCube}
          setMagicCube={setMagicCube}
          result={result}
          setHighlightIndex={setHighlightIndex}
        />
        <Scene
          separate={separate}
          magicCube={magicCube}
          highlightIndex={highlightIndex}
        />
      </div>
    </div>
  );
};

export default App;
