import LineChart from "@/components/chartjs/LineChart";
import Result from "@/class/Result";
import DataLabel from "./DataLabel";
interface StatsProps {
  result: Result | null;
}

const Stats = ({ result }: StatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center z-40 w-full h-screen">
      <div className="flex overflow-x-scroll w-[80%] h-[60%] snap-x snap-mandatory ">
        {result?.ObjectiveFunctions ? (
          <div className="snap-center w-full h-full flex-shrink-0">
            <LineChart
              values={result.ObjectiveFunctions}
              label="Objective Score"
            />
          </div>
        ) : null}
        {result?.DeltaE ? (
          <div className="snap-center w-full h-full flex-shrink-0">
            <LineChart values={result.DeltaE} label="Delta E Value" />
          </div>
        ) : null}
      </div>

      <div className="w-[80%] h-[20%] bg-white mt-2 rounded-md shadow-lg p-6">
        <p className="w-full text-center font-extrabold">Statistics</p>
        <div className="h-[90%] overflow-x-auto">
          {result?.ExecutionTimeInMS ? (
            <DataLabel
              label="Execution Time"
              value={`${result.ExecutionTimeInMS} ms`}
            />
          ) : null}
          {result?.ObjectiveFunctions ? (
            <DataLabel
              label="Final Score"
              value={
                result.ObjectiveFunctions[result.ObjectiveFunctions.length - 1]
              }
            />
          ) : null}
          {result?.LocalOptimum ? (
            <DataLabel label="Local Optimum" value={result.LocalOptimum} />
          ) : null}
          {result?.Iterations ? (
            <DataLabel label="Iterations" value={result.Iterations - 1} />
          ) : null}
          {result?.RestartCount ? (
            <DataLabel label="Restart Count" value={result.RestartCount} />
          ) : null}
          {result?.RestartPerIteration ? (
            <DataLabel
              label="Restart Per Iteration"
              value={result.RestartPerIteration.join(", ")}
            />
          ) : null}
          {result?.ObjectiveFunctionsMean ? (
            <DataLabel
              label="Objective Functions Mean"
              value={result.ObjectiveFunctionsMean.join(", ")}
            />
          ) : null}
          {result?.Population ? (
            <DataLabel label="Population" value={result.Population} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Stats;
