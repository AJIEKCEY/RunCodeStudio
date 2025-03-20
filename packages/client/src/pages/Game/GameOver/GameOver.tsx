import React from 'react'
import { Button } from '../../../components/Button/Button'
import { Flex, Typography } from 'antd'
import { coinsWords } from '../../../utils/singlePluralWords'

interface GameOverProps {
  onRepeat: () => void
  coins: number
}

const GameOver = ({ onRepeat, coins }: GameOverProps) => {
  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>
        Игра завершена!
      </Typography.Title>
      <Typography.Text style={{ color: '#fff', marginBottom: '40px' }}>
        Поздравляем! Надеемся, вы получили удовольствие от прохождения
      </Typography.Text>
      <Typography.Text style={{ color: '#fff' }}>
        Вы собрали {coins} {coinsWords(coins)}
      </Typography.Text>
      <Button onClick={onRepeat}>Повторить</Button>
    </Flex>
  )
}

export default GameOver
