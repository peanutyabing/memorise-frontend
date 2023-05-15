import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRoundSettings from "../../Hooks/useRoundSettings.js";
import SummaryBarChart from "./SummaryBarChart.js";
import SummaryDoughnutChart from "./SummaryDoughnutChart.js";
import { Button } from "@material-tailwind/react";

export default function RoundSummary() {
  const navigate = useNavigate();
  const { mode } = useParams();
  const { roundSettings } = useRoundSettings();

  useEffect(() => {
    if (roundSettings && !roundSettings.roundStarted) {
      navigate("/my-decks");
    }
  }, []);

  const generateBarChart = () => {
    const maxY =
      Math.max(...roundSettings?.cards?.map((card) => card.nSeenThisRound)) + 1;
    if (roundSettings?.nCards > 10) {
      return (
        <>
          <SummaryBarChart
            roundStats={roundSettings?.cards.slice(
              0,
              roundSettings?.nCards / 2
            )}
            maxY={maxY}
          />
          <SummaryBarChart
            roundStats={roundSettings?.cards.slice(roundSettings?.nCards / 2)}
            maxY={maxY}
          />
        </>
      );
    }
    if (roundSettings?.nCards > 20) {
      return (
        <>
          <SummaryBarChart
            roundStats={roundSettings?.cards.slice(
              0,
              roundSettings?.nCards / 3
            )}
            maxY={maxY}
          />
          <SummaryBarChart
            roundStats={roundSettings?.cards.slice(
              roundSettings?.nCards / 3,
              roundSettings?.nCards - roundSettings?.nCards / 3
            )}
            maxY={maxY}
          />
          <SummaryBarChart
            roundStats={roundSettings?.cards.slice(
              roundSettings?.nCards - roundSettings?.nCards / 3
            )}
            maxY={maxY}
          />
        </>
      );
    }
    return <SummaryBarChart roundStats={roundSettings?.cards} maxY={maxY} />;
  };

  const generateDoughnutChart = () => {
    return (
      <div className="max-w-sm my-2">
        <SummaryDoughnutChart roundStats={roundSettings?.cards} />
      </div>
    );
  };

  return (
    <div className="my-6 mx-auto w-full xs:w-11/12 max-w-4xl flex flex-col items-center">
      <div className="flex items-end font-semibold mb-6">
        Well done! You earned
        <span className="ml-2 text-xl text-orange-500 animate-heartbeat">
          {mode === "practice"
            ? 5 * roundSettings?.nCards
            : 10 *
              roundSettings?.cards?.filter((card) => card.nCorrectThisRound > 0)
                .length}{" "}
          XP
        </span>
      </div>
      <div className="mb-2">Stats from this round:</div>
      {mode === "practice" ? (
        <div className="grid grid-cols-2 gap-4 justify-items-center mt-4 -mb-6">
          <div className="flex items-center">
            <div className="w-10 h-4 bg-gray-500 mr-2"></div>
            <div className="text-xs">Seen</div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-4 bg-green-500 mr-2"></div>
            <div className="text-xs">"I know this"</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 justify-items-center my-4">
          <div className="flex items-center">
            <div className="w-10 h-4 bg-red-400 mr-2"></div>
            <div className="text-xs">Wrong</div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-4 bg-green-500 mr-2"></div>
            <div className="text-xs">Correct</div>
          </div>
          <div className="text-xs text-center">
            {roundSettings?.cards
              ?.filter((card) => card.nCorrectThisRound === 0)
              .map((card) => (
                <div key={card.id} className="grid grid-cols-2">
                  <div>{card.front}</div>
                  <div>{card.back}</div>
                </div>
              ))}
          </div>
          <div className="text-xs text-center">
            {roundSettings?.cards
              ?.filter((card) => card.nCorrectThisRound > 0)
              .map((card) => (
                <div key={card.id} className="grid grid-cols-2">
                  <div>{card.front}</div>
                  <div>{card.back}</div>
                </div>
              ))}
          </div>
        </div>
      )}
      {roundSettings?.cards && mode === "practice" && generateBarChart()}
      {roundSettings?.cards && mode === "challenge" && generateDoughnutChart()}
      <Button
        className="mt-6 font-quicksand text-sm"
        color="orange"
        size="sm"
        onClick={() => {
          navigate("/my-decks");
        }}
      >
        Practice More
      </Button>
    </div>
  );
}
