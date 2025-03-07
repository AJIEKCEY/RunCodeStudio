import { Header } from 'antd/es/layout/layout'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import styles from './LayoutHeader.module.css'

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
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }}>
        {items.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className={styles.header_auth}>
        <Link to="login">Вход</Link>
        <Link to="registration">Регистрация</Link>
      </div>
    </Header>
  )
}
export default LayoutHeader
