import { useNavigate } from "react-router-dom";
import moment from "moment";
import DifficultyRating from "../Decks/DifficultyRating";
import CardsPreview from "../Decks/CardsPreview";
import { Button, Tooltip } from "@material-tailwind/react";
import { HeartIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

export default function OneDeck({ deckInfo }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 my-2 w-full min-h-fit p-2 rounded-lg outline outline-1 outline-yellow ">
      {/* User Info */}
      <div className="flex flex-col items-center justify-center h-full w-fit my-auto ml-1 cursor-pointer">
        <img
          src={deckInfo?.user?.imageUrl}
          alt=""
          className="rounded-full h-10 w-10 outline outline-1 outline-gray-500/50"
        />
        <div className="text-sm hover:text-sky-500 hover:underline select-none">
          {deckInfo?.user?.username}
          {/* //// Implement navigate to user profile */}
        </div>
      </div>

      {/* {Deck Info} */}
      <div className="flex flex-col justify-center w-full text-sm">
        <div className="font-semibold">{deckInfo?.language?.name}</div>
        <div className="flex items-center gap-3 mb-1">
          <DifficultyRating
            difficultyRating={deckInfo?.difficultyLevel?.id}
            difficultyLevel={deckInfo?.difficultyLevel?.name}
          />
          <div className="text-xs font-light">
            {moment(new Date(deckInfo?.createdAt)).fromNow()}
          </div>
        </div>

        <CardsPreview
          cards={deckInfo?.cards}
          deckId={deckInfo?.id}
          displayLimit={20}
          allowEdit={false}
        />
      </div>
    </div>
  );
}
