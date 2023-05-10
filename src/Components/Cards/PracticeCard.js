import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePracticeSettings from "../../Hooks/usePracticeSettings.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
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
  const axiosPrivate = useAxiosPrivate();

  const [showOtherSide, setShowOtherSide] = useState(false);

  const currentCard = practiceSettings?.cardsQueue[cardIndex - 1];

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
    const cardsQueueToUpdate = [...practiceSettings?.cardsQueue];
    if (!known) {
      cardsQueueToUpdate.push(currentCard);
      setPracticeSettings((prev) => ({
        ...prev,
        cardsQueue: cardsQueueToUpdate,
      }));
    }
    setShowOtherSide(true);
    updateRoundStats(known);
    updateBackendCardData(known);
  };

  const updateRoundStats = (known) => {
    const statsToUpdate = [...practiceSettings.cards];
    for (const card of statsToUpdate) {
      if (card.id === currentCard.id) {
        card.nSeenThisRound += 1;
        if (known) {
          card.nCorrectThisRound += 1;
        }
      }
    }
    setPracticeSettings((prev) => ({ ...prev, cards: statsToUpdate }));
  };

  const updateBackendCardData = async (known) => {
    const reqBody = {};
    // Get the latest card data from database
    try {
      const currentCardRes = await axiosPrivate.get(
        `/cards/${practiceSettings?.deck?.id}/${currentCard?.id}`
      );
      reqBody.numberOfTimesSeen = currentCardRes?.data?.numberOfTimesSeen + 1;
      reqBody.lastSeen = new Date();
      if (known) {
        reqBody.numberOfTimesCorrect =
          currentCardRes?.data?.numberOfTimesCorrect + 1;
      }
    } catch (err) {
      console.log("While requesting for latest data of the current card", err);
    }
    // Send updated data back to database
    try {
      await axiosPrivate.put(`/cards/${currentCard?.id}`, reqBody);
    } catch (err) {
      console.log(
        "While requesting for an update of card data on the backend",
        err
      );
    }
  };

  const goToNextCard = () => {
    setShowOtherSide(false);
    cardIndex++;
    if (cardIndex <= practiceSettings?.cardsQueue?.length) {
      navigate(`../${cardIndex}`);
    } else {
      navigate("../summary");
    }
  };

  return (
    <div>
      <div className="relative my-6 mx-auto w-[340px] xs:w-[400px] h-64 xs:text-xl">
        <div className="absolute left-2 top-2 flex flex-col items-center justify-center w-[340px] xs:w-[400px] h-64 p-4 bg-pale-100 dark:bg-pale-800"></div>
        <div className="absolute left-0 top-0 flex flex-col items-center justify-center text-center font-semibold w-[340px] xs:w-[400px] h-64 p-4 outline outline-2 outline-white dark:outline-black bg-blue-gray-100 dark:bg-blue-gray-900">
          {displayCardSide()}
        </div>
      </div>
      {displayButtons()}
    </div>
  );
}
