import { EntityProps, GameSettings, TypeDataTheme } from '@/pages/Game/CanvasGame/types'
import { getThemeSprite } from './sprites'
import { IBackgroundProps } from './types'

export class Background {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private x: number
  private speed: number
  private props: IBackgroundProps
  private layerId: number

  constructor(ctx: CanvasRenderingContext2D, props: IBackgroundProps, layerId: number) {
    this.ctx = ctx
    this.width = props.width
    this.height = props.height
    this.x = 0
    this.speed = props.speed
    this.props = props
    this.layerId = layerId
  }

  update() {
    this.x -= this.speed
    if (this.x <= -this.width) {
      this.x = 0
    }
  }

  draw() {
    const offsetX = this.x
    const image = this.props.image as unknown as CanvasImageSource
    this.ctx.drawImage(image, offsetX, 0, this.width, this.height)
    this.ctx.drawImage(image, offsetX + this.width, 0, this.width, this.height)
  }

  animation(speed: number) {
    this.speed = speed * (this.layerId + 1) * 0.2
    this.update()
    this.draw()
  }
}
