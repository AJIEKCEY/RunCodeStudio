import React from 'react'
import { Button } from '../../../components/Button/Button'
import { Flex, Typography } from 'antd'

interface GameOverProps {
  onRepeat: () => void
}

const GameOver: React.FC<GameOverProps> = ({ onRepeat }) => {
  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>
        Игра завершена!
      </Typography.Title>
      <Typography.Text style={{ color: '#fff', marginBottom: '40px' }}>
        Поздравляем! Надеемся, вы получили удовольствие от прохождения
      </Typography.Text>
      <Button onClick={onRepeat}>Повторить</Button>
    </Flex>
  )
}

export default GameOver
