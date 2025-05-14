import { EntityProps, GameSettings, TypeDataTheme } from '../types'
import { getThemeSprite } from './sprites'
import { IBackgroundProps } from './types'

export class Background {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private x: number
  private speed: number

  constructor(ctx: CanvasRenderingContext2D, props: IBackgroundProps) {
    this.ctx = ctx
    this.width = props.width
    this.height = props.height
    this.x = 0
    this.speed = props.speed
  }

  update() {
    this.x -= this.speed
    if (this.x <= -this.width) {
      this.x = 0
    }
  }

  draw(props: IBackgroundProps) {
    const offsetX = this.x
    const image = props.image as unknown as CanvasImageSource
    this.ctx.drawImage(image, offsetX, 0, this.width, this.height)
    this.ctx.drawImage(image, offsetX + this.width, 0, this.width, this.height)
  }
}
