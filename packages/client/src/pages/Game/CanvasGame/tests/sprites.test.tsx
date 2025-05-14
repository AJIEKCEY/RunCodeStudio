import {
  createPlayerSprite,
  createSpriteData,
  createThemeData,
  getPlayerSprite,
  getThemeSprite,
} from '../core/sprites'

describe('Sprite Utilities', () => {
  test('createSpriteData создает правильную структуру данных', () => {
    const spriteData = createSpriteData(10, 20, 5)

    expect(spriteData).toEqual({
      frameX: 10,
      frameY: 20,
      frames: 5,
    })
  })

  test('createPlayerSprite создаёт корректную структуру PlayerSpriteData', () => {
    const player = createPlayerSprite('test_player', 6, 7, 8, 9)

    expect(player).toMatchObject({
      frameWidth: 128,
      frameHeight: 128,
      animations: {
        run: { frameX: 0, frameY: 0, frames: 6 },
        jump: { frameX: 0, frameY: 1, frames: 7 },
        attack: { frameX: 0, frameY: 2, frames: 8 },
        dead: { frameX: 0, frameY: 3, frames: 9 },
      },
    })

    expect(player?.image).toBeInstanceOf(Image)
    expect(player?.image.src).toContain('/sprite/players/test_player.png')
  })

  test('createThemeData создаёт массив слоев темы', () => {
    const themeData = createThemeData('desert', 3)

    expect(themeData).toHaveLength(3)

    themeData?.forEach((layer, index) => {
      expect(layer).toMatchObject({
        x: 0,
        speedModifier: (index + 1) * 0.2,
      })
      expect(layer.image).toBeInstanceOf(Image)
      expect(layer.image.src).toContain(`/sprite/themes/desert/layer-${index + 1}.png`)
    })
  })

  test('getPlayerSprite возвращает данные игрока', () => {
    const player = getPlayerSprite('player_1')

    expect(player).toBeDefined()
    expect(player.frameWidth).toBe(128)
    expect(player.animations.run.frames).toBe(8)
  })

  test('getPlayerSprite выбрасывает ошибку при неверном ID', () => {
    expect(() => getPlayerSprite('invalid_player')).toThrow('invalid playerId')
  })

  test('getThemeSprite возвращает данные темы', () => {
    const theme = getThemeSprite('theme_1')

    expect(theme).toBeDefined()
    expect(Array.isArray(theme)).toBe(true)
    expect(theme.length).toBe(5)
  })

  test('getThemeSprite выбрасывает ошибку при неверном ID', () => {
    expect(() => getThemeSprite('invalid_theme')).toThrow('invalid playerId')
  })
})
