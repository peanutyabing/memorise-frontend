import { useContext } from "react";
import RedirectContext from "../Context/RedirectProvider.js";

export default function useRoundSettings() {
  return useContext(RedirectContext);
}
