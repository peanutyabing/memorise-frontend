import { Outlet } from "react-router-dom";
// import { useState } from "react";

export default function Practice() {
  // const [seeBackFirst, setSeeBackFirst] = useState(false);
  // const [shuffled, setShuffled] = useState(false);

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-center text-xl font-medium dark:text-white mb-4">
        Practice
      </h1>
      <Outlet />
    </div>
  );
}
