import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LeftBar from "../component/LeftBar";
import FileUploader from "../component/FileUploader";
import ShowInfoPanel from "../component/ShowInfoPanel";

const Room = () => {
  const [showFileUploader, setShowFileUploader] = useState<boolean>(false);
  const [textReadFromFile, setTextReadFromFile] = useState<string>("");
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  const handleSave = () => {
    console.log("Saving whiteboard...");
    console.log("Imported content:", textReadFromFile);
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
        overflow: "hidden",
      }}
    >
      {/* HEADER (temporary) */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6">Whiteboard Room</Typography>

        <IconButton
          onClick={() => setShowInfoPanel(true)}
          sx={{ color: "#9CA3AF" }}
        >
        
        </IconButton>
      </Box>

      {/* LEFT BAR */}
      <LeftBar
        save={handleSave}
        importFile={handleImport}
        disabled={false}
      />
      {showFileUploader && (
        <FileUploader
          setShowFileUploader={setShowFileUploader}
          setTextReadFromFile={setTextReadFromFile}
        />
      )}
      {showInfoPanel && (
        <ShowInfoPanel setShowInfoPanel={setShowInfoPanel} />
      )}
      {textReadFromFile && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0f1115",
            padding: 2,
            borderRadius: 2,
            maxWidth: "60%",
            maxHeight: "30%",
            overflow: "auto",
            border: "1px solid #2a2d34",
          }}
        >
          <Typography variant="subtitle1">
            Imported File Content
          </Typography>
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
