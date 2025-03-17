import React, { useEffect, useState } from 'react'
import { Flex, Typography } from 'antd'
import { Button } from '../../../components/Button/Button'
import CharacterChoice from './components/CharacterChoice/CharacterChoice'
import Rules from './components/Rules'
import styles from './GameStart.module.css'

interface GameStartProps {
  onStart: () => void
  selectedCharacter: string
  setSelectedCharacter: (characterId: string) => void
}

const GameStart = ({
  onStart,
  selectedCharacter,
  setSelectedCharacter,
}: GameStartProps) => {
  const [countdown, setCountdown] = useState(60)
  const [isCounting, setIsCounting] = useState(true)

  useEffect(() => {
    if (!isCounting) return
    const timer = setInterval(() => setCountdown(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [isCounting])

  useEffect(() => {
    if (countdown === 0 && isCounting) {
      onStart()
    }
  }, [countdown, isCounting, onStart])

  const handleStopCountdown = () => {
    setIsCounting(false)
  }

  const handleStartGame = () => {
    onStart()
  }

  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>
        Подготовка к игре
      </Typography.Title>
      <Flex gap="small" align="center">
        <Typography.Text style={{ color: '#fff' }}>
          {isCounting ? (
            <>
              Игра начнётся через: <strong>{countdown}</strong>
            </>
          ) : (
            'Отсчёт остановлен'
          )}
        </Typography.Text>
        {isCounting && (
          <div className={styles.stopButton}>
            <Button onClick={handleStopCountdown}>Стоп</Button>
          </div>
        )}
      </Flex>
      <CharacterChoice
        selected={selectedCharacter}
        onSelect={setSelectedCharacter}
      />
      <Rules />
      <Button onClick={handleStartGame}>Старт</Button>
    </Flex>
  )
}

export default GameStart
