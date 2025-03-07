import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Radio, Typography } from 'antd'
import { Button } from '../../../components/Button/Button'
import { AppRoutes } from '../../../AppRoutes'
import styles from './GameStart.module.css'

interface Character {
  id: string
  name: string
  description: string
}

const characters: Character[] = [
  {
    id: 'ninja',
    name: 'Ниндзя',
    description: 'Быстрый и ловкий боец, легко перепрыгивает препятствия.',
  },
  {
    id: 'robot',
    name: 'Робот',
    description: 'Тяжёлый, но устойчивый к ударам и способен пробивать стены.',
  },
  {
    id: 'alien',
    name: 'Пришелец',
    description:
      'Может парить над землёй и использовать необычные способности.',
  },
]

const rules = [
  'Нажмите стрелку вверх, чтобы прыгнуть',
  'Нажмите стрелку вниз, чтобы пригнуться',
  'Собирайте монеты, чтобы купить жизни или способности',
]

const GameStart: React.FC = () => {
  const navigate = useNavigate()

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].id)
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
      <div className={styles.characterSelect}>
        <Typography.Title level={2} style={{ color: '#fff', fontSize: '28px' }}>
          Выберите персонажа:
        </Typography.Title>
        <Radio.Group
          onChange={e => setSelectedCharacter(e.target.value)}
          value={selectedCharacter}
          className={styles.radioGroup}>
          {characters.map(character => (
            <Radio key={character.id} value={character.id}>
              {character.name}
            </Radio>
          ))}
        </Radio.Group>
        <div>
          <Typography.Text
            style={{
              color: '#fff',
              fontStyle: 'italic',
              fontSize: '14px',
              marginTop: '1rem',
              display: 'block',
            }}>
            {
              characters.find(character => character.id === selectedCharacter)
                ?.description
            }
          </Typography.Text>
        </div>
      </div>
      <Typography.Title
        level={3}
        style={{
          color: '#fff',
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '0',
          marginTop: '30px',
        }}>
        Правила игры:
      </Typography.Title>
      <ul style={{ marginTop: '0' }}>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
      <Button onClick={handleStartGame}>Старт</Button>
    </Flex>
  )
}

export default GameStart
