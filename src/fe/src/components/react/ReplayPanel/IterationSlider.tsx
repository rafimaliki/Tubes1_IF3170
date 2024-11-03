import React, { useCallback, useEffect, useRef } from "react";
import MagicCube from "@/class/MagicCube";
import Result from "@/class/Result";
import SetState from "@/class/Types";
import { Slider } from "@/components/ui/Slider";

interface IterationSliderProps {
  setMagicCube: SetState<MagicCube>;
  maxValue: number;
  iter: number;
  setIter: SetState<number>;
  result: any;
  setHighlightIndex: SetState<number[][] | null>;
}

const IterationSlider = ({
  iter,
  setIter,
  maxValue,
  setMagicCube,
  result,
  setHighlightIndex,
}: IterationSliderProps) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const resultRef = useRef(result);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const handleSlide = useCallback(
    (value: number[]) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        // console.log("Iterations:", value[0]);
        setMagicCube(resultRef.current.MagicCubes[value[0]]);
        if (value[0] !== 0) {
          setHighlightIndex(resultRef.current.IndexChange[value[0] - 1]);
        } else {
          setHighlightIndex(null);
        }
      }, 300);
      setIter(value[0]);
    },
    [setIter]
  );

  return (
    <div className="w-[97%] mt-3">
      <Slider
        value={[iter]}
        max={maxValue}
        step={1}
        onValueChange={handleSlide}
      />
    </div>
  );
};

export default IterationSlider;
