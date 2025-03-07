import React from 'react'
import { Button } from '../../../components/Button/Button'
import styles from './GameOver.module.css'
import { Flex } from 'antd'

interface GameOverProps {
  onRepeat: () => void
}

const GameOver: React.FC<GameOverProps> = ({ onRepeat }) => {
  return (
    <Flex vertical gap="large" align="center" className="page">
      <h1 className={styles.title}>Игра завершена!</h1>
      <p className={styles.text}>
        Поздравляем! Надеемся, вы получили удовольствие от прохождения
      </p>
      <div className={styles.buttons}>
        <Button onClick={onRepeat}>Повторить</Button>
      </div>
    </Flex>
  )
}

export default GameOver
