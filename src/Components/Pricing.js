import {
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { FaceSmileIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

export default function Pricing() {
  return (
    <div className="flex flex-col justify-center pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <div className="mx-auto w-11/12 max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex flex-col items-center w-full h-full mx-auto p-4 my-2 bg-pale-100 dark:bg-pale-800 shadow-lg">
          <div className="flex flex-col items-center font-semibold text-blue-gray-600 dark:text-blue-gray-500">
            <FaceSmileIcon className="w-8 h-8" strokeWidth={2} />
            Starter
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-black rounded-lg w-11/12 px-4 py-6 my-2">
            <div className="text-4xl font-semibold text-green-500 mb-4">
              Free
            </div>
            <div className="grid grid-cols-[1fr_5fr]">
              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited decks</div>

              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited flashcards</div>

              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited forking</div>

              <LockClosedIcon
                className="h-5 w-5 text-deep-orange-400"
                strokeWidth={3}
              />
              <div>3 AI-generated decks</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full h-full mx-auto p-4 my-2 bg-pale-100 dark:bg-pale-800 shadow-lg">
          <div className="flex flex-col items-center font-semibold text-blue-gray-600 dark:text-blue-gray-500">
            <RocketLaunchIcon className="w-8 h-8" strokeWidth={2} />
            Pro
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-black rounded-lg w-11/12 px-4 py-6 my-2">
            <div className="text-4xl font-semibold text-orange-500 mb-4">
              Coming Soon
            </div>
            <div className="grid grid-cols-[1fr_5fr]">
              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited decks</div>

              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited flashcards</div>

              <CheckIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>Unlimited forking</div>

              <LockOpenIcon
                className="h-5 w-5 text-light-green-500"
                strokeWidth={3}
              />
              <div>More features coming soon!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
