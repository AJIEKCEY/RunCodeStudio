import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import LeaderBoard from './LeaderBoard'

// Мокаем Request
global.Request = jest.fn().mockImplementation((input, init) => ({
  ...input,
  ...init,
})) as any

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}))

describe('LeaderBoard компонент', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/leader-board']}>
            <Routes>
              <Route path="/leader-board" element={<LeaderBoard />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      )
    })
  })

  it('должен отрендерить заголовок и таблицу с результатами', () => {
    expect(screen.getByTestId('leaderbord-title')).toBeInTheDocument()
    expect(screen.getByTestId('leaderbord-table')).toBeInTheDocument()
  })
})
