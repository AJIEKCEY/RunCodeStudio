import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Threads from './Threads'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import userEvent from '@testing-library/user-event'

describe('Тест компонента Threads', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
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
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/forum']}>
          <Routes>
            <Route path="/forum" element={<Threads />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  })

  it('по нажатию кнопки появляется диалоговое окно с формой', async () => {
    const btn = screen.getByTestId('create-thread-btn')
    expect(btn).toBeTruthy()
    await userEvent.click(btn)
    expect(screen.getByTestId('create-thread-form')).toBeTruthy()
  })
})
