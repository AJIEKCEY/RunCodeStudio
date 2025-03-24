import { message } from 'antd'
import React, { useEffect, useState } from 'react'

function UseFullScreen(container: React.MutableRefObject<HTMLElement | null>) {
  const [isFullScreen, setFullScreen] = useState(false)
  const onEscape = (e: KeyboardEvent) => {
    if (e.code === 'esc' && document.fullscreenElement) {
      document.exitFullscreen()
      setFullScreen(false)
      return
    }
  }
  const onFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setFullScreen(false)
      return
    }
    container.current
      ?.requestFullscreen()
      .then(() => setFullScreen(true))
      .catch(err => message.error(`Ошибка ${err.message}`))
  }

  useEffect(() => {
    document.addEventListener('keydown', onFullScreen)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])

  return { onFullScreen, isFullScreen }
}

export default UseFullScreen
