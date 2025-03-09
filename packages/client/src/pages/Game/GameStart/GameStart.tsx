import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Typography } from 'antd'
import { Button } from '../../../components/Button/Button'
import { AppRoutes } from '../../../AppRoutes'
import CharacterChoice from './components/CharacterChoice/CharacterChoice'
import Rules from './components/Rules'
import styles from './GameStart.module.css'

const GameStart: React.FC = () => {
  const navigate = useNavigate()

  const [countdown, setCountdown] = useState(60)
  const [isCounting, setIsCounting] = useState(true)

  useEffect(() => {
    if (!isCounting) return
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isCounting])
  useEffect(() => {
    if (countdown === 0 && isCounting) {
      handleStartGame()
    }
  }, [countdown, isCounting])

  const handleStartGame = () => {
    setIsCounting(false)
    // для демонстрации переходим на /play
    // TODO: удалить, когда будет написана сама игра
    navigate('/' + AppRoutes.PLAY)
  }
  const handleStopCountdown = () => {
    setIsCounting(false)
  }

  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>
        Подготовка к игре
      </Typography.Title>
      <Flex gap="small" align="center">
        {isCounting ? (
          <Typography.Text style={{ color: '#fff' }}>
            Игра начнётся через: <strong>{countdown}</strong>
          </Typography.Text>
        ) : (
          <Typography.Text style={{ color: '#fff' }}>
            Отсчёт остановлен
          </Typography.Text>
        )}
        {isCounting && (
          <div className={styles.stopButton}>
            <Button onClick={handleStopCountdown}>Стоп</Button>
          </div>
        )}
      </Flex>
      <CharacterChoice />
      <Rules />
      <Button onClick={handleStartGame}>Старт</Button>
    </Flex>
  )
}

export default GameStart
