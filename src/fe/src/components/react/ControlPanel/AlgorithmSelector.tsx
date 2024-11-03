import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import SetState from "@/class/Types";
import Config from "@/class/Config";

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: SetState<string>;
}

const AlgorithmSelector = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
}: AlgorithmSelectorProps) => {
  return (
    <div>
      <p className="w-full px-2 mb-2 mt-5 cursor-default">Algorithm :</p>
      <div className="mx-2 ">
        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Algorithm" />
          </SelectTrigger>
          <SelectContent>
            {Config.algorithms.map((algorithm) => (
              <SelectItem key={algorithm.endpoint} value={algorithm.endpoint}>
                {algorithm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
