import { createContext, useState } from "react";

const PracticeSettingsContext = createContext({});

export const PracticeSettingsProvider = ({ children }) => {
  const [practiceSettings, setPracticeSettings] = useState({});

  return (
    <PracticeSettingsContext.Provider
      value={{ practiceSettings, setPracticeSettings }}
    >
      {children}
    </PracticeSettingsContext.Provider>
  );
};

export default PracticeSettingsContext;
