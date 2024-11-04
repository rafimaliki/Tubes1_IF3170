import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(CategoryScale, zoomPlugin);

interface DataPoint {
  iteration: number;
  objScore: number;
}

interface LineChartProps {
  values: number[];
  label: string;
}

const LineChart = ({ values, label }: LineChartProps) => {
  const scores = values;
  const data: DataPoint[] =
    scores?.map((score, i) => ({
      iteration: i,
      objScore: score,
    })) ?? [];

  const chartData = {
    labels: data.map((d) => d.iteration.toString()),
    datasets: [
      {
        label: label,
        data: data.map((d) => d.objScore),
        borderColor: "blue",
        borderWidth: 1,
        pointRadius: 0,
        lineTension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Iteration",
        },
        ticks: {
          maxTicksLimit: 20,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Objective Score",
        },
        beginAtZero: false,
        suggestedMin: Math.min(...data.map((d) => d.objScore)) - 1,
        suggestedMax: 0,
      },
    },
    // plugins: {
    //   zoom: {
    //     zoom: {
    //       wheel: {
    //         enabled: true,
    //       },
    //       pinch: {
    //         enabled: true,
    //       },
    //       mode: "xy",
    //     },
    //     pan: {
    //       enabled: true,
    //       mode: "xy",
    //     },
    //   },
    // },
  };

  return (
    <div className="w-full h-full bg-white shadow-lg p-6 rounded-md flex items-center justify-center">
      <Line data={chartData} options={options as any} />
    </div>
  );
};

export default LineChart;
