export const getPluralForm = (count: number, forms: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  return forms[index]
}

export const getTimeWord = (count: number): string => {
  return getPluralForm(count, ['минута', 'минуты', 'минут'])
}

export const getScoreWord = (count: number): string => {
  return getPluralForm(count, ['очко', 'очка', 'очков'])
}
