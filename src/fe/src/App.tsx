import { useState, useRef } from "react";
import Scene from "@/components/threejs/Scene";
import ControlPanel from "@/components/react/ControlPanel/_ControlPanel";
import ReplayPanel from "@/components/react/ReplayPanel/_ReplayPanel";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import Stats from "@/components/react/Stats/_Stats";

const App = () => {
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

  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-[${
        result ? 2 : 1
      }00vh] bg-gray-200  `}
    >
      <div className="w-full h-screen overflow-hidden relative  ">
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
          statsRef={statsRef}
        />
        <Scene
          separate={separate}
          magicCube={magicCube}
          highlightIndex={highlightIndex}
        />
      </div>

      {true ? (
        <div
          ref={statsRef}
          className="w-full h-screen flex items-center justify-center "
        >
          <Stats result={result} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
