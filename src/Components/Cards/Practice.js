import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { axiosDefault } from "../../Utils/axios.js";
import usePracticeSettings from "../../Hooks/usePracticeSettings";
import { Chip } from "@material-tailwind/react";

export default function Practice() {
  const { deckId } = useParams();
  const { practiceSettings, setPracticeSettings } = usePracticeSettings();

  const chipColorChart = {
    1: "light-green",
    2: "green",
    3: "orange",
    4: "red",
    5: "purple",
  };

  useEffect(() => {
    pullDeckData();
    pullCardsData();
  }, []);

  const pullDeckData = async () => {
    try {
      const currentDeck = await axiosDefault.get(`/decks/${deckId}`);
      setPracticeSettings((prev) => ({ ...prev, deck: currentDeck?.data }));
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

      setPracticeSettings((prev) => ({
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
      <h1 className="text-center text-xl font-medium mb-2">Practice</h1>
      <div className="flex items-center text-sm">
        {practiceSettings?.nCards}{" "}
        {practiceSettings?.nCards > 1 ? "cards" : "card"} in{" "}
        {practiceSettings?.deck?.language?.name}{" "}
        <Chip
          className="ml-2"
          color={chipColorChart[practiceSettings?.deck?.difficultyLevel?.id]}
          value={practiceSettings?.deck?.difficultyLevel?.name || ""}
          size="sm"
        />
      </div>
      <Outlet />
    </div>
  );
}
