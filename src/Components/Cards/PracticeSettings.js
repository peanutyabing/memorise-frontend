import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePracticeSettings from "../../Hooks/usePracticeSettings.js";
import { Button, Checkbox } from "@material-tailwind/react";

export default function PracticeSettings() {
  const navigate = useNavigate();
  const { setPracticeSettings } = usePracticeSettings();
  const [seeBackFirst, setSeeBackFirst] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPracticeSettings((prev) => ({
      ...prev,
      seeBackFirst,
      shuffled,
      practiceStarted: true,
    }));
    if (shuffled) {
      setPracticeSettings((prev) => ({
        ...prev,
        cardsQueue: shuffle(prev.cardsQueue),
      }));
    }
    navigate("../1");
  };

  const shuffle = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  return (
    <form
      className="my-6 mx-auto w-11/12 max-w-4xl flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <Checkbox
        label={
          <div className="flex items-center text-black dark:text-white">
            See the back of cards first
          </div>
        }
        containerProps={{ className: "-ml-2.5" }}
        color="orange"
        checked={seeBackFirst}
        onChange={() => {
          setSeeBackFirst((prevState) => !prevState);
        }}
      />
      <Checkbox
        label={
          <div className="flex items-center text-black dark:text-white">
            Shuffle this deck
          </div>
        }
        containerProps={{ className: "-ml-2.5" }}
        color="orange"
        checked={shuffled}
        onChange={() => {
          setShuffled((prevState) => !prevState);
        }}
      />

      <Button
        className="mt-4 font-quicksand text-sm"
        type="submit"
        color="orange"
      >
        I'm ready!
      </Button>
    </form>
  );
}
