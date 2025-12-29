import styles from "../style/ColorPickerBar.module.scss";

type ColorPickerBarProps = {
  setStrokeStyle: (color: string) => void;
};

const ColorPickerBar: React.FC<ColorPickerBarProps> = ({ setStrokeStyle }) => {
  const colorList: string[] = [
    "#23272B",
    "#C82333",
    "#FD7E14",
    "#E0A800",
    "#218838",
    "#0069D9",
    "#6610F2",
  ];

  const changeStrokeStyle = (color: string): void => {
    setStrokeStyle(color);
  };

  return (
    <div className={styles.colorPickerBarscss}>
      {colorList.map((color: string, index: number) => (
        <div
          key={index}
          style={{ background: color }}
          onClick={() => changeStrokeStyle(color)}
        />
      ))}
    </div>
  );
};

export default ColorPickerBar;
