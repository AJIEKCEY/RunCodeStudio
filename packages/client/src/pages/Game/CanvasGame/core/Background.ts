import { EntityProps, GameSettings, TypeDataTheme } from '../types'
import { getThemeSprite } from './sprites'

export class Backgournd {
  themesImages: TypeDataTheme[]
  ctx: CanvasRenderingContext2D
  settings: GameSettings
  width: number
  height: number
  speed: number

  constructor(props: EntityProps) {
    const { ctx, settings } = props
    this.ctx = ctx
    this.themesImages = getThemeSprite(settings.themeId)
    this.width = 2400
    this.height = this.themesImages[0].image.height
    this.speed = settings.speed
    this.settings = settings
  }

  draw(props: TypeDataTheme) {
    const offsetX = Math.round(props.x)
    this.ctx.drawImage(props.image, offsetX, 0, this.width, this.height)
    this.ctx.drawImage(
      props.image,
      offsetX + this.width,
      0,
      this.width,
      this.height
    )

    console.log(this.speed)

    if (props.x <= -this.width) {
      props.x = 0
    }

    props.x -= this.speed * props.speedModifier
  }

  animation = (speedGame: number) => {
    this.speed = speedGame || this.speed
    this.themesImages.forEach(layer => {
      this.draw(layer)
    })
  }
}
