import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Posts from './Posts'
import { Provider } from 'react-redux'
import { store } from '../../store/store'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}))

describe('Posts компонент', () => {
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
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/forum/1']}>
          <Routes>
            <Route path="/forum/:id" element={<Posts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  })
  it('должен отрендерить дату создания поста из тестовых данных', () => {
    const testStr = '03.03.2025'
    const regex = new RegExp(`.*${testStr}.*`, 'i')
    expect(screen.getAllByText(regex)).toBeTruthy()
  })

  it('должен отрендерить изображения из тестовых данных', () => {
    const images = [
      'https://i.pinimg.com/736x/b0/6b/e4/b06be462c439a75e56bcc9dfc35df33a.jpg',
      'https://i.imgur.com/EE6yHRx.jpeg',
    ]
    images.forEach(url => {
      expect(
        screen.getByAltText(`картинка взятая с адреса: ${url}`)
      ).toBeTruthy()
    })
  })
})
