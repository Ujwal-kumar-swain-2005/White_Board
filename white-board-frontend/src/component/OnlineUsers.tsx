import React, { useState } from 'react'
import styles from "../styles/OnlineUsers.module.scss";
import { ThemeContext } from '../context/ThemeContext';
const OnlineUsers = () => {
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');
    const {theme} = React.useContext(ThemeContext);
    React.useEffect(() => {
        if(!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);
        setColor(theme.color);
    }, [theme])
  return (
    <div className={styles.onlineUsers} style={{background: `${backgroundColor}`, color: `${color}`}}>
            <p>2</p>
            <p>👤</p>
        </div>
  )
}

export default OnlineUsers
