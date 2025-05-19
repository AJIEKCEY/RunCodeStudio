import { EntityProps, GameSettings } from '../types'

export class Coin {
  private ctx: CanvasRenderingContext2D
  private settings: GameSettings
  private iamgeCoin: HTMLImageElement
  private width: number
  private height: number
  private frameX = 0
  private frames = 4
  private frameWidth: number
  private gameFrame = 0
  private positionY: number
  private y: number
  private x: number
  private speed: number

  constructor(props: EntityProps) {
    const { ctx, settings, x = 2000, y = 0 } = props
    this.ctx = ctx
    this.settings = settings
    this.iamgeCoin = new Image()
    this.iamgeCoin.src = '/sprite/coin.png'
    this.width = 199
    this.height = 50
    this.frameWidth = this.width / this.frames
    this.speed = this.settings.speed

    this.positionY = this.settings.canvasHeight - (this.height + this.settings.bgOfsetY)
    this.x = x + 2000
    this.y = this.positionY - y
  }

  animation(gameSpeed: number) {
    this.speed = gameSpeed === 0 ? 0 : this.speed
    this.frameX = Math.floor((this.gameFrame / 10) % this.frames)

    this.ctx.drawImage(
      this.iamgeCoin,
      this.frameX * this.frameWidth,
      0,
      this.frameWidth - 2, // подгнал офсет -2 , сам спрайт не очень хороший в будущем можно будет сменить
      this.height,
      this.x,
      this.y,
      this.frameWidth,
      this.height
    )

    this.x -= this.speed
    this.gameFrame++
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }

  static spawn(props: EntityProps): Coin[] {
    const coins: Coin[] = []
    const numberOfCoins = Math.floor(Math.random() * 3) + 1 // От 1 до 3 монет
    const startX = props.settings.canvasWidth + 50 // Начинаем чуть за экраном

    // Максимальная высота прыжка примерно 200 пикселей (velocityY = -10, gravity = 0.3)
    const maxJumpHeight = 200
    const baseY = maxJumpHeight * 0.8 // 80% от максимальной высоты прыжка

    for (let i = 0; i < numberOfCoins; i++) {
      const x = startX + i * 50 // Немного раздвигаем монетки по X
      const y = Math.random() * baseY // Случайная высота в пределах 80% от максимальной высоты прыжка

      coins.push(new Coin({ ...props, x, y }))
    }

    return coins
  }
}
