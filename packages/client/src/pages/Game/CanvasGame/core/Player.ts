import {
  GameSettings,
  PlayerAnimations,
  EntityProps,
  PlayerSpriteData,
} from '../types'
import { getPlayerSprite } from './sprites'

export class Player {
  private ctx: CanvasRenderingContext2D
  private gameFrame = 0
  private frameWidth: number
  private frameHeight: number
  private staggerFrame: number
  private speed: number
  private frameX = 0
  private frames = 0
  private frameY = 0
  private settings: GameSettings
  private sprite: PlayerSpriteData
  private playerImage: HTMLImageElement
  private velocityY = 0
  private gravity = 0.3
  private isJumping = false
  private isAtack = false
  private isDead = false
  private defaultY: number
  private y: number
  private x: number
  private lastFramX: number | null = null

  constructor(props: EntityProps) {
    const { ctx, settings } = props

    this.ctx = ctx
    this.sprite = getPlayerSprite(settings.playerId)

    this.settings = settings
    this.speed = this.settings.speed
    this.staggerFrame = 8
    this.playerImage = this.sprite.image
    this.frameWidth = this.sprite.frameWidth
    this.frameHeight = this.sprite.frameHeight

    this.defaultY =
      this.settings.canvasHeight - (this.frameHeight + this.settings.bgOfsetY)
    this.x = 24
    this.y = this.defaultY

    document.addEventListener('keydown', this._events)

    this.setAnimation('run')
  }

  setAnimation(key: keyof PlayerAnimations) {
    const adnimation = this.sprite.animations[key]

    this.gameFrame = 0
    this.frameX = adnimation.frameX
    this.frameY = adnimation.frameY
    this.frames = adnimation.frames

    if (key === 'dead') this.isDead = true
  }

  _events = (e: KeyboardEvent) => {
    if (this.isDead) return false

    if (e.code === 'Space' && !this.isJumping) {
      this.velocityY = -10
      this.isJumping = true
      const timeJump = (this.velocityY / this.gravity) * -1 * 2 // анимации прыжка проигрывается за это время
      this.setAnimation('jump')
      this.staggerFrame = Math.round(timeJump / this.frames) // кадр анимации прыжка меняется раз в это время
    }

    if (e.code === 'KeyK') {
      this.isAtack = true
      this.setAnimation('attack')
    }
  }

  drawJump() {
    if (!this.isJumping) return
    this.y += this.velocityY
    this.velocityY += this.gravity

    if (this.y >= this.defaultY) {
      this.y = this.defaultY
      this.velocityY = 0
      this.isJumping = false
      this.setAnimation('run')
    }
  }

  drawAttac() {
    if (this.frameX === this.frames - 1 && this.isAtack) {
      this.setAnimation('run')
      this.isAtack = false
    }
  }

  drawDead() {
    if (!this.isDead) return
    if (this.frameX === this.frames - 1) {
      this.lastFramX = this.frames - 1
    }

    if (this.lastFramX) this.frameX = this.lastFramX
  }

  animation = (speedGame: number) => {
    this.speed = speedGame || this.speed
    this.frameX = Math.floor((this.gameFrame / this.staggerFrame) % this.frames)
    // console.log(this.frames)
    this.drawJump()
    this.drawAttac()
    this.drawDead()

    this.ctx.drawImage(
      this.playerImage,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    )

    this.frameX = Math.floor((this.gameFrame / this.staggerFrame) % this.frames)
    this.gameFrame++
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.frameWidth,
      height: this.frameHeight,
    }
  }

  getOffset() {
    //подогнанные значения под фрейм (по сути для каждой анимации run, jump и т/д должны быть свои значения)
    return {
      offestRightX: 44,
      offsetLeftX: 76,
      offsetTopY: 50,
    }
  }
}
