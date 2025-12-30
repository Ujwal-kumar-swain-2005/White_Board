import { useState } from "react";
import styles from "../style/BottomRightBar.module.scss";

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
  const [backgroundColor] = useState<string>("#E2E6EA");
  const [color] = useState<string>("#222");

  return (
    <div className={styles.bottomRightBar}>
      <div
        className={styles.toggleTheme}
        style={{ background: backgroundColor }}
      >
        💡
      </div>

      <div
        className={styles.undo}
        onClick={!disabled ? undo : undefined}
        style={{ background: disabled ? "#222" : backgroundColor }}
      >
        ↺
      </div>

      <div
        className={styles.scale}
        style={{ background: backgroundColor, color }}
      >
        Scale: {scale}
      </div>
    </div>
  );
};

export default BottomRightBar;
