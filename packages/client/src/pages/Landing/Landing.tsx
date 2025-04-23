import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import styles from './Landing.module.css'
import { AppRoutes } from '../../AppRoutes'
import { Flex } from 'antd/lib'
import { useAuth } from '../../hooks/useAuth'
import { useYandexAuthMutation } from '../../store/features/user/userApiSlice'

const REDIRECT_URI = 'http://localhost:3000'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Landing: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const query = useQuery()
  const code = query.get('code')
  const [yandexAuth] = useYandexAuthMutation()

  const handleButtonClick = () => {
    navigate('/' + AppRoutes.PLAY)
  }

  useEffect(() => {
    const sendYandexCode = async () => {
      try {
        await yandexAuth({ code: code!, redirect_uri: REDIRECT_URI }).unwrap()
        await login({ name: 'Яндекс-пользователь', isAuthenticated: true })
        window.history.replaceState(null, '', '/')
      } catch (err) {
        console.error(err)
      }
    }
    if (code) {
      sendYandexCode()
    }
  }, [code, login, navigate, yandexAuth])

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
