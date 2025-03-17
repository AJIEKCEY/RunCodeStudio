interface Character {
  id: string
  name: string
  description: string
}

const characters: Character[] = [
  {
    id: 'player_1',
    name: 'Пришелец',
    description:
      'Может парить над землёй и использовать необычные способности.',
  },
  {
    id: 'player_2',
    name: 'Ниндзя',
    description: 'Быстрый и ловкий боец, легко перепрыгивает препятствия.',
  },
  // TODO: добавить персонажа для player_3
  {
    id: 'player_3',
    name: 'Робот',
    description: 'Тяжёлый, но устойчивый к ударам и способен пробивать стены.',
  },
]

export default characters
