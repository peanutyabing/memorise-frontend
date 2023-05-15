import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

ChartJS.defaults.font.size = 13;
ChartJS.defaults.font.family = "Quicksand";

export default function SummaryDoughnutChart({ roundStats }) {
  const numCorrect = roundStats?.filter(
    (card) => card.nCorrectThisRound > 0
  )?.length;
  const numWrong = roundStats?.filter(
    (card) => card.nCorrectThisRound === 0
  )?.length;

  const options = {
    responsive: true,
    elements: {
      arc: {
        borderColor: "#ffffff00",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#ffffff",
      },
    },
  };

  const data = {
    labels: ["Wrong answer", "Correct answer"],
    datasets: [
      {
        data: [numWrong, numCorrect],
        backgroundColor: ["#ef5350", "#4caf50"],
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
}
