import { useState } from "react";
import styles from "../styles/LeftBar.module.scss";
import { ThemeContext } from "../context/ThemeContext";
import React from "react";
import { useEffect } from "react";
type LeftBarProps = {
   save?: () => void;
  importFile: () => void;
  disabled: boolean;
};

const LeftBar: React.FC<LeftBarProps> = ({
  save,
  disabled,
  importFile,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#E2E6EA");
    const {theme } = React.useContext(ThemeContext);
    useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);
    }, [theme])
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
