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

  return (
    <div className="my-6 mx-auto w-full xs:w-11/12 max-w-4xl flex flex-col items-center">
      <div className="flex items-end font-semibold mb-6">
        Well done! You earned{" "}
        <span className="underline decoration-yellow underline-offset-4 text-xl ml-2">
          {5 * practiceSettings?.nCards} XP
        </span>
      </div>
      <div className="mb-2">Stats from this round:</div>
      <SummaryChart roundStats={practiceSettings?.cards} />
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
