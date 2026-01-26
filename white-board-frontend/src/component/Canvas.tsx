

import React, { useState, useEffect, useRef, useContext } from "react";
import ColorPickerBar from "./ColorPickerBar";
import LeftBar from "./LeftBar";
import FileUploader from "./FileUploader";
import ShowInfoPanel from "./ShowInfoPanel";
import OnlineUsers from "./OnlineUsers";
import BottomRightBar from "./BottomRightBar";
import { ThemeContext } from "../context/ThemeContext";
import MoreActionsBar from "./MoreActionsBar";

// ---------- Types ----------
type Drawing = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
};

type Point = {
  x: number;
  y: number;
};

const Canvas: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [background, setBackground] = useState<string>("#15171A");
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [instrument, setInstrument] = useState<"pencil" | "eraser">("pencil");
  const [strokeStyle, setStrokeStyle] = useState<string>("#fff");
     const [showFileUploader, setShowFileUploader] = useState(false);
    const [textReadFromFile, setTextReadFromFile] = useState<string>("");
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [drawingHistory, setDrawingHistory] = useState<Point[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
       const [showInfoPanel, setShowInfoPanel] = useState(true);

  const [cursorX, setCursorX] = useState<number>(10);
  const [cursorY, setCursorY] = useState<number>(10);
  const [prevCursorX, setPrevCursorX] = useState<number>(10);
  const [prevCursorY, setPrevCursorY] = useState<number>(10);

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);    

  const [leftMouseDown, setLeftMouseDown] = useState<boolean>(false);
  const [rightMouseDown, setRightMouseDown] = useState<boolean>(false);

  // ---------- Refs ----------
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ---------- Effects ----------
  useEffect(() => {
    document.oncontextmenu = () => false;

    const handleResize = () => redrawCanvas();
    window.addEventListener("resize", handleResize);

    redrawCanvas();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDisabled(drawings.length === 0);
  }, [drawings]);

  useEffect(() => {
    if (theme?.backgroundColor) {
      setBackground(theme.backgroundColor);
    }
  }, [theme]);

  useEffect(() => {
    redrawCanvas();
  }, [background, offsetX, offsetY, scale]);
  const toScreenX = (xTrue: number) => (xTrue + offsetX) * scale;
  const toScreenY = (yTrue: number) => (yTrue + offsetY) * scale;
  const toTrueX = (xScreen: number) => xScreen / scale - offsetX;
  const toTrueY = (yScreen: number) => yScreen / scale - offsetY;
  const save = () => {
  console.log("Saving canvas...");
};

const importFile = () => {
  console.log("Importing file...");
};
  const trueWidth = () =>
    (canvasRef.current?.clientWidth || 0) / scale;
  const trueHeight = () =>
    (canvasRef.current?.clientHeight || 0) / scale;
  const drawLine = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);

    if (instrument === "pencil") ctx.strokeStyle = color;
    else ctx.strokeStyle = background;

    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const redrawCanvas = () => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    canvasRef.current.width =
      canvasContainerRef.current.clientWidth;
    canvasRef.current.height =
      canvasContainerRef.current.clientHeight;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = background;
    ctx.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    drawings.forEach((line) => {
      drawLine(
        toScreenX(line.x0),
        toScreenY(line.y0),
        toScreenX(line.x1),
        toScreenY(line.y1),
        line.color
      );
    });
  };
  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button === 0) {
      setLeftMouseDown(true);
      setRightMouseDown(false);
    }
    if (event.button === 2) {
      setRightMouseDown(true);
      setLeftMouseDown(false);
    }

    const x = event.pageX;
    const y = event.pageY;

    setCursorX(x);
    setCursorY(y);
    setPrevCursorX(x);
    setPrevCursorY(y);

    setDrawingHistory((prev) => [...prev, { x, y }]);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.pageX;
    const y = event.pageY;

    const scaledX = toTrueX(x);
    const scaledY = toTrueY(y);
    const prevScaledX = toTrueX(prevCursorX);
    const prevScaledY = toTrueY(prevCursorY);

    if (leftMouseDown) {
      setDrawings((prev) => [
        ...prev,
        {
          x0: prevScaledX,
          y0: prevScaledY,
          x1: scaledX,
          y1: scaledY,
          color: strokeStyle,
        },
      ]);

      drawLine(prevCursorX, prevCursorY, x, y, strokeStyle);
    }

    if (rightMouseDown) {
      setOffsetX((o) => o + (x - prevCursorX) / scale);
      setOffsetY((o) => o + (y - prevCursorY) / scale);
    }

    setPrevCursorX(x);
    setPrevCursorY(y);
  };

  const onMouseUp = () => {
    setLeftMouseDown(false);
    setRightMouseDown(false);
  };

 const onMouseWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
  event.preventDefault();

  if (!canvasRef.current) return;

  const rect = canvasRef.current.getBoundingClientRect();

  const canvasX = event.clientX - rect.left;
  const canvasY = event.clientY - rect.top;
  const trueXBefore = toTrueX(canvasX);
  const trueYBefore = toTrueY(canvasY);
  const zoomFactor = 1 - event.deltaY / 500;
  const newScale = Math.max(0.1, Math.min(10, scale * zoomFactor)); 

  setScale(newScale);

  const trueXAfter = toTrueX(canvasX);
  const trueYAfter = toTrueY(canvasY);

  setOffsetX((o) => o + (trueXBefore - trueXAfter));
  setOffsetY((o) => o + (trueYBefore - trueYAfter));
};

  const undo = () => {
    if (disabled || drawingHistory.length < 2) return;

    const start = drawingHistory[drawingHistory.length - 2];
    const end = drawingHistory[drawingHistory.length - 1];

    const newDrawings = drawings.filter(
      (d) =>
        !(
          Math.abs(d.x1 - end.x) < 8 &&
          Math.abs(d.y1 - end.y) < 8
        )
    );

    setDrawings(newDrawings);
    setDrawingHistory((h) => h.slice(0, -2));
  };
  return (
    <div
      ref={canvasContainerRef}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <ColorPickerBar setStrokeStyle={setStrokeStyle} />
      
      <LeftBar
  save={save}
  importFile={importFile}
  disabled={disabled}
/>

      <OnlineUsers />
        {showFileUploader 
                && <FileUploader 
                    setShowFileUploader={setShowFileUploader}
                    setTextReadFromFile={setTextReadFromFile}    
                />
            }
            {showInfoPanel && <ShowInfoPanel setShowInfoPanel={setShowInfoPanel}/>}
      <BottomRightBar scale={scale} undo={undo} disabled={disabled} />
         <MoreActionsBar 
                lineWidth={lineWidth} 
                setLineWidth={setLineWidth} 
                setInstrument={setInstrument} 
                instrument={instrument}
            />
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onWheel={onMouseWheel}
      />
    </div>
  );
};

export default Canvas;
