import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import usePracticeSettings from "../../Hooks/usePracticeSettings.js";
import OneDeck from "./OneDeck.js";
import { Button, Tooltip } from "@material-tailwind/react";

export default function MyDecks() {
  const [userDecks, setUserDecks] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setPracticeSettings } = usePracticeSettings();

  useEffect(() => {
    getUserDecks();
  }, []);

  useEffect(() => {
    // Clear the practice round data in Context
    setPracticeSettings({});
  }, []);

  const getUserDecks = async () => {
    const decksRes = await axiosPrivate.get("/decks");
    setUserDecks(decksRes.data);
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <main className="container mx-auto">
        <div className="justify-items-center grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userDecks.map((deck) => (
            <OneDeck key={deck.id} deckInfo={deck} />
          ))}

          <div className="flex flex-col items-center justify-center my-3 mx-3 w-[360px] xs:w-[400px] h-64 min-h-fit p-4 rounded-lg bg-pale-100 dark:bg-pale-800">
            <div className="font-semibold">Make a deck and earn XPs</div>
            <Tooltip
              content={
                <div className="w-64">
                  <div color="white" className="font-medium">
                    Expand your knowledge
                  </div>
                  <div
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    Earn 5 XP for each new card.
                  </div>
                </div>
              }
              placement="bottom"
            >
              <Button
                color="orange"
                className="w-3/6 mt-4"
                onClick={() => {
                  navigate("./new");
                }}
              >
                New Deck
              </Button>
            </Tooltip>
          </div>
        </div>
      </main>
    </div>
  );
}
