export type Post = {
  id: number
  authorId: number
  content: string
  createdAt: Date
  editedAt: Date
  threadId: number
  likes: number
  img?: string[]
}

export type Thread = {
  id: number
  title: string
  description: string
  posts: Post[]
  authorId: number
  createdAt: Date
  categoryId: number
}

export type Category = {
  id: number
  title: string
}
export interface ForumState {
  threads: Thread[]
  posts: Post[]
  categories: Category[]
}
