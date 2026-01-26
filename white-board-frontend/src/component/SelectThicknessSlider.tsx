import { useState, useEffect, useContext } from 'react'
import { Slider } from 'rsuite'
import { ThemeContext } from '../context/ThemeContext'
import 'rsuite/dist/rsuite.min.css'
import styles from '../styles/SelectThicknessSlider.module.scss'

type SelectThicknessSliderProps = {
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
  instrument: "pencil" | "eraser";
};

const SelectThicknessSlider: React.FC<SelectThicknessSliderProps> = ({
  lineWidth,
  setLineWidth,
  instrument,
}) => {
  const { theme } = useContext(ThemeContext);
  const [color, setColor] = useState<string>("#222");
  const [maxVal, setMaxVal] = useState<number>(10);

  useEffect(() => {
    if (!theme?.color) return;
    setColor(theme.color);
  }, [theme]);

  useEffect(() => {
    if (instrument === "pencil") {
      setMaxVal(10);
      if (lineWidth > 10) setLineWidth(10);
    } else if (instrument === "eraser") {
      setMaxVal(40);
    }
  }, [instrument, lineWidth, setLineWidth]);

  return (
    <div className={styles.selectThicknessSlider}>
      <p className={styles.text} style={{ color }}>
        Thickness
      </p>

      <Slider
        progress
        value={lineWidth}
        onChange={(value: number) => {
          setLineWidth(value);
        }}
        min={1}
        max={maxVal}
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default SelectThicknessSlider;
