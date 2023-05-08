import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import OneDeck from "./OneDeck.js";

export default function MyDecks() {
  const [userDecks, setUserDecks] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getUserDecks();
  }, []);

  const getUserDecks = async () => {
    const decksRes = await axiosPrivate.get("/decks");
    setUserDecks(decksRes.data);
  };

  return (
    <div className="h-screen pt-20 h-max bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <main className="flex flex-wrap justify-evenly items-center">
        {userDecks.map((deck) => (
          <OneDeck key={deck.id} deckInfo={deck} />
        ))}
      </main>
    </div>
  );
}
