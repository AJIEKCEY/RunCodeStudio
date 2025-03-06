import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import LayoutHeader from './LayoutHeader/LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'

function Container() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '1280px',
        marginInline: 'auto',
        borderRadius: 0,
        overflow: 'hidden',
      }}>
      <LayoutHeader />
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
  )
}

export default Container
