import { Layout, theme } from 'antd'
import LayoutHeader from './LayoutHeader/LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'
import { useRef } from 'react'
import useFullScreen from '../hooks/useFullScreen'

function Container() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const container = useRef<HTMLElement | null>(null)

  const { onFullScreen, isFullScreen } = useFullScreen(container)
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
      }}
      ref={container}>
      <LayoutHeader />
      <Layout.Content
        className={styles['layout-container']}
        style={{ overflowY: 'auto' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100%',
            borderRadius: borderRadiusLG,
            height: '100%',
          }}>
          <Outlet />
        </div>
      </Layout.Content>
      <LayoutFooter
        text="RunCode Studio"
        onFullScreen={onFullScreen}
        isFullScreen={isFullScreen}
      />
    </Layout>
  )
}

export default Container
