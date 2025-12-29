import React from 'react'
import { ThemeContext } from './ThemeContext'
const Example = () => {
    const { theme, dark, toggle } = React.useContext(ThemeContext);
  return (
     <div style={{ background: theme.backgroundColor, color: theme.color }}>
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  );
}

export default Example

