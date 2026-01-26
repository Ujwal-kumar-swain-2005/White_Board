import { useState, useEffect, useContext } from "react";
import styles from "../styles/BottomRightBar.module.scss";
import { ThemeContext } from "../context/ThemeContext";

type BottomRightBarProps = {
  scale: number;
  undo: () => void;
  disabled: boolean;
};

const BottomRightBar: React.FC<BottomRightBarProps> = ({
  scale,
  undo,
  disabled,
}) => {
  const { theme, toggle, dark } = useContext(ThemeContext);

  const [backgroundColor, setBackgroundColor] = useState<string>("#E2E6EA");
  const [color, setColor] = useState<string>("#222");

  useEffect(() => {
    if (theme.secondaryColor) {
      setBackgroundColor(theme.secondaryColor);
    }

    if (theme.color) {
      setColor(theme.color);
    }
  }, [theme]);

  return (
    <div className={styles.bottomRightBar}>
      
      <div
        className={styles.toggleTheme}
        onClick={toggle}
        style={{ background: backgroundColor }}
        title={`Switch to ${dark ? "Light" : "Dark"} mode`}
      >
        💡
      </div>

      {/* Undo */}
      <div
        className={styles.undo}
        onClick={undo}
        style={{ background: disabled ? "#222" : backgroundColor }}
      >
        ↺
      </div>
     <div className={styles.scale} style={{background: `${backgroundColor}`, color: `${color}`}}>Scale: {scale.toFixed(1)}</div>
    </div>
  );
};

export default BottomRightBar;
