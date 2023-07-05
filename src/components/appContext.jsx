"use client";
import { createContext, useCallback, useEffect, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = (props) => {
  const [scriptIsBusy, setScriptIsBusy] = useState(null);

  useEffect(() => {
    const localScriptIsBusy = localStorage.getItem("localScriptIsBusy");
    if (localScriptIsBusy) {
      setScriptIsBusy(localScriptIsBusy);
    } else {
      localStorage.setItem("localScriptIsBusy", scriptIsBusy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetScriptIsBusy = useCallback((value) => {
    setScriptIsBusy(value);
    localStorage.setItem("localScriptIsBusy", value);
  }, []);

  return (
    <AppContext.Provider
      {...props}
      value={{
        scriptIsBusy,
        handleSetScriptIsBusy,
      }}
    />
  );
};

export default AppContext;
