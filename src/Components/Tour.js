import { useNavigate } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const tourImages = importAll(
  require.context("../Images/Tutorial", true, /\.(png)$/)
);

const tourData = [
  {
    button: "Skip Tour",
    navigateTo: "/my-decks",
    message: "Create flashcards to earn XPs",
  },
  {
    button: "Skip Tour",
    navigateTo: "/my-decks",
    message: "Or use the AI Assistant to generate cards",
  },
  {
    button: "Skip Tour",
    navigateTo: "/my-decks",
    message: "View them at 'My Decks'",
  },
  {
    button: "Skip Tour",
    navigateTo: "/my-decks",
    message: "Practice to earn more XPs",
  },
  {
    button: "Skip Tour",
    navigateTo: "/my-decks",
    message: "Explore others' decks at 'Feed'",
  },
  {
    button: "Get Started",
    navigateTo: "/sign-up",
    message: "Fork and customize decks",
  },
];

export default function Tour() {
  const navigate = useNavigate();
  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col justify-center">
      <header></header>
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "bg-gray-500 w-8" : "bg-gray-500/50 w-4"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="gray"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 -translate-y-2/4 left-4"
          >
            <ArrowLeftIcon strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="gray"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 -translate-y-2/4 !right-4"
          >
            <ArrowRightIcon strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
      >
        {tourData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2"
          >
            <Button
              variant="outlined"
              color="orange"
              size="sm"
              onClick={() => {
                navigate(item.navigateTo);
              }}
            >
              {item.button}
            </Button>
            <div className="mt-4 p-2 font-semibold flex items-center text-center gap-2">
              <InformationCircleIcon className="w-5 h-5" /> Create flashcards to
              earn XPs
            </div>
            <img
              src={tourImages[`tutorial-${index + 1}.png`]}
              alt=""
              className="w-9/12 max-w-sm object-cover rounded-xl mb-8"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
