import React, { useState } from 'react'
import GameStart from './GameStart/GameStart'
import CanvasGame from './CanvasGame/CanvasGame'
import GameOver from './GameOver/GameOver'
import Characters from './GameStart/components/CharacterChoice/Characters'

import { useStoreScore } from '../../hooks/useStoreScore'

const Game = () => {
  const [stage, setStage] = useState<'start' | 'play' | 'over'>('start')
  const [selectedCharacter, setSelectedCharacter] = useState(Characters[0].id)
  const [coins, setCoins] = useState(0)
  const [storeScoreToLeaderboard] = useStoreScore()

  const handleGameStart = () => {
    setStage('play')
    setCoins(0)
  }

  const handleGameOver = (score: number) => {
    setStage('over')
    if (navigator.onLine) {
      storeScoreToLeaderboard(score)
    }
  }

  const handleRepeat = () => {
    setStage('start')
  }

  if (stage === 'start') {
    return (
      <GameStart
        onStart={handleGameStart}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />
    )
  }
  if (stage === 'play') {
    return (
      <CanvasGame
        characterId={selectedCharacter}
        onGameOver={handleGameOver}
        onCoinsChange={setCoins}
      />
    )
  }
  return <GameOver onRepeat={handleRepeat} coins={coins} />
}
export const initGamePage = () => Promise.resolve()
export default Game
