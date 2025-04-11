import React, { useEffect, useRef } from 'react'
import { Game } from './core/Game'
import style from './game.module.css'

interface CanvasGameProps {
  characterId: string
  onGameOver: (score: number) => void
  onCoinsChange: (coins: number) => void
}

const CanvasGame = ({
  characterId,
  onGameOver,
  onCoinsChange,
}: CanvasGameProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const refGame = useRef<Game | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    if (refGame.current) {
      refGame.current.destroy()
    }

    const game = new Game(canvas, {
      playerId: characterId,
      themeId: 'theme_2',
      canvasWidth: window.innerWidth,
      canvasHeight: 720,
      speed: 4,
      timeElapsed: 0,
      bgOfsetY: 120,
    })

    refGame.current = game

    game.onGameOver(() => {
      onGameOver(game.getElapsedTime())
      onCoinsChange(game.getCoins())
    })

    return () => {
      game.destroy()
    }
  }, [characterId, onGameOver, onCoinsChange])

  return (
    <>
      <canvas className={style.canvas} ref={ref}></canvas>
    </>
  )
}

export default CanvasGame
