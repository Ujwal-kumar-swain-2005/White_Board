import { useState } from "react";
import styles from "../style/LeftBar.module.scss";
type LeftBarProps = {
  save: () => void;
  importFile: () => void;
  disabled: boolean;
};

const LeftBar = ({ save, disabled, importFile }: LeftBarProps) => {
  const [backgroundColor] = useState<string>("#E2E6EA");

  return (
    <div className={styles.leftbar}>
    
      <div
        style={{ background: disabled ? "#222" : backgroundColor }}
        onClick={!disabled ? save : undefined}
      >
        💾
      </div>
      <div
        style={{ background: backgroundColor }}
        onClick={importFile}
      >
        📤
      </div>
    </div>
  );
};

export default LeftBar;
