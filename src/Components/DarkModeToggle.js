import { useEffect, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { LightBulbIcon as LightBulbIconFilled } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      className="rounded-full p-1 hover:text-blue-700 dark:md:hover:text-yellow"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <span className="sr-only">Light Mode</span>
      ) : (
        <span className="sr-only">Dark Mode</span>
      )}
      {darkMode ? (
        <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <LightBulbIconFilled className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
