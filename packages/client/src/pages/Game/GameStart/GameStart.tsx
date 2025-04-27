import React, { useEffect, useState } from 'react'
import { Flex, Typography } from 'antd/lib'
import { Button } from '../../../components/Button/Button'
import CharacterChoice from './components/CharacterChoice/CharacterChoice'
import Rules from './components/Rules'
import { secondsWords } from '../../../utils/singlePluralWords'
import { useTheme } from '../../../context/ThemeContext'

interface GameStartProps {
  onStart: VoidFunction
  selectedCharacter: string
  setSelectedCharacter: (characterId: string) => void
}

const GameStart = ({
  onStart,
  selectedCharacter,
  setSelectedCharacter,
}: GameStartProps) => {
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const { settings } = useTheme()

  useEffect(() => {
    if (!showCountdown) return
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [showCountdown])

  useEffect(() => {
    if (countdown === 0 && showCountdown) {
      onStart()
    }
  }, [countdown, showCountdown, onStart])

  const handleStartClick = () => {
    setCountdown(3)
    setShowCountdown(true)
  }

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
        Подготовка к игре
      </Typography.Title>
      {!showCountdown && (
        <>
          <CharacterChoice
            selected={selectedCharacter}
            onSelect={setSelectedCharacter}
          />
          <Rules />
          <Button
            onClick={handleStartClick}
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
              color: buttonTextColor,
            }}>
            Старт
          </Button>
        </>
      )}
      {showCountdown && (
        <Typography.Text style={{ color: textColor, fontSize: '24px' }}>
          Игра начнётся через {countdown} {secondsWords(countdown)}
        </Typography.Text>
      )}
    </Flex>
  )
}

export default GameStart
