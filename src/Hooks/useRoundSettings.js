import { useContext } from "react";
import RoundSettingsContext from "../Context/RoundSettingsProvider.js";

export default function useRoundSettings() {
  return useContext(RoundSettingsContext);
}
