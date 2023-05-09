import { useNavigate } from "react-router-dom";
import { RectangleStackIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function CardsPreview({ cards, deckId }) {
  const navigate = useNavigate();
  const cardCount = cards.length;

  const generatePreview = () => {
    const displayLimit = 8;
    if (cardCount <= displayLimit) {
      return cards.map((card) => card.front).join(", ");
    } else {
      return (
        cards
          .slice(0, displayLimit)
          .map((card) => card.front)
          .join(", ") + ` and ${cardCount - displayLimit} more...`
      );
    }
  };

  return (
    <div className="h-20 bg-pale-200 dark:bg-pale-700 p-2 rounded-sm text-sm">
      <div className="flex justify-between mb-2">
        <div className="flex items-center select-none">
          <RectangleStackIcon className="w-4 h-4" />
          {cardCount}
        </div>
        <div
          className="flex items-center hover:text-sky-500 hover:underline select-none cursor-pointer"
          onClick={() => {
            navigate(`/my-decks/${deckId}/edit`);
          }}
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </div>
      </div>
      <div>{generatePreview()}</div>
    </div>
  );
}
