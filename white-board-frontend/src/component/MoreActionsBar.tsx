import { useState, useEffect, useContext, type Dispatch,type  SetStateAction } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import SelectThicknessSlider from './SelectThicknessSlider'
import SelectInstrument from './SelectInstrument'
import styles from '../styles/MoreActionsBar.module.scss'
import type { Instrument } from './types'

type MoreActionsBarProps = {
  lineWidth: number
  setLineWidth: Dispatch<SetStateAction<number>>
  instrument: Instrument
  setInstrument: Dispatch<SetStateAction<Instrument>>
}

const MoreActionsBar = ({
  lineWidth,
  setLineWidth,
  instrument,
  setInstrument,
}: MoreActionsBarProps) => {
  const { theme } = useContext(ThemeContext)

  const [backgroundColor, setBackgroundColor] = useState<string>('#E2E6EA')
  const [width, setWidth] = useState<number>(45)
  const [height, setHeight] = useState<number>(45)
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)

  useEffect(() => {
    if (!theme?.secondaryColor) return
    setBackgroundColor(theme.secondaryColor)
  }, [theme])

  const openMenu = () => {
    setWidth(230)
    setHeight(200)
    setIsMenuOpened(true)
  }

  const closeMenu = () => {
    setWidth(45)
    setHeight(45)
    setIsMenuOpened(false)
  }

  const Menu = () => {
    return (
      <div className={styles.menuInner}>
        <div className={styles.closeMenu} onClick={closeMenu}>
          📕
        </div>
        <SelectInstrument setInstrument={(instrument: string) => setInstrument(instrument as Instrument)} />
        <SelectThicknessSlider
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          instrument={instrument}
        />
      </div>
    )
  }

  return (
    <div
      className={styles.moreActionsBar}
      style={{
        background: backgroundColor,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {isMenuOpened ? (
        <Menu />
      ) : (
        <div className={styles.openMenu} onClick={openMenu}>
          📖
        </div>
      )}
    </div>
  )
}

export default MoreActionsBar
