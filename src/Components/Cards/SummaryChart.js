import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color =
  document.documentElement.classList[0] === "dark" ? "#f8f7f3" : "#16181b";
ChartJS.defaults.font.size = 13;
ChartJS.defaults.font.family = "Quicksand";

export function SummaryChart({ roundStats }) {
  const labels = roundStats?.map((card) => card.front);
  const nSeen = roundStats?.map((card) => card.nSeenThisRound);
  const nCorrect = roundStats?.map((card) => card.nCorrectThisRound);

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: Math.max(...nSeen),
        stepSize: 1,
        ticks: {
          precision: 0,
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
      x: {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
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
