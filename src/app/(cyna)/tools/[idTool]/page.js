import ToolsContainer from "@/components/toolsContainer";

const ToolPage = ({ params }) => {
  const { idTool } = params;

  const tools = [
    {
      name: "Open VAS - Scan de vulnérabilité",
      nameShort: "openVas",
      scriptUrl: "",
    },
    {
      name: "Infection Monkey - BAS",
      nameShort: "infectionMonkey",
      scriptUrl: "",
    },
    {
      name: "BloodHound - Auditeur AD",
      nameShort: "bloodHound",
      scriptUrl: "",
    },
  ];

  return (
    <div className=" p-4">
      {tools
        .filter((elm) => elm.nameShort == idTool)
        .map(({ name, scriptUrl }, key) => (
          <ToolsContainer title={name} key={key} />
        ))}
    </div>
  );
};

export default ToolPage;
