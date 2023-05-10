import { AcademicCapIcon as FilledIcon } from "@heroicons/react/24/solid";
import { AcademicCapIcon as UnfilledIcon } from "@heroicons/react/24/outline";

export default function DifficultyRating(props) {
  const difficultyRating = parseInt(props.difficultyRating);
  const colorChart = {
    1: "green-500",
    2: "light-green-500",
    3: "orange-500",
    4: "red-500",
    5: "purple-500",
  };

  const displayDifficulty = () => {
    const display = [];
    for (let i = 0; i < difficultyRating; i++) {
      display.push(
        <FilledIcon
          key={i}
          className={`text-${colorChart[difficultyRating]} h-4 w-4`}
        />
      );
    }
    for (let i = 0; i < 5 - difficultyRating; i++) {
      display.push(
        <UnfilledIcon key={i + difficultyRating} className="h-4 w-4" />
      );
    }
    return display;
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      {displayDifficulty()}
      <div className="text-sm">{props.difficultyLevel}</div>
    </div>
  );
}
