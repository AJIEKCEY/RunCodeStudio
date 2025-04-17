import { Layout } from 'antd/lib'
import { Menu } from 'antd/lib'
import { Link } from 'react-router-dom'
import styles from './LayoutHeader.module.css'
import { useAuth } from '../../hooks/useAuth'

const items = [
  {
    key: 'main',
    path: '/',
    title: 'Главная',
  },
  {
    key: 'play',
    path: 'play',
    title: 'Игра',
  },
  {
    key: 'profile',
    path: 'profile',
    title: 'Профиль',
  },
  {
    key: 'forum',
    path: 'forum',
    title: 'Форум',
  },
  {
    key: 'leader-board',
    path: 'leader-board',
    title: 'Лидборд',
  },
]

function LayoutHeader() {
  const { logout, user } = useAuth()

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }}>
        {items.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className={styles.header_auth}>
        {!user && (
          <>
            <Link to="login">Вход</Link>
            <Link to="registration">Регистрация</Link>
          </>
        )}
        {user && (
          <Link to="/" onClick={logout}>
            Выход
          </Link>
        )}
      </div>
    </Layout.Header>
  )
}
export default LayoutHeader
