export const getPluralWord =
  (single: string, small: string, plural: string) => (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return single
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return small
    } else {
      return plural
    }
  }

export const coinsWords = getPluralWord('монету', 'монеты', 'монет')

export const secondsWords = getPluralWord('секунду', 'секунды', 'секунд')
