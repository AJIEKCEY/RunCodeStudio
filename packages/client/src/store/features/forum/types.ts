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
  user_id: number
  description?: string
  id: number
  title: string
  category_id: number
  createdAt?: Date
  updatedAt?: Date
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
