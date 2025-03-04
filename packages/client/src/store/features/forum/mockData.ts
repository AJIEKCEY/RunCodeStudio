import { Category, Post, Thread } from './types'
const posts: Post[] = [
  {
    id: 1,
    authorId: 1,
    content: 'Всем привет, как поживаете',
    createdAt: new Date('2025-03-03'),
    likes: 5,
    threadId: 2,
    editedAt: new Date('2025-03-03'),
  },
  {
    id: 4,
    authorId: 2,
    content: 'Пост с картинкой',
    createdAt: new Date('2025-03-03'),
    likes: 5,
    threadId: 1,
    editedAt: new Date('2025-03-03'),
    img: [
      'https://i.pinimg.com/736x/b0/6b/e4/b06be462c439a75e56bcc9dfc35df33a.jpg',
      'https://i.imgur.com/EE6yHRx.jpeg',
    ],
  },
  {
    id: 2,
    authorId: 2,
    content: 'Всем привет, как поживаете',
    createdAt: new Date('2025-03-03'),
    likes: 5,
    threadId: 2,
    editedAt: new Date('2025-03-03'),
  },
  {
    id: 3,
    authorId: 2,
    content: 'Всем привет, как поживаете',
    createdAt: new Date('2025-03-03'),
    likes: 7,
    threadId: 3,
    editedAt: new Date('2025-03-03'),
  },
]
const categories: Category[] = [
  {
    id: 1,
    title: 'Игровой процесс',
  },
  {
    id: 2,
    title: 'Общение',
  },
  {
    id: 3,
    title: 'Поддержка',
  },
  {
    id: 4,
    title: 'События',
  },
]

const threads: Thread[] = [
  {
    authorId: 123,
    createdAt: new Date('2024-12-01'),
    description:
      ' Некорретно отрабатывает контрол при одновременном нажатии вперед и назад. При прохождении участка с большим количеством объектов(внутри пост с картинкой)',
    id: 1,
    posts: filterPost(posts, 1),
    title: 'Проблема с управлением',
    categoryId: 3,
  },
  {
    authorId: 3,
    createdAt: new Date('2025-01-01'),
    description: ' Исчезает звук при переходе на другую вкладку браузера',
    id: 2,
    posts: filterPost(posts, 2),
    title: 'Проблема со звуком',
    categoryId: 3,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 3,
    posts: filterPost(posts, 3),
    title: 'Похожие игры',
    categoryId: 1,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 4,
    posts: filterPost(posts, 4),
    title: 'Похожие игры',
    categoryId: 2,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 6,
    posts: [],
    title: 'Похожие игры',
    categoryId: 2,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 7,
    posts: [],
    title: 'Похожие игры',
    categoryId: 2,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 8,
    posts: [],
    title: 'Похожие игры',
    categoryId: 2,
  },
  {
    authorId: 2,
    createdAt: new Date('2025-02-03'),
    description: 'Посоветуйте похожие по механике игры',
    id: 9,
    posts: [],
    title: 'Похожие игры',
    categoryId: 2,
  },
]

function filterPost(posts: Post[], threadId: number): Post[] {
  return posts.filter(post => post.threadId === threadId)
}
export { categories, threads, posts }
