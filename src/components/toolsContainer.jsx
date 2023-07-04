"use client"
import { useEffect, useState } from "react"
import Table from "@/components/table"

const ToolsContainer = ({ title }) => {
  const [scriptIsRunning, setScriptIsRunning] = useState(false)
  const [stringIsRunning, setStringIsRunning] = useState("")

  const columns = ["Port", "State", "Service", "Product"]
  const data = [{
    "Port": "53",
    "Protocol": "tcp",
    "State": "open",
    "Reason": "syn-ack",
    "Reason TTL": "127",
    "Service": "domain",
    "Product": "Simple DNS Plus",
    "OSType": "Windows"
  }, {
    "Port": "88",
    "Protocol": "tcp",
    "State": "open",
    "Reason": "syn-ack",
    "Reason TTL": "127",
    "Service": "kerberos-sec",
    "Product": "Microsoft Windows Kerberos",
    "OSType": "Windows"
  }]

  const handleScriptIsRunning = () => setScriptIsRunning(!scriptIsRunning)

  useEffect(() => {
    if (scriptIsRunning) {
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
  }, [scriptIsRunning])

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
        <button
          className="btn bg-[#45781e] w-42 self-end text-white"
          onClick={handleScriptIsRunning}
          disabled={scriptIsRunning}
        >
          Lancer le test
        </button>
      </div>
      {data && (
        <Table
          columns={columns}
          data={data}
        />
        )}
    </div>
  )
}


export default ToolsContainer
