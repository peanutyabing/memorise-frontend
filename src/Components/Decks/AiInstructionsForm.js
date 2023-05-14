import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosDefault, axiosPrivate } from "../../Utils/axios.js";
import { ReactComponent as OpenAILogo } from "../../Images/openai-white-logomark.svg";
import { Button, Tooltip, Spinner } from "@material-tailwind/react";
import FormSelectField from "./FormSelectField.js";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AiInstructionsForm() {
  const navigate = useNavigate();

  const [languages, setLanguages] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [deckLengthOptions, setDeckLengthOptions] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState({});
  const [selectedNumOfCards, setSelectedNumOfCards] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getLanguages();
    getDifficultyLevels();
  }, []);

  useEffect(() => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push({ name: i.toString(), id: i });
    }
    setDeckLengthOptions(options);
  }, []);

  const getLanguages = async () => {
    try {
      const languagesRes = await axiosDefault.get("/languages");
      setLanguages(languagesRes?.data);
    } catch (err) {
      console.log(err);
      alert(
        `Something went wrong when loading the languages. Please try again later. ${err.message}`
      );
    }
  };

  const getDifficultyLevels = async () => {
    try {
      const difficultyLevelsRes = await axiosDefault.get("/difficulty-levels");
      setDifficultyLevels(difficultyLevelsRes?.data);
    } catch (err) {
      console.log(err);
      alert(
        `Something went wrong when loading the difficulty levels. Please try again later. ${err.message}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newDeck = await axiosPrivate.post("/ai/create-deck", {
        languageId: selectedLanguage.id,
        difficultyLevelId: selectedDifficultyLevel.id,
        nonPublic: false,
        prompt: `Give me a JSON object containing ${
          selectedNumOfCards.name
        } key value ${
          selectedNumOfCards.id > 1 ? "pairs" : "pair"
        }. For each key value pair, the key is a unique word or phrase in ${
          selectedLanguage.name
        } about ${selectedTheme} for a learner of this language at ${selectedDifficultyLevel.name?.toLowerCase()}-level. The value is a string including the pronunciation of the word or phrase and its meaning.`,
      });
      const newDeckId = newDeck?.data?.id;
      navigate(`/my-decks/${newDeckId}/edit`);
    } catch (err) {
      console.log(err);
      alert(
        `Something went wrong while creating your deck. Please try again later. ${err.message}`
      );
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <form className="my-4 mx-auto w-[98%] max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full sm:w-96 mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <OpenAILogo className="h-6 w-6 bg-black p-1 rounded-full" />
            <h1 className="text-center text-xl font-medium">AI Assistant</h1>
          </div>
          <div className="w-full rounded-md bg-pale-100 dark:bg-pale-800 flex items-center justify-center gap-2 mb-6 p-2">
            <ExclamationTriangleIcon className="w-6 h-6" strokeWidth={2} />
            <div>
              <div className="text-xs">
                May occasionally generate inaccurate information
              </div>
              <div className="text-xs">
                May occasionally produce biased content
              </div>
              <div className="text-xs">
                Limited knowledge of world and events after 2021
              </div>
            </div>
          </div>
          <div className="-ml-16">
            <div className="grid grid-cols-2 gap-2 items-center mb-2">
              <div className="dark:text-white justify-self-end mr-6">
                Language:
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
                Difficulty:
              </div>
              <FormSelectField
                id="difficulty-select"
                options={difficultyLevels}
                selected={selectedDifficultyLevel}
                setSelected={setSelectedDifficultyLevel}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center mb-2">
              <div className="dark:text-white justify-self-end mr-6">
                No. of cards:
              </div>
              <FormSelectField
                id="difficulty-select"
                options={deckLengthOptions}
                selected={selectedNumOfCards}
                setSelected={setSelectedNumOfCards}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center mb-2">
              <div className="dark:text-white justify-self-end mr-6">
                Theme:
              </div>

              <input
                className="pl-3 mt-1 h-9 w-full rounded-md border border-blue-gray-200 bg-white dark:bg-black"
                placeholder="e.g. travel"
                value={selectedTheme}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-[99%] outline outline-1 outline-gray-500 text-sm text-justify p-2 mt-4">
            <span className="font-semibold">
              Sample prompt to AI Assistant:{" "}
            </span>{" "}
            I am an a learner of{" "}
            <span className="p-[0.5px] bg-yellow dark:bg-orange-800">
              {selectedLanguage.name}
            </span>{" "}
            at{" "}
            <span className="p-[0.5px] bg-yellow dark:bg-orange-800">
              {selectedDifficultyLevel.name?.toLowerCase()}
            </span>
            -level. Please make me a deck of{" "}
            <span className="p-[0.5px] bg-yellow dark:bg-orange-800">
              {selectedNumOfCards.name}
            </span>{" "}
            cards about{" "}
            <span className="p-[0.5px] bg-yellow dark:bg-orange-800">
              {selectedTheme}
            </span>
            .
          </div>
        </div>

        <div className="flex justify-center">
          <Tooltip
            content={
              <div className="w-64">
                <div
                  variant="small"
                  color="white"
                  className="font-normal opacity-80 text-center"
                >
                  This may take a few seconds.
                </div>
              </div>
            }
            placement="bottom"
          >
            <Button
              className="mt-6 mx-auto w-24 font-quicksand text-sm flex justify-center"
              size="sm"
              type="submit"
              color="orange"
              disabled={submitting}
            >
              {submitting ? (
                <Spinner className="h-5 w-5" color="pink" />
              ) : (
                "Let's go"
              )}
            </Button>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}
