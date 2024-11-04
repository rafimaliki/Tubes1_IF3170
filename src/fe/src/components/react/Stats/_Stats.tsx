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
        <p className="w-full text-center">Statistics</p>
        <div>
          {result?.ExecutionTimeInMS ? (
            <DataLabel
              label="Execution Time"
              value={result.ExecutionTimeInMS}
            />
          ) : null}
          {result?.ObjectiveFunctions ? (
            <DataLabel
              label="Objective Functions"
              value={
                result.ObjectiveFunctions[result.ObjectiveFunctions.length - 1]
              }
            />
          ) : null}
          {result?.LocalOptimum ? (
            <DataLabel label="Local Optimum" value={result.LocalOptimum} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Stats;
