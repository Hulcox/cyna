"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import Table from "@/components/table";
import AppContext from "./appContext";
import { request } from "./tools/requester/requestHandler";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ToolsContainer = ({ title, scriptName }) => {
  const [scriptIsRunning, setScriptIsRunning] = useState(false);
  const [stringIsRunning, setStringIsRunning] = useState("");
  const { scriptIsBusy, handleSetScriptIsBusy } = useContext(AppContext);

  const columns = ["Port", "State", "Service", "Product"];
  const data = [
    {
      Port: "53",
      Protocol: "tcp",
      State: "open",
      Reason: "syn-ack",
      "Reason TTL": "127",
      Service: "domain",
      Product: "Simple DNS Plus",
      OSType: "Windows",
    },
    {
      Port: "88",
      Protocol: "tcp",
      State: "open",
      Reason: "syn-ack",
      "Reason TTL": "127",
      Service: "kerberos-sec",
      Product: "Microsoft Windows Kerberos",
      OSType: "Windows",
    },
  ];

  // const ToolSchema = Yup.object().shape({
  //   command: Yup.string().required("Une commande est requis !"),
  //   params: Yup.string().required("Des paramètres sont requis !"),
  // });

  const handleStartScript = useCallback(() => {
    setScriptIsRunning(true);
    handleSetScriptIsBusy(scriptName);
    request
      .post("/run", { container: scriptName, command: "", params: "" })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [handleSetScriptIsBusy, scriptName]);

  useEffect(() => {
    if (scriptIsRunning) {
      let string = "";
      const updateString = () => {
        if (string.length === 3) {
          string = "";
        } else {
          string += ".";
        }
        setStringIsRunning(string);
      };

      const interval = setInterval(updateString, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setStringIsRunning("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptIsRunning]);

  console.log(scriptIsBusy);

  return (
    <div className="flex gap-5 flex-col w-full bg-base-100 rounded-lg p-4">
      <h2 className="text-2xl font-bold flex justify-center items-center m-4">
        {title}
      </h2>
      <div className="mockup-code">
        <pre data-prefix=">">
          <code>Exécution du script : </code>
        </pre>
        {scriptIsRunning && (
          <pre data-prefix=">" className="text-warning">
            <code>{`En cours d'exécution ${stringIsRunning}`}</code>
          </pre>
        )}
        {/* {scriptIsFinished && (
          <pre data-prefix=">" className="text-success">
            <code>Fini!</code>
          </pre>
        )} */}
      </div>
      <div className="flex gap-2 justify-end">
        <Formik
          initialValues={{
            command: "",
            params: "",
          }}
          onSubmit={handleStartScript}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="w-full flex flex-col">
              <div className="flex gap-5 justify-start">
                <Field
                  name="command"
                  placeholder="Commande"
                  bordererror={errors.command}
                  className={`input w-1/3 ${
                    errors.command && touched.command
                      ? "input-error"
                      : "border-[#45781e]"
                  } `}
                />
                <Field
                  name="params"
                  placeholder="Paramètres"
                  bordererror={errors.params}
                  className={`input w-1/3 ${
                    errors.params && touched.params
                      ? "input-error"
                      : "border-[#45781e]"
                  } `}
                />
              </div>
              <button
                type="submit"
                className="btn bg-[#45781e] w-42 self-end text-white"
                disabled={scriptIsRunning}
              >
                Lancer le test
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {data && <Table columns={columns} data={data} />}
    </div>
  );
};

export default ToolsContainer;
