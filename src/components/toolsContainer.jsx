"use client";
import { useEffect, useState } from "react";

const ToolsContainer = ({ title, script }) => {
  const [scriptIsRunning, setScriptIsRunning] = useState(false);
  const [stringIsRunning, setStringIsRunning] = useState("");

  const handleScriptIsRunning = () => setScriptIsRunning(!scriptIsRunning);

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

  return (
    <div className="flex gap-5 flex-col w-full bg-base-100 rounded-lg p-4">
      <h2 className="text-2xl font-bold flex justify-center items-center m-4">
        {title}
      </h2>
      <div className="mockup-code">
        <pre data-prefix=">">
          <code>Exécution du script : </code>
        </pre>
        {scriptIsRunning ? (
          <pre data-prefix=">" className="text-warning">
            <code>{`En cours d'éxécution ${stringIsRunning}`}</code>
          </pre>
        ) : null}
        {/* {scriptIsRunning ? (
          <pre data-prefix=">" className="text-success">
            <code>Fini!</code>
          </pre>
        ) : null} */}
      </div>
      <button
        className="btn bg-[#45781e] w-42 self-end text-white"
        onClick={handleScriptIsRunning}
      >
        Lancer le test
      </button>
      <button
        className="btn bg-[#45781e] w-42 self-end text-white"
        onClick={handleScriptIsRunning}
      >
        Stopper le test
      </button>
    </div>
  );
};

export default ToolsContainer;
