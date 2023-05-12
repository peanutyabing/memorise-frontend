import Leaderboard from "./Leaderboard.js";

export default function Feed() {
  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <div className="flex flex-col items-center mx-auto w-full">
        {/* <div className="w-full">
          This is a listing of everyone's decks which are *public*
        </div>
        <div className="w-full">
          It should be ranked by languages, prioritising the ones the user
          listed as interests, least proficient first
        </div> */}
        <div className="pt-6 -mt-4 flex flex-col items-center w-full bg-pale-100 dark:bg-pale-800">
          <div className="text-xl font-semibold mb-2">Leaderboard</div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
