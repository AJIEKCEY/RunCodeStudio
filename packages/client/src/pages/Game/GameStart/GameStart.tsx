import React, { useEffect, useState } from 'react'
import { Flex, Typography } from 'antd/lib'
import { Button } from '../../../components/Button/Button'
import CharacterChoice from './components/CharacterChoice/CharacterChoice'
import Rules from './components/Rules'
import { secondsWords } from '../../../utils/singlePluralWords'

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

  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>
        Подготовка к игре
      </Typography.Title>
      {!showCountdown && (
        <>
          <CharacterChoice
            selected={selectedCharacter}
            onSelect={setSelectedCharacter}
          />
          <Rules />
          <Button onClick={handleStartClick}>Старт</Button>
        </>
      )}
      {showCountdown && (
        <Typography.Text style={{ color: '#fff', fontSize: '24px' }}>
          Игра начнётся через {countdown} {secondsWords(countdown)}
        </Typography.Text>
      )}
    </Flex>
  )
}

export default GameStart
