import { message } from 'antd/lib'
import React, { useEffect, useState } from 'react'

function UseFullScreen(container: React.MutableRefObject<HTMLElement | null>) {
  const [isFullScreen, setFullScreen] = useState(false)

  const onFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setFullScreen(false)
      return
    }
    container.current
      ?.requestFullscreen()
      .then(() => setFullScreen(true))
      .catch((err) => message.error(`Ошибка ${err.message}`))
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'KeyF' && e.shiftKey) {
      onFullScreen()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return { onFullScreen, isFullScreen }
}

export default UseFullScreen
