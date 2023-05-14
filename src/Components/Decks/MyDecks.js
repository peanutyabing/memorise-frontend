import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import usePracticeSettings from "../../Hooks/usePracticeSettings.js";
import OneDeck from "./OneDeck.js";
import { Button, Tooltip } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ReactComponent as OpenAILogo } from "../../Images/openai-white-logomark.svg";

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
            <div className="font-semibold">Add a new deck</div>
            <Tooltip
              content={
                <div className="w-64">
                  <div color="white" className="font-medium">
                    Rely on your knowledge
                  </div>
                  <div
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    Earn 5 XP for each new card you make.
                  </div>
                </div>
              }
              placement="top"
            >
              <Button
                color="orange"
                className="h-11 w-56 mt-4 flex items-center justify-center gap-2"
                onClick={() => {
                  navigate("./new");
                }}
              >
                <PencilSquareIcon className="w-5 h-5" /> Make your own
              </Button>
            </Tooltip>
            <Tooltip
              content={
                <div className="w-64">
                  <div color="white" className="font-medium">
                    Get some help
                  </div>
                  <div
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    An AI assistant makes the cards. You can customize them.
                  </div>
                </div>
              }
              placement="top"
            >
              <Button
                color="orange"
                className="h-11 w-56 mt-4 flex items-center justify-center gap-2"
                onClick={() => {
                  navigate("./ai-assistant");
                }}
              >
                <OpenAILogo className="w-6 h-6" /> Generate with OpenAI
              </Button>
            </Tooltip>
          </div>
        </div>
      </main>
    </div>
  );
}
