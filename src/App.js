import { useEffect } from "react";
import useAuth from "./Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import appLogoLarge from "./Images/memorise-logo-l.png";
import { Button, Spinner } from "@material-tailwind/react";

function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      setTimeout(() => {
        navigate("/my-decks");
      }, 5000);
    }
  }, []);

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col justify-center">
      <header></header>
      <main className="flex flex-col justify-center items-center justify-center">
        <img
          src={appLogoLarge}
          alt="Memorise"
          className="w-40 h-40 animate-fade-in-up"
        />
        <h1 className="font-dancing-script text-5xl mt-2">Memorise</h1>

        <Button
          variant="outlined"
          color="orange"
          className="mt-6"
          onClick={() => {
            navigate("/tutorial");
          }}
        >
          Show me around
        </Button>
        <Button
          variant="outlined"
          color="orange"
          className="mt-6"
          onClick={() => {
            navigate("/my-decks");
          }}
        >
          Start practicing
        </Button>

        {auth?.token && (
          <div className="text-sm mt-6 flex items-center">
            Welcome back! Taking you to your decks...
            <Spinner color="orange" className="h-4 w-4 ml-2" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
