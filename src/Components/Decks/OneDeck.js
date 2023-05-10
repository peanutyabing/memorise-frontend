import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import {
  LinkIcon,
  HeartIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
import DifficultyRating from "./DifficultyRating.js";
import CardsPreview from "./CardsPreview.js";

export default function OneDeck({ deckInfo }) {
  const navigate = useNavigate();

  return (
    <div className="my-3 mx-3 w-[360px] xs:w-[400px] h-64 min-h-fit p-4 rounded-lg bg-pale-100 dark:bg-pale-800">
      {/* Card header */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{deckInfo?.language?.name}</div>
        <div className="flex items-center">
          <div className="flex items-center text-sm mr-2 hover:text-sky-500 hover:underline select-none cursor-pointer">
            <LinkIcon className="h-3 w-3 mr-1" />
            <span className="font-semibold">
              {deckInfo?.author?.username}
              {/* //// Implement navigate to user profile */}
            </span>
          </div>
          <div className="text-xs font-light">
            {moment(new Date(deckInfo?.createdAt)).fromNow()}
          </div>
        </div>
      </div>

      <DifficultyRating
        difficultyRating={deckInfo?.difficultyLevel?.id}
        difficultyLevel={deckInfo?.difficultyLevel?.name}
      />

      <CardsPreview cards={deckInfo?.cards} deckId={deckInfo?.id} />

      <div className="mt-4 mb-2">
        <Button
          color="orange"
          className="mr-[4%] w-[48%]"
          onClick={() => {
            navigate(`./${deckInfo?.id}/practice/settings`);
          }}
        >
          Practice
        </Button>
        <Button color="orange" className="w-[48%]">
          Challenge
        </Button>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between">
        <div className="flex select-none">
          <div className="flex items-center mr-2 text-sm">
            <HeartIcon className="w-4 h-4 mr-1" />
            {deckInfo?.nLikes}
          </div>
          <div className="flex items-center text-sm">
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-1" />
            {deckInfo?.nForks}
          </div>
        </div>
        <div className="flex mb-1">
          {deckInfo?.subcategories.map((subcat) => (
            <div
              key={subcat?.id}
              className="flex items-center rounded-sm font-light text-sm hover:underline hover:text-sky-500 mr-2 select-none cursor-pointer"
            >
              #{subcat?.name}
              {/* //// Implement click on subcat to search feed for other decks of the same subcat */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
