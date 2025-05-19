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
    background = new Background(mockCtx as CanvasRenderingContext2D, mockProps, 0)
  })

  it('Фон отрисовывается дважды для плавного зацикливания', () => {
    background.draw()
    expect(mockCtx.drawImage).toHaveBeenCalledTimes(2)
  })

  it('Корректное обновление позиции', () => {
    background.update()
    background.draw()
    expect(mockCtx.drawImage).toHaveBeenCalledWith(
      mockProps.image,
      -mockProps.speed,
      0,
      mockProps.width,
      mockProps.height
    )
  })

  it('Скорость корректно рассчитывается в зависимости от layerId', () => {
    const baseSpeed = 10
    const layer0 = new Background(mockCtx as CanvasRenderingContext2D, mockProps, 0)
    const layer1 = new Background(mockCtx as CanvasRenderingContext2D, mockProps, 1)
    const layer2 = new Background(mockCtx as CanvasRenderingContext2D, mockProps, 2)

    layer0.animation(baseSpeed)
    layer1.animation(baseSpeed)
    layer2.animation(baseSpeed)

    expect(layer0['speed']).toBe(baseSpeed * 0.2) // layerId + 1 = 1, поэтому 0.2
    expect(layer1['speed']).toBe(baseSpeed * 0.4) // layerId + 1 = 2, поэтому 0.4
    expect(layer2['speed']).toBe(baseSpeed * 0.6) // layerId + 1 = 3, поэтому 0.6
  })
})
