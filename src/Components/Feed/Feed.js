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

  useEffect(() => {
    if (auth.token) {
      getDecksOfInterest();
    } else {
      getAllDecks();
    }
  }, []);

  const getDecksOfInterest = async () => {
    const decksRes = await axiosPrivate.get("/feed/of-interest");
    setDecksInFeed(decksRes?.data);
  };

  const getAllDecks = async () => {
    const decksRes = await axiosDefault.get("/feed/all");
    setDecksInFeed(decksRes?.data);
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <div className="flex flex-col items-center mx-auto w-full">
        {/* <div className="w-full">
          This is a listing of everyone's decks which are *public*
        </div>
        <div className="w-full">
          It should be ranked by languages, prioritising the ones the user
          listed as interests, least proficient first
        </div> */}
        <div className="pt-6 -mt-4 flex flex-col items-center w-full bg-pale-100 dark:bg-pale-800">
          <div className="text-xl font-semibold mb-2">Leaderboard</div>
          <Leaderboard />
        </div>
        <div className="mt-4 flex flex-col items-center w-full max-w-xl ">
          <div className="w-full text-left font-semibold">
            See what other users are learning:
          </div>
          {decksInFeed.map((deck) => (
            <OneDeck key={deck.id} deckInfo={deck} />
          ))}
        </div>
      </div>
    </div>
  );
}
