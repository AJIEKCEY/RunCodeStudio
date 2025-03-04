import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Outlet } from 'react-router-dom'

function Container() {
  const {
    token: { colorBgContainer },
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
        style={{
          padding: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div
          style={{
            background: colorBgContainer,
            flex: 1,
            borderRadius: 0,
            overflowY: 'auto',
            margin: 0,
            padding: 0,
          }}>
          <Outlet />
        </div>
      </Content>
      <LayoutFooter text="RunCode Studio" />
    </Layout>
  )
}

export default Container
