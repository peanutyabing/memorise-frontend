import { useContext } from "react";
import PracticeSettingsContext from "../Context/PracticeSettingsProvider.js";

export default function usePracticeSettings() {
  return useContext(PracticeSettingsContext);
}
