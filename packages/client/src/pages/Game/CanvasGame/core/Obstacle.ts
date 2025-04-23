import { EntityProps } from '../types'
import { Player } from './Player'

export class Obstacle {
  private ctx: CanvasRenderingContext2D
  private image: HTMLImageElement
  private x: number
  private y: number
  private width: number
  private height: number
  private speed: number

  constructor(props: EntityProps) {
    const { ctx, settings } = props
    this.ctx = ctx
    this.image = new Image()
    this.image.src = '/sprite/obstacle/box.png' // пока что один объект
    this.width = 60
    this.height = 48
    this.x = 2400
    this.y = settings.canvasHeight - this.height - settings.bgOfsetY
    this.speed = settings.speed
  }

  animation(speedGame: number) {
    this.speed = speedGame === 0 ? 0 : this.speed
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    this.x -= this.speed
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }

  static spawn(props: EntityProps): Obstacle {
    return new Obstacle(props)
  }
}
