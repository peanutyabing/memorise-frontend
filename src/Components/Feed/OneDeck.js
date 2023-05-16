import { useNavigate } from "react-router-dom";
import moment from "moment";
import DifficultyRating from "../Decks/DifficultyRating";
import CardsPreview from "../Decks/CardsPreview";
import { HeartIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

export default function OneDeck({ deckInfo }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-3 my-2 w-[99%] min-h-fit p-2 rounded-lg outline outline-1 outline-yellow selection-none cursor-pointer hover:outline-2 hover:bg-pale-100 dark:hover:bg-pale-800"
      onClick={() => {
        navigate(`./${deckInfo?.id}`);
      }}
    >
      {/* User Info */}
      <div className="flex flex-col items-center justify-center h-full w-fit my-auto ml-1 select-none">
        <img
          src={deckInfo?.user?.imageUrl}
          alt=""
          className="rounded-full h-14 w-14 outline outline-1 outline-gray-500/50"
        />
        <div className="text-xs">@{deckInfo?.user?.username}</div>
      </div>

      {/* {Deck Info} */}
      <div className="flex flex-col justify-center w-full text-sm">
        <div className="font-semibold">{deckInfo?.language?.name}</div>
        <div className="flex items-center justify-between gap-3 mb-1">
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
        <div className="flex items-center justify-between select-none mt-1">
          <div className="flex gap-3">
            {/* <div className="flex items-center text-sm">
              <HeartIcon className="w-4 h-4 mr-1" />
              {deckInfo?.nLikes}
            </div> */}
            <div className="flex items-center text-sm">
              <ArrowDownOnSquareIcon className="w-4 h-4 mr-1" />
              {deckInfo?.nForks}
            </div>
          </div>
          {deckInfo?.userId !== deckInfo?.authorId && (
            <div className="text-xs text-gray-500">
              Forked from @{deckInfo?.author?.username}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
