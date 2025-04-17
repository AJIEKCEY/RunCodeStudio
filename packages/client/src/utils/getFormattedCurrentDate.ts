export function formatDate(date: Date): string {
  const userLocale = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(userLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(date)
}
