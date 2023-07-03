const ToolPage = ({ params }) => {
  const { idTool } = params;

  if (idTool == "openVas") {
    return (
      <div className="flex gap-5 flex-col p-4">
        <h2 className="text-2xl font-bold bg-[#45781e] w-full h-12 flex justify-center items-center rounded-lg">
          Open VAS - Scan de vulnérabilité
        </h2>
        <div className="w-full min-h-[50vh] bg-base-100 rounded-lg p-4">
          test
        </div>
      </div>
    );
  } else if (idTool == "infectionMonkey") {
    return (
      <div className="flex gap-5 flex-col p-4">
        <h2 className="text-2xl font-bold bg-[#45781e] w-full h-12 flex justify-center items-center rounded-lg">
          Infection Monkey - BAS
        </h2>
        <div className="w-full min-h-[50vh] bg-base-100 rounded-lg p-4">
          test
        </div>
      </div>
    );
  } else if (idTool == "bloodHound") {
    return (
      <div className="flex gap-5 flex-col p-4">
        <h2 className="text-2xl font-bold bg-[#45781e] w-full h-12 flex justify-center items-center rounded-lg">
          BloodHound - Auditeur AD
        </h2>
        <div className="w-full min-h-[50vh] bg-base-100 rounded-lg p-4">
          test
        </div>
      </div>
    );
  }
};

export default ToolPage;
