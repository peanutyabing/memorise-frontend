import { createContext, useState } from "react";

const RoundSettingsContext = createContext({});

export const RoundSettingsProvider = ({ children }) => {
  const [roundSettings, setRoundSettings] = useState({});

  return (
    <RoundSettingsContext.Provider value={{ roundSettings, setRoundSettings }}>
      {children}
    </RoundSettingsContext.Provider>
  );
};

export default RoundSettingsContext;
