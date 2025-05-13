import { Backgournd } from '../core/Background'
import { EntityProps, GameSettings, TypeDataTheme } from '../types'

jest.mock('../core/sprites', () => ({
  getThemeSprite: jest.fn(themeId => {
    if (themeId === 'theme_1') {
      return [
        { image: new Image(), x: 0, speedModifier: 1 },
        { image: new Image(), x: 0, speedModifier: 0.5 },
      ]
    }
    throw new Error('invalid themeId')
  }),
}))

describe('Backgournd class', () => {
  let mockCtx: Partial<CanvasRenderingContext2D>
  let background: Backgournd
  let mockProps: EntityProps

  beforeEach(() => {
    mockCtx = {
      drawImage: jest.fn(),
    }
    mockProps = {
      ctx: mockCtx as unknown as CanvasRenderingContext2D,
      settings: {
        playerId: 'test-player',
        themeId: 'theme_1',
        speed: 5,
        timeElapsed: 0,
        canvasWidth: 800,
        canvasHeight: 600,
        bgOfsetY: 120,
      } as GameSettings,
    }
    background = new Backgournd(mockProps)
  })

  it('Инициализирован с правильными свойствами', () => {
    expect(background.ctx).toBe(mockCtx)
    expect(background.themesImages.length).toBe(2)
    expect(background.width).toBe(2400)
    expect(background.speed).toBe(mockProps.settings.speed)
  })

  it('Фон отрисовывается дважды для плавного зацикливания', () => {
    const mockLayer: TypeDataTheme = {
      image: new Image(),
      x: 0,
      speedModifier: 1,
    }
    background.draw(mockLayer)

    expect(mockCtx.drawImage).toHaveBeenCalledTimes(2)
    expect(mockLayer.x).toBeLessThan(0)
  })

  it('Корректное обновление this.speed', () => {
    background.animation(5)
    expect(background.speed).toBe(5)
  })
})
