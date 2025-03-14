import { useEffect, useRef, useState } from 'react'
import { Game } from './core/Game'
import style from './game.module.css'
import { Button } from 'antd'

const CanvasGame = () => {
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [isStart, setIsStart] = useState<boolean>(true)
  const [gameKey, setGameKey] = useState(0)
  const ref = useRef<HTMLCanvasElement | null>(null)
  const refGame = useRef<Game | null>(null)

  const handleStartGame = () => {
    setIsEnd(false)
    setIsStart(true)
    setGameKey(prev => prev + 1)
  }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    if (refGame.current) {
      refGame.current.destroy()
    }

    const game = new Game(canvas, {
      playerId: 'player_1',
      themeId: 'theme_1',
      canvasWidth: window.innerWidth,
      canvasHeight: 720,
      speed: 4,
      timeElapsed: 0,
      bgOfsetY: 120,
    })

    refGame.current = game

    game.onGameOver(isEnd => {
      setIsStart(false)
      setIsEnd(isEnd)
    })

    return () => {
      game.destroy()
    }
  }, [gameKey])

  return (
    <>
      {isStart && (
        <canvas key={gameKey} className={style.canvas} ref={ref}></canvas>
      )}
      {isEnd && (
        <>
          <h2>Конец игры</h2>
          <Button onClick={handleStartGame}>Начать сначала</Button>
        </>
      )}
    </>
  )
}

export default CanvasGame
