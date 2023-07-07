"use client"
import { createContext, useCallback, useEffect, useState } from "react"
import { request } from "./tools/requester/requestHandler"
import { DateTime } from "luxon"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [scriptIsBusy, setScriptIsBusy] = useState({
    scan: {
      name: "scan",
      status: "down",
      date: DateTime.now()
        .setLocale("fr")
        .toLocaleString(DateTime.DATETIME_SHORT)
    },
  })

  useEffect(() => {
    const localScriptIsBusy = localStorage.getItem("localScriptIsBusy")
    if (localScriptIsBusy) {
      setScriptIsBusy(JSON.parse(localScriptIsBusy))
    } else {
      localStorage.setItem("localScriptIsBusy", JSON.stringify(scriptIsBusy))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   const updateRequest = () => {
  //     Object.values(scriptIsBusy)
  //       .filter(({ status }) => status === "running")
  //       .map(({ name }) => {
  //         request
  //           .post("/alive", {
  //             container: name,
  //           })
  //           .then((res) => {
  //             if (res.data !== "up") {
  //               handleSetScriptIsDone(name);
  //             }
  //           })
  //           .catch((err) => {});
  //       });
  //   };
  //   const interval = setInterval(updateRequest, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [scriptIsBusy]);

  const handleSetScriptIsBusy = useCallback((value) => {
    scriptIsBusy[value].status = "running"
    setScriptIsBusy(scriptIsBusy)
    localStorage.setItem("localScriptIsBusy", JSON.stringify(scriptIsBusy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetScriptIsDone = useCallback((value) => {
    scriptIsBusy[value].status = "done"
    scriptIsBusy[value].date = DateTime.now()
      .setLocale("fr")
      .toLocaleString(DateTime.DATETIME_SHORT)
    setScriptIsBusy(scriptIsBusy)
    localStorage.setItem("localScriptIsBusy", JSON.stringify(scriptIsBusy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{
        scriptIsBusy,
        handleSetScriptIsBusy,
        handleSetScriptIsDone
      }}
    />
  )
}

export default AppContext
