import React from 'react'
import styles from './Button.module.css'

type Props = {
  onClick: () => void
}

export const Button = ({
  onClick,
  children,
}: React.PropsWithChildren<Props>) => (
  <button onClick={onClick} className={styles.button}>
    {children}
  </button>
)
