import { useState, useEffect } from "react";
import SetState from "@/class/Types";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import IterationSlider from "./IterationSlider";
import Config from "@/class/Config";
import { smoothScroll } from "@/js/smoothScroll";

interface ReplayPanelProps {
  magicCube: MagicCube;
  setMagicCube: SetState<MagicCube>;
  result: Result | null;
  setHighlightIndex: SetState<number[][] | null>;
  statsRef: React.RefObject<HTMLDivElement>;
}

const ReplayPanel = ({
  magicCube,
  setMagicCube,
  result,
  setHighlightIndex,
  statsRef,
}: ReplayPanelProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [iter, setIter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(2);

  useEffect(() => {
    if (!result) {
      setIsVisible(false);
    } else {
      setIter(result?.MaxIteration ?? 0);
      setIsVisible(true);
    }
  }, [result]);

  const handleNext = () => {
    setIter((prevIter) => {
      const newIter = Math.min(prevIter + 1, result?.MaxIteration ?? 0);
      setHighlightIndex(result?.IndexChange[newIter - 1] ?? null);
      if (result && result.MagicCubes) {
        setMagicCube(result.MagicCubes[newIter] ?? magicCube);
      }
      return newIter;
    });
  };

  const handlePrev = () => {
    setIter((prevIter) => {
      const newIter = Math.max(prevIter - 1, 0);
      setHighlightIndex(result?.IndexChange[newIter - 1] ?? null);
      if (result && result.MagicCubes) {
        setMagicCube(result.MagicCubes[newIter] ?? magicCube);
      }
      return newIter;
    });
  };

  const handlePlay = () => {
    if (playInterval) {
      clearInterval(playInterval);
      setPlayInterval(null);
    } else {
      startPlayInterval(playbackSpeed);
    }
  };

  const startPlayInterval = (speed: number) => {
    if (playInterval) clearInterval(playInterval);

    // console.log("playbackSpeed", speed);
    // console.log("delay", 100 / Config.playbackSpeeds[speed]);

    const intervalId = setInterval(() => {
      setIter((prevIter) => {
        const newIter = prevIter + 1;
        if (newIter >= (result?.MaxIteration ?? 0)) {
          clearInterval(intervalId);
          setPlayInterval(null);
          return prevIter;
        }
        setHighlightIndex(result?.IndexChange[newIter - 1] ?? null);
        if (result && result.MagicCubes) {
          setMagicCube(result.MagicCubes[newIter] ?? magicCube);
        }
        return newIter;
      });
    }, 100 / Config.playbackSpeeds[speed]);
    setPlayInterval(intervalId);
  };

  const handleSpeed = () => {
    // console.log("oldSpeed", playbackSpeed);
    const newSpeed = (playbackSpeed + 1) % Config.playbackSpeeds.length;
    // console.log("newSpeed", newSpeed);
    setPlaybackSpeed(newSpeed);

    if (playInterval) {
      clearInterval(playInterval);
      startPlayInterval(newSpeed);
    }
  };

  return (
    <div
      className={`flex flex-col justify-start items-center absolute z-20 duration-500 w-[80%] h-20 bg-white border rounded-md shadow-2xl 
      left-1/2 bottom-2 transform -translate-x-1/2 transition-all
      ${isHidden ? "translate-y-12" : ""}
      ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full">
        <button
          onClick={() => setIsHidden((prev) => !prev)}
          className="absolute left-2 top-2 z-30"
        >
          <p
            className={`text-neutral-300 hover:text-neutral-500 transition-transform duration-500 font-extrabold px-2 rounded-lg hover:bg-neutral-200 ${
              isHidden ? "-rotate-90" : "rotate-90"
            }`}
          >
            &gt;
          </p>
        </button>
        <div
          className={`relative flex items-center w-full transition-opacity mt-2 duration-500 ${
            isHidden ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="ml-10 font-bold font-sans cursor-default text-lg">
            Iteration: {iter}; Score: {result?.ObjectiveFunctions[iter]}
          </p>

          <div className="flex gap-2 ml-auto mr-4">
            <button
              onClick={() => smoothScroll(statsRef)}
              className="btn-replay ml-10"
            >
              Show Statistics
            </button>
            <button onClick={handlePlay} className="btn-replay">
              {playInterval ? "Stop" : "Play"}
            </button>
            <button onClick={handleSpeed} className="btn-replay">
              Speed: {Config.playbackSpeeds[playbackSpeed]}x
            </button>
            <button onClick={handlePrev} className="btn-replay">
              Prev
            </button>
            <button onClick={handleNext} className="btn-replay">
              Next
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-full flex justify-center transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <IterationSlider
          iter={iter}
          setIter={setIter}
          maxValue={result?.MaxIteration ?? 0}
          setMagicCube={setMagicCube}
          result={result}
          setHighlightIndex={setHighlightIndex}
        />
      </div>
    </div>
  );
};

export default ReplayPanel;
