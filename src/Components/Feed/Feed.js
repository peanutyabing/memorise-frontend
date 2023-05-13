import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import { axiosDefault } from "../../Utils/axios.js";
import Leaderboard from "./Leaderboard.js";
import OneDeck from "./OneDeck.js";

export default function Feed() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [decksInFeed, setDecksInFeed] = useState([]);
  const [nonInterestDecks, setNonInterestDecks] = useState([]);
  const [displayNonInterestDecks, setDisplayNonInterestDecks] = useState(false);

  useEffect(() => {
    if (auth.token) {
      getDecksOfInterest();
      getDecksOutsideOfInterests();
    } else {
      getAllDecks();
    }
  }, []);

  const getDecksOfInterest = async () => {
    const decksRes = await axiosPrivate.get("/feed/of-interest");
    setDecksInFeed(decksRes?.data);
  };

  const getDecksOutsideOfInterests = async () => {
    const decksRes = await axiosPrivate.get("/feed/outside-of-interests");
    setNonInterestDecks(decksRes?.data);
  };

  const getAllDecks = async () => {
    const decksRes = await axiosDefault.get("/feed/all");
    setDecksInFeed(decksRes?.data);
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <div className="flex flex-col items-center mx-auto w-full">
        <div className="pt-3 -mt-4 flex flex-col items-center w-full bg-pale-100 dark:bg-pale-800">
          <div className="font-semibold mb-2">Leaderboard</div>
          <Leaderboard />
        </div>
        <div className="mt-4 flex flex-col items-center w-full max-w-xl ">
          <div className="w-full text-left font-semibold">
            See what others are learning:
          </div>
          {decksInFeed?.map((deck) => (
            <OneDeck key={deck.id} deckInfo={deck} />
          ))}
          {displayNonInterestDecks &&
            nonInterestDecks?.map((deck) => (
              <OneDeck key={deck.id} deckInfo={deck} />
            ))}
          {nonInterestDecks?.length > 0 && (
            <div
              className="mt-2 cursor-pointer select-none text-sm italic hover:underline hover:text-sky-500"
              onClick={() => {
                setDisplayNonInterestDecks((prev) => !prev);
              }}
            >
              {displayNonInterestDecks
                ? "See fewer decks"
                : "Explore more decks"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
