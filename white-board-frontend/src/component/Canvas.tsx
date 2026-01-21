import { useState } from "react";
import ColorPickerBar from "./ColorPickerBar";

const Canvas: React.FC = () => {
  const [strokeStyle, setStrokeStyle] = useState<string>("#000000");

  return (
    <div>
      <ColorPickerBar setStrokeStyle={setStrokeStyle} />

      <canvas id="canvas">
        Your browser does not support HTML5 canvas
      </canvas>
    </div>
  );
};

export default Canvas;
