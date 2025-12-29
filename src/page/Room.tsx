import LeftBar from "../component/LeftBar";

const Room = () => {

  const handleSave = () => {
    console.log("Saving whiteboard...");
  };

  const handleImport = () => {
    console.log("Importing file...");
  };

  return (
    <>
      <LeftBar
        save={handleSave}
        importFile={handleImport}
        disabled={false}
      />
    </>
  );
};

export default Room;
