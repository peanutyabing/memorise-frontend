import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartDataLabels
);

ChartJS.defaults.font.size = 13;
ChartJS.defaults.font.family = "Quicksand";

export default function SummaryBarChart({ roundStats, maxY }) {
  const labels = roundStats?.map((card) => card.front);
  const nSeen = roundStats?.map((card) => card.nSeenThisRound);
  const nCorrect = roundStats?.map((card) => card.nCorrectThisRound);

  const options = {
    responsive: true,
    scales: {
      y: {
        display: false,
        min: 0,
        max: maxY,
      },
      x: {
        ticks: {
          color: "#9e9e9e",
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#9e9e9e",
        formatter: Math.round,
        anchor: "end",
        offset: -20,
        align: "start",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "No. of times seen",
        data: nSeen,
        backgroundColor: "#9e9e9e",
      },
      {
        label: "No. of times selected 'I know this'",
        data: nCorrect,
        backgroundColor: "#4caf50",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
