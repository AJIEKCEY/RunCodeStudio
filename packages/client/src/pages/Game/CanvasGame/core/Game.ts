import { GameObject, GameSettings } from '@/pages/Game/CanvasGame/types'
import { Coin } from './Coin'
import { Obstacle } from './Obstacle'
import { Player } from './Player'
import { Background } from './Background'
import { getThemeSprite } from './sprites'

type IntervalType = ReturnType<typeof setInterval>

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private player: Player
  private theme: Background[]
  private obstacles: Obstacle[] = []
  private coins: Coin[] = []
  animationFrameId: number | null
  intervalObstaclesId: IntervalType
  intervalCoinsId: IntervalType
  intervalTimerId: IntervalType
  startGame = false
  isEndGame = false
  settings: GameSettings
  private gameOverCallback: ((running: boolean) => void)[] = []
  private timeElapsed = 0
  private score = 0
  private speed: number

  constructor(canvas: HTMLCanvasElement, settings: GameSettings) {
    this.canvas = canvas
    this.canvas.width = settings.canvasWidth
    this.canvas.height = settings.canvasHeight
    this.animationFrameId = null
    this.ctx = canvas.getContext('2d')!
    this.settings = settings
    this.speed = this.settings.speed

    const entityProps = {
      ctx: this.ctx,
      settings: this.settings,
    }

    // Создаем фон со всеми слоями из темы
    const themeLayers = getThemeSprite(settings.themeId)
    this.theme = themeLayers.map(
      (layer, index) =>
        new Background(
          this.ctx,
          {
            image: layer.image,
            width: this.settings.canvasWidth,
            height: this.settings.canvasHeight,
            speed: this.settings.speed * layer.speedModifier,
          },
          index
        )
    )

    this.player = new Player(entityProps)

    this.obstacles.push(new Obstacle(entityProps))
    this.coins.push(new Coin(entityProps))

    this.intervalObstaclesId = setInterval(() => {
      this.obstacles.push(Obstacle.spawn(entityProps))
    }, 2000)

    this.intervalCoinsId = setInterval(() => {
      const newCoins = Coin.spawn(entityProps)
      console.info(newCoins)
      this.coins.push(...newCoins)
    }, 5000)

    this.intervalTimerId = setInterval(() => {
      this.timeElapsed++
      this.checkSpeedIncrease()
    }, 1000)

    this.startGame = true
    this.animation()
  }
  getElapsedTime(): number {
    return this.timeElapsed
  }
  checkSpeedIncrease() {
    if (this.timeElapsed % 10 === 0) {
      this.speed += 1
    }
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0')
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  drawUI() {
    this.ctx.fillStyle = 'white'
    this.ctx.font = '24px Arial'

    this.ctx.fillText(`Time: ${this.formatTime(this.timeElapsed)}`, 20, 40)
    this.ctx.fillText(`Coins: ${this.score}`, 20, 80)
  }

  checkCollision(player: Player, object: GameObject): boolean {
    const p = player.getBounds()
    const { offestRightX, offsetLeftX, offsetTopY } = player.getOffset()
    const o = object.getBounds()

    return (
      p.x < o.x + o.width - offsetLeftX &&
      p.x + p.width - offestRightX > o.x &&
      p.y < o.y + o.height - offsetTopY &&
      p.y + p.height > o.y
    )
  }

  updateObstacleWithPlayer() {
    this.obstacles.forEach((obstacle) => {
      if (this.checkCollision(this.player, obstacle)) {
        this.player.setAnimation('dead')
        this.speed = 0

        setTimeout(() => {
          this.triggerGameOverCallback()
        }, 2000)
      }

      this.obstacles = this.obstacles.filter(
        (obstacle) => obstacle.getBounds().x + obstacle.getBounds().width >= 0
      )
    })
  }

  updateCoinWithPlayer() {
    this.coins.forEach((coin, index) => {
      if (this.checkCollision(this.player, coin)) {
        this.score += 1
        this.coins.splice(index, 1)
      }
    })
  }

  animation = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.player.isDead()) {
      this.theme.forEach((layer) => layer.animation(0))
      this.obstacles.forEach((obstacle) => obstacle.animation(0))
      this.coins.forEach((coin) => coin.animation(0))

      this.player.animation(1)

      this.drawUI()
      this.animationFrameId = requestAnimationFrame(this.animation)
      return
    }

    this.theme.forEach((layer) => layer.animation(this.speed))
    this.player.animation(this.speed)

    this.obstacles.forEach((obstacle) => obstacle.animation(this.speed))
    this.updateObstacleWithPlayer()
    this.coins.forEach((coins) => coins.animation(this.speed))
    this.updateCoinWithPlayer()

    this.drawUI()

    this.animationFrameId = requestAnimationFrame(this.animation)
  }

  triggerGameOverCallback() {
    this.gameOverCallback.forEach((el) => el(true))
  }
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }

    clearInterval(this.intervalObstaclesId)
    clearInterval(this.intervalCoinsId)
    clearInterval(this.intervalTimerId)
  }

  getCoins() {
    return this.score
  }

  endGame = () => {
    this.destroy()
    this.startGame = false
    this.isEndGame = true
    this.triggerGameOverCallback()
  }

  //думаю можно лучше сделать
  onGameOver(callback: (running: boolean) => void) {
    if (typeof callback === 'function') {
      this.gameOverCallback.push(callback)
    }
  }
}
