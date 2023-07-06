import ToolsContainer from "@/components/toolsContainer"

const ToolPage = ({ params }) => {
  const { idTool } = params

  const tools = [
    {
      name: "Scan de vulnérabilité",
      nameShort: "openvas"
    },
    {
      name: "Simulation de brèche",
      nameShort: "infectionmonkey"
    },
    {
      name: "Vunérabilité - Recherche d'information sur les CVE",
      nameShort: "metasploit"
    }
  ]

  return (
    <div className=" p-4">
      {tools
        .filter((elm) => elm.nameShort === idTool)
        .map(({ name, nameShort }, key) => (
          <ToolsContainer title={name} key={key} scriptName={nameShort}/>
        ))}
    </div>
  )
}

export default ToolPage
