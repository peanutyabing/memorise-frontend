import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Tooltip } from "@material-tailwind/react";
import { HeartIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import DifficultyRating from "./DifficultyRating.js";
import CardsPreview from "./CardsPreview.js";
import OpenAiLogo from "../../Images/openai-white-logomark.svg";

export default function OneDeck({ deckInfo }) {
  const navigate = useNavigate();

  return (
    <div className="my-3 mx-3 w-[360px] xs:w-[400px] h-64 min-h-fit p-4 rounded-lg bg-pale-100 dark:bg-pale-800">
      {/* Card header */}
      <div className="flex justify-between items-center mb-1">
        <div className="font-bold">{deckInfo?.language?.name}</div>
        <div className="flex items-center gap-3 text-xs ">
          {deckInfo?.aiGenerated && (
            <img
              src={OpenAiLogo}
              alt="AI assisted"
              className="h-5 w-5 p-1 rounded-full bg-blue-gray-800 dark:bg-transparent"
            />
          )}
          <div className="font-light">
            {moment(new Date(deckInfo?.createdAt)).fromNow()}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <DifficultyRating
          difficultyRating={deckInfo?.difficultyLevel?.id}
          difficultyLevel={deckInfo?.difficultyLevel?.name}
        />
      </div>

      <CardsPreview
        cards={deckInfo?.cards}
        deckId={deckInfo?.id}
        displayLimit={8}
        allowEdit={true}
      />

      <div className="flex mt-4 mb-2">
        <Tooltip
          content={
            <div className="w-64">
              <div color="white" className="font-medium">
                Practice makes perfect
              </div>
              <div
                variant="small"
                color="white"
                className="font-normal opacity-80"
              >
                Run through the deck and earn 5 XP for each card.
              </div>
            </div>
          }
          placement="bottom"
        >
          <Button
            color="orange"
            className="mr-[4%] w-[48%]"
            onClick={() => {
              navigate(`./${deckInfo?.id}/practice/settings`);
            }}
          >
            Practice
          </Button>
        </Tooltip>
        <Tooltip
          content={
            <div className="w-64">
              <div color="white" className="font-medium">
                Take the leap
              </div>
              <div
                variant="small"
                color="white"
                className="font-normal opacity-80"
              >
                Quiz yourself and earn 10 XP for each correct answer.
              </div>
            </div>
          }
          placement="bottom"
        >
          <Button
            color="orange"
            className="w-[48%]"
            onClick={() => {
              navigate(`./${deckInfo?.id}/challenge/settings`);
            }}
          >
            Challenge
          </Button>
        </Tooltip>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex select-none">
          {/* <div className="flex items-center mr-2 text-sm">
            <HeartIcon className="w-4 h-4 mr-1" />
            {deckInfo?.nLikes}
          </div> */}
          <div className="flex items-center text-sm">
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-1" />
            {deckInfo?.nForks}
          </div>
        </div>
        <div className="flex items-center text-xs">
          By
          <span
            className="ml-1 font-semibold hover:text-sky-500 hover:underline select-none cursor-pointer"
            onClick={() => {
              navigate(`/profile/${deckInfo?.authorId}`);
            }}
          >
            @{deckInfo?.author?.username}
          </span>
        </div>
        {/*<div className="flex mb-1">
          {deckInfo?.subcategories.map((subcat) => (
            <div
              key={subcat?.id}
              className="flex items-center rounded-sm font-light text-sm hover:underline hover:text-sky-500 mr-2 select-none cursor-pointer"
            >
              #{subcat?.name}
              <p>Implement click on subcat to search feed for other decks of the same subcat</p>
            </div>
          ))}
        </div>*/}
      </div>
    </div>
  );
}
