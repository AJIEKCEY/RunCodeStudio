import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import LayoutHeader from './LayoutHeader/LayoutHeader'
import LayoutFooter from './LayoutFooter'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'
import { useEffect, useRef } from 'react'

function Container() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const container = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onFullScreen = (e: KeyboardEvent) => {
      if (e.code === 'KeyF') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
          return
        }
        container.current
          ?.requestFullscreen()
          .catch(err => console.log(`Ошибка ${err.message}`))
      }
    }

    document.addEventListener('keydown', onFullScreen)
    return () => document.removeEventListener('keydown', onFullScreen)
  }, [])

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
      <Content
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
      </Content>
      <LayoutFooter text="RunCode Studio" />
    </Layout>
  )
}

export default Container
