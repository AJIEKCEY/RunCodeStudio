interface Character {
  id: string
  name: string
  description: string
}

const characters: Character[] = [
  {
    id: 'ninja',
    name: 'Ниндзя',
    description: 'Быстрый и ловкий боец, легко перепрыгивает препятствия.',
  },
  {
    id: 'robot',
    name: 'Робот',
    description: 'Тяжёлый, но устойчивый к ударам и способен пробивать стены.',
  },
  {
    id: 'alien',
    name: 'Пришелец',
    description:
      'Может парить над землёй и использовать необычные способности.',
  },
]

export default characters
