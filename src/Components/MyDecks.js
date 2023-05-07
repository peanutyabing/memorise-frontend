import { useEffect, useState } from "react";
import useUser from "../Hooks/useUser.js";
import useAxiosPrivate from "../Hooks/useAxiosPrivate.js";

export default function MyDecks() {
  const { user } = useUser();
  const [userDecks, setUserDecks] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getUserDecks().then(console.log(userDecks));
  }, []);

  const getUserDecks = async () => {
    const decksRes = await axiosPrivate.get("/decks");
    setUserDecks(decksRes.data);
  };

  return (
    <div className="h-screen pt-20 h-max bg-white text-black dark:bg-black dark:text-white">
      <header></header>
      <main className="flex flex-col justify-center items-center">
        <h1>decks</h1>
      </main>
    </div>
  );
}
