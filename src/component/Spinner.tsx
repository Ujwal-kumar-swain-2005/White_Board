import styles from "../style/Spinner.module.scss";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

type SpinnerProps = {
  color: string;
  loading: boolean;
  connecting: boolean;
};

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color, loading, connecting }: SpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <div className={styles.centerInner}>
        <ClimbingBoxLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={15}
        />
        {connecting && (
          <p className={styles.text}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Spinner;
