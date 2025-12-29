import { useCallback } from "react";
import { useState } from "react";
import LeftBar from "./LeftBar";
import OnlineUsers from "./OnlineUsers";
import ColorPickerBar from "./ColorPickerBar"
const Canvas: React.FC = () => {
    const [strokeStyle, setStrokeStyle] = useState<string>("#23272B");
  const handleSave = useCallback((): void => {
    console.log("Save canvas");
   
  }, []);

  const handleImport = useCallback((): void => {
    console.log("Import file");
    
  }, []);

  return (
    <div>
     <ColorPickerBar setStrokeStyle={setStrokeStyle} />

      <LeftBar
        save={handleSave}
        importFile={handleImport}
        disabled={false}
      />

      <OnlineUsers />

      <canvas id="canvas">
        Your browser does not support HTML5 canvas
      </canvas>
    </div>
  );
};

export default Canvas;
