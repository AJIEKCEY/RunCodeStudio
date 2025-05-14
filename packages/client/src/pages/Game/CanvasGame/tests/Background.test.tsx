import { Background } from '../core/Background'
import { IBackgroundProps } from '../core/types'

describe('Background class', () => {
  let mockCtx: Partial<CanvasRenderingContext2D>
  let background: Background
  let mockProps: IBackgroundProps

  beforeEach(() => {
    mockCtx = {
      drawImage: jest.fn(),
    }
    mockProps = {
      image: new Image(),
      width: 2400,
      height: 600,
      speed: 5,
    }
    background = new Background(mockCtx as CanvasRenderingContext2D, mockProps)
  })

  it('Фон отрисовывается дважды для плавного зацикливания', () => {
    background.draw(mockProps)
    expect(mockCtx.drawImage).toHaveBeenCalledTimes(2)
  })

  it('Корректное обновление позиции', () => {
    background.update()
    background.draw(mockProps)
    expect(mockCtx.drawImage).toHaveBeenCalledWith(
      mockProps.image,
      -mockProps.speed,
      0,
      mockProps.width,
      mockProps.height
    )
  })
})
