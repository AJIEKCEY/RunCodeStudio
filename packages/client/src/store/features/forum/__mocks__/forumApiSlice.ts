import { createApi } from '@reduxjs/toolkit/query/react'

// Мок-данные для поста
export const mockPost = {
  id: 1,
  title: 'Тестовый пост',
  description: 'Описание тестового поста',
  createdAt: '2023-10-01',
  category_id: 1,
  user_id: 1,
  comments_count: 2,
  // Поля которые используются компонентом
  user: {
    firstname: 'Тестовый автор',
    lastname: 'Фамилия'
  },
  category: {
    name: 'Тестовая категория'
  }
}

// Мок-данные для комментариев
export const mockComments = [
  {
    id: 1,
    text: 'Первый комментарий http://example.com/image.jpg',
    createdAt: '2023-10-01',
    user_id: 2,
    post_id: 1,
    root_comment: null,
    replies: [],
    user: {
      firstname: 'Автор комментария 1'
    }
  },
  {
    id: 2,
    text: 'Второй комментарий https://example.com/another-image.png',
    createdAt: '2023-10-02',
    user_id: 3,
    post_id: 1,
    root_comment: null,
    replies: [],
    user: {
      firstname: 'Автор комментария 2'
    }
  }
]

// Создаем мок API с тем же reducerPath, что и в оригинальном файле
export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: jest.fn(),
  endpoints: () => ({})
})

// Мок-хуки для использования в тестах
export const useGetPostQuery = jest.fn(() => ({
  data: mockPost,
  isLoading: false,
  isError: false,
  isSuccess: true
}))

export const useGetCommentsQuery = jest.fn(() => ({
  data: mockComments,
  isLoading: false,
  isError: false,
  isSuccess: true
}))

export const useAddCommentMutation = jest.fn(() => [
  jest.fn(),
  { isLoading: false, isSuccess: false, isError: false }
])

export const useGetThreadsQuery = jest.fn()
export const useGetCategoriesQuery = jest.fn()
export const useAddThreadMutation = jest.fn() 