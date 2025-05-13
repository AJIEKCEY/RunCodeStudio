import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Posts from './Posts'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  mockComments,
  mockPost,
} from '../../store/features/forum/__mocks__/forumApiSlice'
import { IComment } from '../../store/features/forum/types'

// Мокаем forumSlice
jest.mock('../../store/features/forum/forumSlice')

// Мокаем хуки API
jest.mock('../../store/features/forum/forumApiSlice')

// Мокаем useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}))

// Мокаем компонент CommentsList, так как он может быть сложным для тестирования
jest.mock('./components/CommentsList', () => {
  return {
    __esModule: true,
    default: ({ comments }: { comments: IComment[] | undefined }) => (
      <div data-testid="comments-list">
        {comments?.map((comment: IComment) => (
          <div key={comment.id} data-testid={`comment-${comment.id}`}>
            <div data-testid={`comment-author-${comment.id}`}>
              {comment.user.firstname}
            </div>
            <div data-testid={`comment-text-${comment.id}`}>{comment.text}</div>
            {comment.text
              .match(/(https?:\/\/\S+\.(jpg|jpeg|png|gif))/gi)
              ?.map((url: string, idx: number) => (
                <img
                  key={idx}
                  src={url}
                  alt={`картинка взятая с адреса: ${url}`}
                  data-testid={`comment-image-${comment.id}-${idx}`}
                />
              ))}
          </div>
        ))}
      </div>
    ),
  }
})

// Мокаем данные для API
jest.mock('../../store/features/forum/forumApiSlice', () => ({
  useGetPostQuery: jest.fn(() => ({
    data: {
      id: 1,
      user: { firstname: 'Имя автора с id 2' },
      description: 'Тестовый пост',
      category: { name: 'Категория 1' },
    },
    isLoading: false,
    error: null,
  })),
  useGetCommentsQuery: jest.fn(() => ({
    data: [
      {
        id: 1,
        user: { firstname: 'Автор 1' },
        text: 'Комментарий 1 http://example.com/image.jpg',
      },
      {
        id: 2,
        user: { firstname: 'Автор 2' },
        text: 'Комментарий 2 https://example.com/another-image.png',
      },
    ],
    isLoading: false,
    error: null,
  })),
  useAddCommentMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  reducerPath: 'forumApi',
  reducer: jest.fn(),
}))

// Мокаем компонент CreateCommentModal
jest.mock('./components/CreateCommentModal', () => {
  return {
    __esModule: true,
    default: () => null,
  }
})

// Создаём моковый store для теста
const mockStore = configureStore({
  reducer: {
    forumApi: jest.fn().mockReturnValue({}),
  },
})

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
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/forum/1']}>
          <Routes>
            <Route path="/forum/:id" element={<Posts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  })

  it('должен отрендерить описание поста', () => {
    const description = screen.getByText('Тестовый пост')
    expect(description).toBeInTheDocument()
  })

  it('должен отрендерить имя автора поста', () => {
    const author = screen.getByText('Имя автора с id 2')
    expect(author).toBeInTheDocument()
  })

  it('должен отрендерить категорию поста', () => {
    const category = screen.getByText('Категория 1')
    expect(category).toBeInTheDocument()
  })

  it('должен отобразить список комментариев', () => {
    const commentsList = screen.getByTestId('comments-list')
    expect(commentsList).toBeInTheDocument()
  })

  it('должен отрендерить тексты комментариев', () => {
    const comment1 = screen.getByTestId('comment-text-1')
    expect(comment1).toHaveTextContent('Комментарий 1')
    const comment2 = screen.getByTestId('comment-text-2')
    expect(comment2).toHaveTextContent('Комментарий 2')
  })

  it('должен отрендерить имена авторов комментариев', () => {
    const author1 = screen.getByTestId('comment-author-1')
    expect(author1).toHaveTextContent('Автор 1')
    const author2 = screen.getByTestId('comment-author-2')
    expect(author2).toHaveTextContent('Автор 2')
  })

  it('должен отрендерить изображения из ссылок в комментариях', () => {
    const image1 = screen.getByAltText(
      'картинка взятая с адреса: http://example.com/image.jpg'
    )
    expect(image1).toBeInTheDocument()

    const image2 = screen.getByAltText(
      'картинка взятая с адреса: https://example.com/another-image.png'
    )
    expect(image2).toBeInTheDocument()
  })

  it('должен отрендерить имя автора сообщения', () => {
    const testStr = 'Имя автора с id 2'
    const regex = new RegExp(`.*${testStr}.*`, 'i')
    const result = screen.getAllByText(regex)
    expect(result).toBeTruthy()
    expect(result.length).toEqual(1)
  })
})
