import ToolsContainer from "@/components/toolsContainer";

const ToolPage = ({ params }) => {
  const { idTool } = params;

  const tools = [
    {
      name: "Open VAS - Scan de vulnérabilité",
      nameShort: "openvas",
    },
    {
      name: "Infection Monkey - BAS",
      nameShort: "infectionMonkey",
    },
    {
      name: "Metasplot - Recherche d'information sur les CVE trouvées",
      nameShort: "metasploit",
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
