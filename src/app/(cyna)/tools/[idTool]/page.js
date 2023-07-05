import ToolsContainer from "@/components/toolsContainer";

const ToolPage = ({ params }) => {
  const { idTool } = params;

  const tools = [
    {
      name: "Open VAS - Scan de vulnérabilité",
      nameShort: "openVas",
    },
    {
      name: "Infection Monkey - BAS",
      nameShort: "infectionMonkey",
    },
  ];

  return (
    <div className=" p-4">
      {tools
        .filter((elm) => elm.nameShort == idTool)
        .map(({ name, nameShort }, key) => (
          <ToolsContainer title={name} key={key} scriptName={nameShort} />
        ))}
    </div>
  );
};

export default ToolPage;
