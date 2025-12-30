import styles from "../style/ShowInfoPanel.module.scss";
type ShowInfoPanelProps = {
  setShowInfoPanel: (value: boolean) => void;
};

const ShowInfoPanel = ({ setShowInfoPanel }: ShowInfoPanelProps) => {
  const closePanel = () => {
    setShowInfoPanel(false);
  };

  return (
    <div className={styles.infoPanel} onClick={closePanel}>
      <div
        className={styles.inner}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className={styles.top}>
          <div className={styles.paragraph}>
            <h1>Whiteboard Controls</h1>
            <div className={styles.close} onClick={closePanel}>
              x
            </div>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.paragraph}>
            <h1 className={styles.heading}>Drawing</h1>
            <p className={styles.details}>
              🖱️ Left Click / ☝️ Single-finger-touch
            </p>
          </div>

          <div className={styles.paragraph}>
            <h1 className={styles.heading}>Moving</h1>
            <p className={styles.details}>
              🖱️ Right Click / ✌️ Two-finger-touch
            </p>
          </div>

          <div className={styles.paragraph}>
            <h1 className={styles.heading}>Zooming</h1>
            <p className={styles.details}>
              🖱️ Scroll Wheel / 🤏 Pinch
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.closeBtn} onClick={closePanel}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInfoPanel;
