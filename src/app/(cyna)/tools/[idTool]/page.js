import IFrameInfectionMonkey from "@/components/iframeInfectionMonkey";
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
    {
      name: "BloodHound - Auditeur AD",
      nameShort: "bloodHound",
    },
  ];

  return (
    <div className=" p-4">
      {tools
        .filter((elm) => elm.nameShort == idTool)
        .map(({ name, nameShort }, key) => (
          <ToolsContainer title={name} key={key} scriptName={nameShort} />
        ))}
      {idTool == "infectionMonkey" && <IFrameInfectionMonkey />}
    </div>
  );
};

export default ToolPage;
