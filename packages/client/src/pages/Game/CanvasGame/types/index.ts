//sprites
export interface SpriteFrameData {
  frameX: number
  frameY: number
  frames: number
}

export interface PlayerAnimations {
  run: SpriteFrameData
  jump: SpriteFrameData
  attack: SpriteFrameData
  dead: SpriteFrameData
}

export interface PlayerSpriteData {
  image: HTMLImageElement
  frameWidth: number
  frameHeight: number
  animations: PlayerAnimations
}

export interface TypeDataTheme {
  image: HTMLImageElement
  x: number
  speedModifier: number
}

//game
export type GameSettings = {
  playerId: string
  themeId: string
  theme: {
    background: HTMLImageElement
  }
  speed: number
  timeElapsed: number
  canvasWidth: number
  canvasHeight: number
  bgOfsetY: 120
}

//Общие пропсы
export interface EntityProps {
  ctx: CanvasRenderingContext2D
  settings: GameSettings
  x?: number
  y?: number
}

export interface GameObject {
  getBounds(): { x: number; y: number; width: number; height: number }
}
