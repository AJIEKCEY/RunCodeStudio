import {
  PlayerSpriteData,
  SpriteFrameData,
  TypeDataTheme,
} from './../types/index'

export const createSpriteData = (
  frameX: number,
  frameY: number,
  frames: number
): SpriteFrameData => ({ frameX, frameY, frames })

export const createPlayerSprite = (
  playerName: string,
  runFrames: number,
  jumpFrames: number,
  attackFrames: number,
  deadFrames: number
): PlayerSpriteData => {
  const image = new Image()
  image.src = `/sprite/players/${playerName}.png`

  return {
    image,
    frameWidth: 128,
    frameHeight: 128,
    animations: {
      run: createSpriteData(0, 0, runFrames),
      jump: createSpriteData(0, 1, jumpFrames),
      attack: createSpriteData(0, 2, attackFrames),
      dead: createSpriteData(0, 3, deadFrames),
    },
  }
}

export const createThemeData = (themeName: string, countLayers: number) => {
  return Array.from({ length: countLayers }).map((_, index) => {
    const image = new Image()
    image.src = `/sprite/themes/${themeName}/layer-${index + 1}.png`
    return {
      image,
      x: 0,
      speedModifier: (index + 1) * 0.2,
    }
  })
}

//сюда добовляем нового персонажа если такой будет.
export const players: Record<string, PlayerSpriteData> = {
  player_1: createPlayerSprite('player_1', 8, 10, 4, 3),
  player_2: createPlayerSprite('player_2', 8, 12, 4, 3),
  player_3: createPlayerSprite('player_3', 8, 12, 4, 4),
}

export const themes: Record<string, TypeDataTheme[]> = {
  theme_1: createThemeData('theme_1', 5),
  theme_2: createThemeData('theme_2', 5),
}

export const getPlayerSprite = (playerId: string): PlayerSpriteData => {
  const player = players[playerId]
  if (!player) {
    throw new Error('invalid playerId')
  }
  return player
}

export const getThemeSprite = (themeId: string) => {
  const theme = themes[themeId]
  if (!theme) {
    throw new Error('invalid playerId')
  }
  return theme
}
