import { Layout, MenuProps, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Link, Outlet } from 'react-router-dom'
import styles from './layout.module.css'

<<<<<<< HEAD
=======
type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: 'main',
    label: <Link to="/">На главную</Link>,
  },
]
>>>>>>> f8b1bfa (feat: изменения в базовом слое)
function Container() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
<<<<<<< HEAD
    <Layout
      style={{
        height: '100vh',
        paddingTop: 0,
        maxWidth: '1280px',
        marginInline: 'auto',
      }}>
      <LayoutHeader />
      <Content style={{ padding: '0 10px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </div>
      </Content>
      <LayoutFooter text="RunCode Studio" />
    </Layout>
=======
    <>
      <Layout
        style={{
          height: '100vh',
          paddingTop: 0,
          maxWidth: '1280px',
          marginInline: 'auto',
        }}>
        <LayoutHeader items={items} />
        <Content
          className={styles['layout-container']}
          style={{ padding: '0 10px', overflowY: 'auto' }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: '100%',
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
        <LayoutFooter text="RunCode Studio" />
      </Layout>
    </>
>>>>>>> f8b1bfa (feat: изменения в базовом слое)
  )
}

export default Container
