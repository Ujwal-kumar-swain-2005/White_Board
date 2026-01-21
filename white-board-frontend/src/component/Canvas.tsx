import { useState } from "react";
import ColorPickerBar from "./ColorPickerBar";
import LeftBar from "./LeftBar";
import OnlineUsers from "./OnlineUsers";

const Canvas: React.FC = () => {
  const [strokeStyle, setStrokeStyle] = useState<string>("#000000");

  return (
    <div>
      <ColorPickerBar setStrokeStyle={setStrokeStyle} />
        
          <LeftBar
  save={() => console.log("Saving...")}
  importFile={() => console.log("Importing...")}
  disabled={false}
/>
    <OnlineUsers/>
      <canvas id="canvas">
        Your browser does not support HTML5 canvas
      </canvas>
   

    </div>
  );
};

export default Canvas;
