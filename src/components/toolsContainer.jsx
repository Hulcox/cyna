"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import Table from "@/components/table"
import AppContext from "./appContext"
import { Formik, Form, Field } from "formik"

const ToolsContainer = ({ title, scriptName }) => {
  const [data, setData] = useState([])
  const [stringIsRunning, setStringIsRunning] = useState("")
  const { scriptIsBusy, handleSetScriptIsBusy, handleSetScriptIsDone } =
    useContext(AppContext)
  const [isAnyRunning, setIsAnyRunning] = useState(false)

  useEffect(() => {
    const isAnyRunning =
      Object.values(scriptIsBusy).filter(
        (script) => script.status === "running"
      ).length > 0
    setIsAnyRunning(isAnyRunning)
  }, [scriptIsBusy])

  const columns = [
    "IP",
    "CVEs",
    "CVSS",
    "Severity",
    "Cyberscore",
    "Specific Result"
  ]

  // const ToolSchema = Yup.object().shape({
  //   command: Yup.string().required("Une commande est requis !"),
  //   params: Yup.string().required("Des paramètres sont requis !"),
  // });

  const handleStartScript = useCallback(
    async (value) => {
      console.log(value)
      handleSetScriptIsBusy(scriptName)

      // const run = await request.post("/run", {
      //   container: scriptName,
      //   command: value.command,
      //   params: value.params,
      // });

      setTimeout(() => {
        handleSetScriptIsDone(scriptName)
      }, 5000)

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (scriptIsBusy[scriptName].status === "running") {
      let string = ""
      const updateString = () => {
        if (string.length === 3) {
          string = ""
        } else {
          string += "."
        }
        setStringIsRunning(string)
      }

      const interval = setInterval(updateString, 1000)

      return () => {
        clearInterval(interval)
      }
    } else {
      setStringIsRunning("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptIsBusy])

  useEffect(() => {
    fetch(`/docs/${scriptName}.json`)
      .then((response) => response.json())
      .then((info) => {
        setData(info)
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement du fichier JSON :",
          error
        )
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex gap-5 flex-col w-full bg-base-100 rounded-lg p-4">
      <h2 className="text-2xl font-bold flex justify-center items-center m-4">
        {title}
      </h2>

      <div className="mockup-code">
        <pre data-prefix=">">
          <code>Exécution du script : </code>
        </pre>
        {scriptIsBusy[scriptName].status === "running" && (
          <pre data-prefix=">" className="text-warning">
            <code>{`En cours d'exécution ${stringIsRunning}`}</code>
          </pre>
        )}
        {scriptIsBusy[scriptName].status === "done" && (
          <pre data-prefix=">" className="text-success">
            <code>Fait ! le {scriptIsBusy[scriptName].date}</code>
          </pre>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <Formik
          initialValues={{
            command: "",
            params: ""
          }}
          onSubmit={handleStartScript}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="w-full flex flex-col">
              <div className="flex gap-5 justify-start">
                <Field
                  name="command"
                  placeholder="Nom du container"
                  className="input w-1/3 border-orange-400"
                />
                <Field
                  name="params"
                  placeholder="Paramètres de la commande"
                  className="input w-1/3 border-orange-400"
                />
              </div>
              <button
                type="submit"
                className="btn bg-[#45781e] w-42 self-end text-white"
                disabled={isAnyRunning}
              >
                Lancer le test
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {scriptIsBusy[scriptName].status === "done" && <Table columns={columns} data={data}/>}
    </div>
  )
}

export default ToolsContainer
