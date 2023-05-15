import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRoundSettings from "../../Hooks/useRoundSettings.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import useUser from "../../Hooks/useUser.js";
import { Input, Button } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function OneCardInChallenge() {
  let { cardIndex } = useParams();
  const navigate = useNavigate();
  const { roundSettings, setRoundSettings } = useRoundSettings();
  const axiosPrivate = useAxiosPrivate();
  const { setUser } = useUser();

  const [showAnswer, setShowAnswer] = useState(false);
  const [input, setInput] = useState("");

  const currentCard =
    roundSettings?.cards && roundSettings?.cards[cardIndex - 1];

  const displayCard = () => {
    if (!showAnswer) {
      return (
        <div className="relative my-6 mx-auto w-[340px] xs:w-[400px] h-64 xs:text-xl animate-enter-r">
          <div className="absolute left-2 top-2 flex flex-col items-center justify-center w-[340px] xs:w-[400px] h-64 p-4 bg-pale-100 dark:bg-pale-800"></div>
          <div className="absolute left-0 top-0 flex flex-col items-center justify-center text-center font-semibold w-[340px] xs:w-[400px] h-64 p-4 outline outline-2 outline-white dark:outline-black bg-blue-gray-50 dark:bg-blue-gray-900">
            <div className="h-4/6 flex flex-col justify-evenly">
              <div>
                {roundSettings?.seeBackFirst
                  ? currentCard?.back
                  : currentCard?.front}
              </div>
              <Input
                variant="static"
                color="orange"
                placeholder="Answer"
                autoFocus
                className="dark:text-white text-center"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setShowAnswer(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative my-6 mx-auto w-[340px] xs:w-[400px] h-64 xs:text-xl animate-flip-x">
          <div className="absolute left-2 top-2 flex flex-col items-center justify-center w-[340px] xs:w-[400px] h-64 p-4 bg-pale-100 dark:bg-pale-800"></div>
          <div className="absolute left-0 top-0 flex flex-col items-center justify-center text-center font-semibold w-[340px] xs:w-[400px] h-64 p-4 outline outline-2 outline-white dark:outline-black bg-blue-gray-50 dark:bg-blue-gray-900">
            <div className="h-4/6 flex flex-col justify-evenly">
              <div>
                {checkAnswer(
                  input,
                  roundSettings?.seeBackFirst
                    ? currentCard?.front
                    : currentCard?.back
                )}
              </div>
              <div className="font-light text-sm text-blue-gray-800 dark:text-blue-gray-200">
                {roundSettings?.seeBackFirst
                  ? currentCard?.back
                  : currentCard?.front}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const checkAnswer = (guess, answer) => {
    const pattern = new RegExp(guess, "i");
    const guessPosition = answer.search(pattern);
    if (guessPosition >= 0) {
      return (
        <div>
          {answer.slice(0, guessPosition)}
          <span className="text-green-500">{guess.toLowerCase()}</span>
          {answer.slice(guessPosition + guess.length)}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-evenly h-4/6">
          <div className="text-red-500">{answer}</div>
          <div className="text-xs">
            <span className="font-light">Your guess:</span> {input}
          </div>
        </div>
      );
    }
  };

  const displayButtons = () => {
    if (!showAnswer) {
      return (
        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="orange"
            onClick={() => {
              setShowAnswer(true);
            }}
          >
            <CheckCircleIcon className="h-5 w-5" strokeWidth={2} /> Check Answer
          </Button>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="red"
            onClick={() => {
              setInput("");
              updateRoundStats(false);
              updateBackendCardData(false);
              goToNextCard();
            }}
          >
            <XMarkIcon className="h-5 w-5" strokeWidth={2} /> I got it wrong
          </Button>
          <Button
            className="flex items-center justify-center gap-2 mt-4 font-quicksand text-sm"
            color="green"
            onClick={() => {
              setInput("");
              updateRoundStats(true);
              updateBackendCardData(true);
              goToNextCard();
            }}
          >
            <CheckIcon className="h-5 w-5" strokeWidth={2} /> I was right
          </Button>
        </div>
      );
    }
  };

  const updateRoundStats = (wasGuessCorrect) => {
    const statsToUpdate = [...roundSettings?.cards];
    for (const card of statsToUpdate) {
      if (card.id === currentCard.id) {
        card.nSeenThisRound += 1;
        if (wasGuessCorrect) {
          card.nCorrectThisRound += 1;
        }
      }
    }
    setRoundSettings((prev) => ({ ...prev, cards: statsToUpdate }));
  };

  const updateBackendCardData = async (wasGuessCorrect) => {
    const reqBody = {};
    // Get the latest card data from database
    try {
      const currentCardRes = await axiosPrivate.get(
        `/cards/${roundSettings?.deck?.id}/${currentCard?.id}`
      );
      reqBody.numberOfTimesSeen = currentCardRes?.data?.numberOfTimesSeen + 1;
      reqBody.lastSeen = new Date();
      if (wasGuessCorrect) {
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
    setShowAnswer(false);
    cardIndex++;
    if (cardIndex <= roundSettings?.cards?.length) {
      navigate(`../${cardIndex}/c`);
    } else {
      const numberOfCardsCorrect = roundSettings?.cards?.filter(
        (card) => card.nCorrectThisRound > 0
      ).length;
      incrementXp(numberOfCardsCorrect);
      navigate("../summary");
    }
  };

  const incrementXp = async (numberOfCardsCorrect) => {
    try {
      await axiosPrivate.post("/xp", {
        xpActivityId: 5,
        numOfUnits: numberOfCardsCorrect,
      });
    } catch (err) {
      console.log(err);
      alert(`Something went wrong while updating your XP. ${err.message}`);
    }
    updateUserXpDisplay();
  };

  const updateUserXpDisplay = async () => {
    try {
      const updatedProfileRes = await axiosPrivate.get("/profile");
      setUser((prev) => ({ ...prev, xp: updatedProfileRes?.data?.xp }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {displayCard()}
      {displayButtons()}
    </div>
  );
}
