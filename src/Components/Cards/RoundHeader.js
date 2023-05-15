import { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { axiosDefault } from "../../Utils/axios.js";
import useRoundSettings from "../../Hooks/useRoundSettings.js";
import { Chip } from "@material-tailwind/react";

export default function RoundHeader() {
  const navigate = useNavigate();
  const { deckId, mode } = useParams();
  const { roundSettings, setRoundSettings } = useRoundSettings();

  const chipColorChart = {
    1: "light-green",
    2: "green",
    3: "orange",
    4: "red",
    5: "purple",
  };

  useEffect(() => {
    if (!["practice", "challenge"].includes(mode)) {
      navigate("/lost", { replace: true });
    }
  }, []);

  useEffect(() => {
    pullDeckData();
    pullCardsData();
  }, []);

  const pullDeckData = async () => {
    try {
      const currentDeck = await axiosDefault.get(`/decks/${deckId}`);
      setRoundSettings((prev) => ({ ...prev, deck: currentDeck?.data }));
    } catch (err) {
      console.log(err);
      alert(`Having troubel finding this deck. ${err.message}`);
    }
  };

  const pullCardsData = async () => {
    try {
      const currentDeckCardsRes = await axiosDefault.get(`/cards/${deckId}`);
      const currentDeckCards = currentDeckCardsRes?.data;
      currentDeckCards.forEach((card) => {
        card.nSeenThisRound = 0;
        card.nCorrectThisRound = 0;
      });

      // Sorted by the card's % correct, in descending order, i.e. hardest cards last
      const sortedCards = currentDeckCards.sort(
        (card, nextCard) =>
          (card.numberOfTimesSeen / card.numberOfTimesCorrect || 0) -
          (nextCard.numberOfTimesSeen / nextCard.numberOfTimesCorrect || 0)
      );

      setRoundSettings((prev) => ({
        ...prev,
        cards: currentDeckCards,
        cardsQueue: sortedCards,
        nCards: sortedCards.length,
      }));
    } catch (err) {
      console.log(err);
      alert(`Having troubel finding cards under this deck. ${err.message}`);
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-center text-xl font-medium mb-2">
        {mode[0].toUpperCase() + mode.slice(1)}
      </h1>
      <div className="flex items-center text-sm">
        {roundSettings?.nCards} {roundSettings?.nCards > 1 ? "cards" : "card"}{" "}
        in {roundSettings?.deck?.language?.name}{" "}
        <Chip
          className="ml-2"
          color={chipColorChart[roundSettings?.deck?.difficultyLevel?.id]}
          value={roundSettings?.deck?.difficultyLevel?.name || ""}
          size="sm"
        />
      </div>
      <Outlet />
    </div>
  );
}
