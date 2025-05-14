// import App from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Вот тут будет жить ваше приложение :)'

// @ts-expect-error - Мокаем глобальный fetch для тестов
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }))

test('Example test', async () => {
  // render(<App />)
  expect(true).toEqual(true)
})
