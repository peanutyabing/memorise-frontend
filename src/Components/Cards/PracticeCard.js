import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePracticeSettings from "../../Hooks/usePracticeSettings";
import { Button } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";

export default function PracticeCard() {
  let { cardIndex } = useParams();
  const navigate = useNavigate();
  const { practiceSettings, setPracticeSettings } = usePracticeSettings();

  const [showOtherSide, setShowOtherSide] = useState(false);

  const currentCard = practiceSettings?.cards[cardIndex - 1];

  const displayCardSide = () => {
    if (
      (practiceSettings?.seeBackFirst && showOtherSide) ||
      (!practiceSettings?.seeBackFirst && !showOtherSide)
    ) {
      return currentCard?.front;
    } else if (
      (practiceSettings?.seeBackFirst && !showOtherSide) ||
      (!practiceSettings?.seeBackFirst && showOtherSide)
    ) {
      return currentCard?.back;
    }
  };

  const displayButtons = () => {
    if (!showOtherSide) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="red"
            onClick={() => {
              flipCard(false);
            }}
          >
            <QuestionMarkCircleIcon className="h-5 w-5" strokeWidth={2} /> I'm
            not sure
          </Button>
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="green"
            onClick={() => {
              flipCard(true);
            }}
          >
            <CheckCircleIcon className="h-5 w-5" strokeWidth={2} /> I know this
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="green"
            fullWidth
            onClick={() => {
              goToNextCard();
            }}
          >
            Next <ForwardIcon className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>
      );
    }
  };

  const flipCard = (known) => {
    const cardsQueue = [...practiceSettings?.cards];
    if (!known) {
      cardsQueue.push(currentCard);
      setPracticeSettings((prev) => ({ ...prev, cards: cardsQueue }));
    }
    setShowOtherSide(true);
  };

  const goToNextCard = () => {
    setShowOtherSide(false);
    cardIndex++;
    if (cardIndex <= practiceSettings?.cards?.length) {
      navigate(`../${cardIndex}`);
    } else {
      navigate("../practice-summary");
    }
  };

  return (
    <div>
      <div className="relative my-6 mx-auto w-[340px] xs:w-[400px] h-64 xs:text-xl">
        <div className="absolute left-2 top-2 flex flex-col items-center justify-center w-[340px] xs:w-[400px] h-64 p-4 bg-pale-100 dark:bg-pale-800"></div>
        <div className="absolute left-0 top-0 flex flex-col items-center justify-center w-[340px] xs:w-[400px] h-64 p-4 outline outline-2 outline-white dark:outline-black bg-blue-gray-100 dark:bg-blue-gray-900">
          {displayCardSide()}
        </div>
      </div>
      {displayButtons()}
    </div>
  );
}
