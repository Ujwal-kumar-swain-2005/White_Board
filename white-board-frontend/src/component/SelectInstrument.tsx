import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import styles from '../styles/SelectInstrument.module.scss'

type SelectInstrumentProps = {
  setInstrument: (instrument: string) => void
}

const SelectInstrument: React.FC<SelectInstrumentProps> = ({ setInstrument }) => {
  const { theme } = useContext(ThemeContext)

  const [backgroundColor, setBackgroundColor] = useState<string>('#E2E6EA')

  useEffect(() => {
    if (!theme?.backgroundColor) return
    setBackgroundColor(theme.backgroundColor)
  }, [theme])

  return (
    <div className={styles.selectInstrument}>
      <div
        className={styles.instrument}
        style={{ background: backgroundColor }}
        onClick={() => setInstrument('pencil')}
      >
        ✒️
      </div>

      <div
        className={styles.instrument}
        style={{ background: backgroundColor }}
        onClick={() => setInstrument('eraser')}
      >
        🧹
      </div>
    </div>
  )
}

export default SelectInstrument
