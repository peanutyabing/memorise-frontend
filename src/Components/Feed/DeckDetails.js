import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosDefault } from "../../Utils/axios";
import moment from "moment";
import DifficultyRating from "../Decks/DifficultyRating.js";
import { LinkIcon } from "@heroicons/react/24/outline";
import { HeartIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import { Button, ButtonGroup, Tooltip } from "@material-tailwind/react";

export default function DeckDetails() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deckInfo, setDeckInfo] = useState({});
  const [cardsInfo, setCardsInfo] = useState([]);

  useEffect(() => {
    pulldeckInfo();
    pullCardsData();
  }, []);

  const pulldeckInfo = async () => {
    try {
      const currentDeck = await axiosDefault.get(`/decks/${deckId}`);
      setDeckInfo(currentDeck?.data);
    } catch (err) {
      console.log(err);
      alert(`Having troubel finding this deck. ${err.message}`);
    }
  };

  const pullCardsData = async () => {
    try {
      const currentDeckCardsRes = await axiosDefault.get(`/cards/${deckId}`);
      setCardsInfo(currentDeckCardsRes?.data);
    } catch (err) {
      console.log(err);
      alert(`Having troubel finding cards under this deck. ${err.message}`);
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Deck Info */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="font-semibold">{deckInfo?.language?.name}</div>
          <div className="flex items-center text-sm mr-2 hover:text-sky-500 hover:underline select-none cursor-pointer">
            <LinkIcon className="h-3 w-3 mr-1" />
            <span className="font-semibold">
              {deckInfo?.user?.username}
              {/* //// Implement navigate to user profile */}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <DifficultyRating
            difficultyRating={deckInfo?.difficultyLevel?.id}
            difficultyLevel={deckInfo?.difficultyLevel?.name}
          />
          <div className="text-xs font-light">
            {moment(new Date(deckInfo?.createdAt)).fromNow()}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-3 mx-auto max-w-md text-xs font-semibold">
          <div className="flex justify-center w-36 mt-4">Front</div>
          <div className="flex justify-center w-36 mt-4">Back</div>
        </div>
        {cardsInfo.map((card) => (
          <div
            key={card.id}
            className="grid grid-cols-2 gap-3 mx-auto max-w-md text-sm text-center"
          >
            <div
              key={`${card.id}-front`}
              className="w-40 h-24 flex items-center justify-center p-2 bg-pale-100 dark:bg-pale-800 border-r	border-b border-pale-800 dark:border-pale-100"
            >
              {card.front}
            </div>
            <div
              key={`${card.id}-back`}
              className="w-40 h-24 flex items-center justify-center p-2 bg-pale-200 dark:bg-pale-600 border-r border-b border-pale-800 dark:border-pale-100"
            >
              {card.back}
            </div>
          </div>
        ))}
      </div>

      {/* Interactions */}
      <div className="mt-4 flex justify-center">
        <ButtonGroup color="orange">
          <Button className="w-40 flex items-center justify-center" disabled>
            <HeartIcon className="w-4 h-4 mr-1" />
            Like
          </Button>

          <Button
            className="w-40 flex items-center justify-center"
            onClick={() => {
              navigate(`/my-decks/${deckId}/fork`);
            }}
          >
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-1" />
            <Tooltip
              content={
                <div className="w-64">
                  <div color="white" className="font-medium">
                    Knowledge is for sharing!
                  </div>
                  <div
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    Save this deck as your own. Others can fork it from you,
                    too.
                  </div>
                </div>
              }
              placement="top"
            >
              Fork
            </Tooltip>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
