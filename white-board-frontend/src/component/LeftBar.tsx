import { useState } from "react";
import styles from "../styles/LeftBar.module.scss";

type LeftBarProps = {
  save: () => void;
  importFile: () => void;
  disabled: boolean;
};

const LeftBar: React.FC<LeftBarProps> = ({
  save,
  disabled,
  importFile,
}) => {
  const [backgroundColor] = useState<string>("#E2E6EA");

  return (
    <div className={styles.leftbar}>
      <div
        style={{ background: disabled ? "#222" : backgroundColor }}
        onClick={save}
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
