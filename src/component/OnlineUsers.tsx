import { useState } from "react";
import styles from "../style/OnlineUsers.module.scss";

const OnlineUsers: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#E2E6EA");
  const [color, setColor] = useState<string>("#222");

  return (
    <div
      className={styles.onlineUsers}
      style={{ background: backgroundColor, color }}
    >
      <p>2</p>
      <p>👤</p>
    </div>
  );
};

export default OnlineUsers;
