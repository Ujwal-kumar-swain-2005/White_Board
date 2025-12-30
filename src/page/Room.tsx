import { useState } from "react";
import LeftBar from "../component/LeftBar";
import FileUploader from "../component/FileUploader";
import { Box, Typography } from "@mui/material";

const Room = () => {
  const [showFileUploader, setShowFileUploader] = useState<boolean>(false);
  const [textReadFromFile, setTextReadFromFile] = useState<string>("");

  const handleSave = () => {
    console.log("Saving whiteboard...");
    console.log("Current content:", textReadFromFile);
  };

  const handleImport = () => {
    setShowFileUploader(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "#15171A",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* LEFT BAR */}
      <LeftBar
        save={handleSave}
        importFile={handleImport}
        disabled={false}
      />

      {/* FILE UPLOADER */}
      {showFileUploader && (
        <FileUploader
          setShowFileUploader={setShowFileUploader}
          setTextReadFromFile={setTextReadFromFile}
        />
      )}

      {/* DEBUG OUTPUT (for testing) */}
      {textReadFromFile && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0f1115",
            padding: 2,
            borderRadius: 2,
            maxWidth: "60%",
            maxHeight: "40%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6">Imported File Content</Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", mt: 1 }}
          >
            {textReadFromFile}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Room;
