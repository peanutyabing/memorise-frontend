import { createContext, useState } from "react";

const RedirectContext = createContext({});

export const RedirectProvider = ({ children }) => {
  const [redirect, setRedirect] = useState();

  return (
    <RedirectContext.Provider value={{ redirect, setRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
};

export default RedirectContext;
