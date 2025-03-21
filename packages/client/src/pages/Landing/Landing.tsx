import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import styles from './Landing.module.css'
import { AppRoutes } from '../../AppRoutes'
import { Flex } from 'antd'

const Landing: React.FC = () => {
  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/' + AppRoutes.PLAY)
  }

  return (
    <Flex vertical gap="large" align="center" className="page">
      <h1 className={styles.title}>
        Добро пожаловать в<span className={styles.pixelBlock}>RunCode!</span>
      </h1>
      <p className={styles.text}>
        <span className={styles.pixelInline}>RunCode</span> — это захватывающая
        аркадная игра, где вам предстоит управлять героем, преодолевая
        препятствия и собирая бонусы. Игра вдохновлена классическими играми,
        такими как Mario, Sonic Dash.
      </p>
      <div className={styles.LandingButton}>
        <Button onClick={handleButtonClick}>Начать игру</Button>
      </div>
    </Flex>
  )
}

export default Landing
