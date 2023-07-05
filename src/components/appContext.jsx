"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { request } from "./tools/requester/requestHandler";

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

  useEffect(() => {
    if (scriptIsBusy) {
      const updateRequest = () => {
        request
          .post("/alive", {
            container: scriptIsBusy,
          })
          .then((res) => {
            if (res.data != "up") {
              handleSetScriptIsBusy(null);
            }
          })
          .catch((err) => {});
      };

      const interval = setInterval(updateRequest, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptIsBusy]);

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
