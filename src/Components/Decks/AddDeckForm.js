import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDefault } from "../../Utils/axios.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import useUser from "../../Hooks/useUser.js";
import { Input, Button, Checkbox } from "@material-tailwind/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import FormSelectField from "./FormSelectField.js";
import useAuth from "../../Hooks/useAuth.js";

export default function MakeDeckForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState({});
  const [nonPublic, setNonPulic] = useState(false);
  const [deck, setDeck] = useState([]);
  const [rows, setRows] = useState(5);
  const { auth } = useAuth();

  useEffect(() => {
    getLanguages();
    getDifficultyLevels();
  }, []);

  const getLanguages = async () => {
    try {
      const languagesRes = await axiosDefault.get("/languages");
      setLanguages(languagesRes.data);
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong when loading the languages. Please try again later."
      );
    }
  };

  const getDifficultyLevels = async () => {
    try {
      const difficultyLevelsRes = await axiosDefault.get("/difficulty-levels");
      setDifficultyLevels(difficultyLevelsRes.data);
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong when loading the languages. Please try again later."
      );
    }
  };

  const generateFormRows = () => {
    const inputRows = [];
    for (let i = 0; i < rows; i++) {
      inputRows.push(
        <div
          key={i}
          className="flex flex-wrap xs:flex-nowrap items-center justify-center mb-3 gap-2"
        >
          <Input
            size="md"
            color="orange"
            className="dark:text-white"
            name={i}
            label={`Card ${i + 1} front`}
            value={deck[i]?.front || ""}
            onChange={(e) => {
              handleChange(e, "front");
            }}
          />
          <Input
            size="md"
            color="orange"
            className="dark:text-white"
            name={i}
            label={`Card ${i + 1} back`}
            value={deck[i]?.back || ""}
            onChange={(e) => {
              handleChange(e, "back");
            }}
          />
          <button
            type="button"
            className="p-1 text-gray-600 dark:text-gray-400 rounded-full cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              handleRemoveRow(i);
            }}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      );
    }
    return inputRows;
  };

  const handleRemoveRow = (i) => {
    const updatedDeck = [...deck];
    updatedDeck.splice(i, 1);
    setDeck(updatedDeck);
    setRows((prev) => prev - 1);
  };

  const handleChange = (e, sideOfCard) => {
    const updatedDeck = [...deck];
    if (updatedDeck[e.target.name]) {
      updatedDeck[e.target.name][sideOfCard] = e.target.value;
    } else {
      updatedDeck[e.target.name] = { [sideOfCard]: e.target.value };
    }
    setDeck(updatedDeck);
  };

  const AddNewDeck = async (e) => {
    e.preventDefault();
    try {
      const newDeck = await axiosPrivate.post("/decks", {
        authorId: user?.id,
        languageId: selectedLanguage.id,
        difficultyLevelId: selectedDifficultyLevel.id,
        nonPublic,
      });
      const newDeckId = newDeck.data.id;
      bulkAddCards(newDeckId);
      navigate("/my-decks");
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong when adding this deck. Did you fill in all the fields?"
      );
    }
  };

  const bulkAddCards = async (deckId) => {
    try {
      await Promise.all(
        deck.map((card) =>
          axiosPrivate.post("/cards", {
            deckId,
            front: card.front,
            back: card.back,
          })
        )
      );
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong when adding cards. Did you fill in all the fields?"
      );
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <form className="my-4 mx-auto w-11/12 max-w-4xl" onSubmit={AddNewDeck}>
        <div className="flex flex-col items-center w-full sm:w-96 mx-auto p-4 mb-6 bg-pale-100 dark:bg-pale-800 shadow-lg rounded-md">
          <h1 className="text-center text-xl font-medium dark:text-white mb-2">
            New Deck
          </h1>
          <div>
            <div className="grid grid-cols-2 gap-2 items-center mb-2">
              <div className="dark:text-white justify-self-end mr-6">
                Select language:
              </div>
              <FormSelectField
                id="languages-select"
                options={languages}
                selected={selectedLanguage}
                setSelected={setSelectedLanguage}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center mb-2">
              <div className="dark:text-white justify-self-end mr-6">
                Select difficulty:
              </div>
              <FormSelectField
                id="difficulty-select"
                options={difficultyLevels}
                selected={selectedDifficultyLevel}
                setSelected={setSelectedDifficultyLevel}
              />
            </div>
          </div>
          <Checkbox
            label={
              <div className="flex items-center text-black dark:text-white">
                Make this deck private
              </div>
            }
            containerProps={{ className: "-ml-2.5" }}
            color="orange"
            checked={nonPublic}
            onChange={() => {
              setNonPulic((prevState) => !prevState);
            }}
          />
        </div>
        {generateFormRows()}
        <Button
          variant="text"
          size="sm"
          color="gray"
          fullWidth
          className="flex items-center gap-2"
          onClick={() => {
            setRows((prev) => prev + 1);
          }}
        >
          <PlusCircleIcon className="w-6 h-6 mr-1" /> New Row
        </Button>
        <Button
          className="mt-4 font-quicksand text-sm"
          fullWidth
          type="submit"
          color="orange"
        >
          Add Deck
        </Button>
      </form>
    </div>
  );
}
