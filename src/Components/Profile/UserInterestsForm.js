import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import { axiosDefault } from "../../Utils/axios.js";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import { Button } from "@material-tailwind/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import FormSelectField from "../Decks/FormSelectField.js";

export default function UserInterestsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const [languages, setLanguages] = useState([]);
  const [fluencyLevels, setFluencyLevels] = useState([]);

  const [rows, setRows] = useState(1);
  const [interests, setInterests] = useState([
    { language: {}, fluencyLevel: {} },
  ]);
  const [interestsToDelete, setInterestsToDelete] = useState([]);

  useEffect(() => {
    getLanguages();
    getDifficultyLevels();
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
      const fluencyLevelsRes = await axiosDefault.get("/fluency-levels");
      setFluencyLevels(fluencyLevelsRes?.data);
    } catch (err) {
      console.log(err);
      alert(
        `Something went wrong when loading the fluency levels. Please try again later. ${err.message}`
      );
    }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getUserInterests();
    }
  }, [user?.id]);

  const getUserInterests = async () => {
    try {
      const interestsRes = await axiosDefault.get(`/interests/${user?.id}`);
      setInterests(interestsRes?.data);
      setRows(interestsRes?.data?.length);
    } catch (err) {
      console.log(err);
    }
  };

  const generateFormRows = () => {
    const inputRows = [];
    for (let i = 0; i < rows; i++) {
      inputRows.push(
        <div key={i} className="flex gap-2 justify-between w-full mb-2">
          <div className="w-[47%] mb-2">
            <div className="dark:text-white text-xs mt-1 ml-1">Language</div>
            <FormSelectField
              id="languages-select"
              options={languages}
              selected={interests[i]?.language}
              setSelected={(selected) => {
                handleSelect(i, "language", selected);
              }}
            />
          </div>
          <div className="w-[47%] mb-2">
            <div className="dark:text-white text-xs mt-1 ml-1">Fluency</div>
            <FormSelectField
              id="difficulty-select"
              options={fluencyLevels}
              selected={interests[i]?.fluencyLevel}
              setSelected={(selected) => {
                handleSelect(i, "fluencyLevel", selected);
              }}
            />
          </div>
          <button
            type="button"
            className="relative top-8 p-1 h-fit text-gray-600 dark:text-gray-400 rounded-full cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              handleRemoveRow(i);
            }}
          >
            <XMarkIcon className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      );
    }
    return inputRows;
  };

  const handleSelect = (row, field, selected) => {
    const interestsToUpdate = [...interests];
    interestsToUpdate[row][field] = selected;
    setInterests(interestsToUpdate);
  };

  const handleRemoveRow = (i) => {
    const updatedInterests = [...interests];
    const removedFormRow = updatedInterests.splice(i, 1)[0];
    if (removedFormRow.id) {
      setInterestsToDelete((prev) => [...prev, removedFormRow]);
    }
    setInterests(updatedInterests);
    setRows((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.pathname.includes("edit")) {
      await bulkUpdateInterests();
      await bulkDeleteInterests();
      navigate("/my-profile");
    } else {
      await bulkAddInterests(interests);
      navigate("/my-profile");
    }
  };

  const bulkUpdateInterests = async () => {
    const newInterests = interests?.filter((interest) => !interest.id);
    const existingInterests = interests?.filter((interest) => interest.id);
    try {
      await Promise.all(
        existingInterests.map((interest) =>
          axiosPrivate.put(`/interests/${interest.id}`, {
            fluencyLevelId: interest.fluencyLevel.id,
            languageId: interest.language.id,
          })
        )
      );
    } catch (err) {
      console.log(err);
    }

    bulkAddInterests(newInterests);
  };

  const bulkDeleteInterests = async () => {
    if (!interestsToDelete.length) {
      return;
    }
    try {
      await Promise.all(
        interestsToDelete.map((interest) =>
          axiosPrivate.delete(`/interests/${interest.id}`)
        )
      );
    } catch (err) {
      console.log(err);
      alert(`Something went wrong when deleting an interest. ${err.message}`);
    }
  };

  const bulkAddInterests = async (interestsInput) => {
    try {
      await Promise.all(
        interestsInput.map((interest) =>
          axiosPrivate.post("/interests", {
            languageId: interest.language.id,
            fluencyLevelId: interest.fluencyLevel.id,
          })
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen flex flex-col justify-start items-center bg-white text-black dark:bg-black dark:text-white">
      <form
        className="flex flex-col items-center my-4 mx-auto w-11/12 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full sm:w-96 mx-auto py-4 px-6 mb-6 bg-pale-100 dark:bg-pale-800 shadow-lg dark:border-b-2 dark:border-r-2 dark:border-pale-500">
          <h1 className="text-center text-xl font-medium dark:text-white">
            Interests
          </h1>
          <ul className="flex flex-col items-center mt-2 text-sm">
            <li>What languages are you interested in learning?</li>
            <li>What languages do you already know?</li>
          </ul>
        </div>
        {generateFormRows()}

        <Button
          variant="text"
          size="sm"
          fullWidth
          color="gray"
          className="flex items-center justify-center gap-2"
          onClick={() => {
            setRows((prev) => prev + 1);
            setInterests((prev) => [
              ...prev,
              { language: {}, fluencyLevel: {} },
            ]);
          }}
        >
          <PlusCircleIcon className="w-6 h-6 mr-1" /> Add one more
        </Button>
        <Button
          className="mt-4 font-quicksand text-sm"
          size="sm"
          type="submit"
          color="orange"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
