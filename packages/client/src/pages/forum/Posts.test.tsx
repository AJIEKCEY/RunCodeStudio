import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Posts from './Posts'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { mockComments, mockPost } from '../../store/features/forum/__mocks__/forumApiSlice'
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
            <div data-testid={`comment-author-${comment.id}`}>{comment.user.firstname}</div>
            <div data-testid={`comment-text-${comment.id}`}>{comment.text}</div>
            {comment.text.match(/(https?:\/\/\S+\.(jpg|jpeg|png|gif))/gi)?.map((url: string, idx: number) => (
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
    )
  }
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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/forum/1']}>
          <Routes>
            <Route path="/forum/:id" element={<Posts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  })
  
  it('должен отрендерить описание поста', () => {
    const description = screen.getByText(mockPost.description)
    expect(description).toBeInTheDocument()
  })

  it('должен отрендерить имя автора поста', () => {
    const author = screen.getByText(mockPost.user.firstname)
    expect(author).toBeInTheDocument()
  })
  
  it('должен отрендерить категорию поста', () => {
    const category = screen.getByText(mockPost.category.name)
    expect(category).toBeInTheDocument()
  })

  it('должен отобразить список комментариев', () => {
    const commentsList = screen.getByTestId('comments-list')
    expect(commentsList).toBeInTheDocument()
  })

  it('должен отрендерить тексты комментариев', () => {
    mockComments.forEach(comment => {
      const commentText = screen.getByTestId(`comment-text-${comment.id}`)
      expect(commentText).toHaveTextContent(comment.text)
    })
  })

  it('должен отрендерить имена авторов комментариев', () => {
    mockComments.forEach(comment => {
      const authorName = screen.getByTestId(`comment-author-${comment.id}`)
      expect(authorName).toHaveTextContent(comment.user.firstname)
    })
  })

  it('должен отрендерить изображения из ссылок в комментариях', () => {
    // Изображение из первого комментария
    const imageUrl1 = 'http://example.com/image.jpg'
    const image1 = screen.getByAltText(`картинка взятая с адреса: ${imageUrl1}`)
    expect(image1).toBeInTheDocument()
    
    // Изображение из второго комментария
    const imageUrl2 = 'https://example.com/another-image.png'
    const image2 = screen.getByAltText(`картинка взятая с адреса: ${imageUrl2}`)
    expect(image2).toBeInTheDocument()
  })
})
