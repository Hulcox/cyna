import ToolsContainer from "@/components/toolsContainer"

const ToolPage = ({ params }) => {
  const { idTool } = params

  const tools = [
    {
      name: "Scan de vulnérabilité",
        nameShort: "openvas"
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
