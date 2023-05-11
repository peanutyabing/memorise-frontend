import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePracticeSettings from "../../Hooks/usePracticeSettings.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import useUser from "../../Hooks/useUser.js";
import { SummaryChart } from "./SummaryChart.js";
import { Button } from "@material-tailwind/react";

export default function PracticeSummary() {
  const navigate = useNavigate();
  const { practiceSettings } = usePracticeSettings();
  const axiosPrivate = useAxiosPrivate();
  const { setUser } = useUser();

  useEffect(() => {
    incrementXp(practiceSettings?.nCards);
  }, []);

  const incrementXp = async (numberOfCards) => {
    const xpIncrement = 5 * numberOfCards;
    try {
      const updatedProfileRes = await axiosPrivate.put("/profile/xp", {
        xpIncrement,
      });
      setUser(updatedProfileRes.data);
    } catch (err) {
      console.log(err);
      alert(`Oops. We didn't manage to update your XP. ${err.message}`);
    }
  };

  const generateChartDisplay = () => {
    const maxY =
      Math.max(...practiceSettings?.cards?.map((card) => card.nSeenThisRound)) +
      1;
    if (practiceSettings?.nCards > 10) {
      return (
        <>
          <SummaryChart
            roundStats={practiceSettings?.cards.slice(
              0,
              practiceSettings?.nCards / 2
            )}
            maxY={maxY}
          />
          <SummaryChart
            roundStats={practiceSettings?.cards.slice(
              practiceSettings?.nCards / 2
            )}
            maxY={maxY}
          />
        </>
      );
    }
    if (practiceSettings?.nCards > 20) {
      return (
        <>
          <SummaryChart
            roundStats={practiceSettings?.cards.slice(
              0,
              practiceSettings?.nCards / 3
            )}
            maxY={maxY}
          />
          <SummaryChart
            roundStats={practiceSettings?.cards.slice(
              practiceSettings?.nCards / 3,
              practiceSettings?.nCards - practiceSettings?.nCards / 3
            )}
            maxY={maxY}
          />
          <SummaryChart
            roundStats={practiceSettings?.cards.slice(
              practiceSettings?.nCards - practiceSettings?.nCards / 3
            )}
            maxY={maxY}
          />
        </>
      );
    }
    return <SummaryChart roundStats={practiceSettings?.cards} maxY={maxY} />;
  };

  return (
    <div className="my-6 mx-auto w-full xs:w-11/12 max-w-4xl flex flex-col items-center">
      <div className="flex items-end font-semibold mb-6">
        Well done! You earned{" "}
        <span className="px-1 outline outline-2 outline-amber-500 bg-amber-500 dark:bg-amber-800 dark:outline-amber-800 rounded-md text-xl ml-2 animate-[pulse_1s_ease-in-out_5]">
          {5 * practiceSettings?.nCards} XP
        </span>
      </div>
      <div className="mb-2">Stats from this round:</div>
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
      {generateChartDisplay()}
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
