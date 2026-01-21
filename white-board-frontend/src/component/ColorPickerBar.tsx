import type { FC } from "react";
import styles from "../styles/ColorPickerBar.module.scss";

type ColorPickerBarProps = {
  setStrokeStyle: (color: string) => void;
};

const ColorPickerBar: FC<ColorPickerBarProps> = ({ setStrokeStyle }) => {
  const colorList: string[] = [
    "#23272B",
    "#C82333",
    "#FD7E14",
    "#E0A800",
    "#218838",
    "#0069D9",
    "#6610F2",
  ];

  const changeStrokeStyle = (color: string) => {
    setStrokeStyle(color);
  };

  return (
    <div className={styles.colorPickerBar}>
      {colorList.map((color) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => changeStrokeStyle(color)}
        />
      ))}
    </div>
  );
};

export default ColorPickerBar;
