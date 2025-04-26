import React from 'react'
import { Button } from '../../../components/Button/Button'
import { Flex, Typography } from 'antd/lib'
import { coinsWords } from '../../../utils/singlePluralWords'
import { useTheme } from '../../../context/ThemeContext'

interface GameOverProps {
  onRepeat: () => void
  coins: number
}

const GameOver = ({ onRepeat, coins }: GameOverProps) => {
  const { settings } = useTheme()
  const background =
    settings?.background ||
    'linear-gradient(135deg, #5f00b5, #4c0099 40%, #30006d)'
  const textColor = settings?.textColor || '#ffffff'
  const buttonColor = settings?.buttonColor || '#7fff00'
  const buttonTextColor = settings?.buttonTextColor || '#000000'
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      className="page"
      style={{ background: background, color: textColor }}>
      <Typography.Title style={{ color: textColor }}>
        Игра завершена!
      </Typography.Title>
      <Typography.Text style={{ color: textColor, marginBottom: '40px' }}>
        Поздравляем! Надеемся, вы получили удовольствие от прохождения
      </Typography.Text>
      <Typography.Text style={{ color: textColor }}>
        Вы собрали {coins} {coinsWords(coins)}
      </Typography.Text>
      <Button
        onClick={onRepeat}
        style={{
          backgroundColor: buttonColor,
          borderColor: buttonColor,
          color: buttonTextColor,
        }}>
        Повторить
      </Button>
    </Flex>
  )
}

export default GameOver
