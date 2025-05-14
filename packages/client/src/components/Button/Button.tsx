import React from 'react'
import styles from './Button.module.css'

type Props = {
  onClick: () => void
  style?: React.CSSProperties
}

export const Button = ({ onClick, style, children }: React.PropsWithChildren<Props>) => (
  <button onClick={onClick} style={style} className={styles.button}>
    {children}
  </button>
)
