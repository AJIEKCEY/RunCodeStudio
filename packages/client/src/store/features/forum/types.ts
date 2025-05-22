export type Post = {
  category: { name: string }
  user: {
    firstname: string
  }
} & Thread

export type ThreadResponce = {
  count: number
  items: Thread[]
}

export interface IReaction {
  id: number
  type: 'like' | 'dislike' | 'heart' | 'laugh' | 'angry'
  user_id: number
  comment_id: number
  createdAt: string
  updatedAt: string
  user: {
    firstname: string
  }
}

export interface IComment {
  id: number
  text: string
  root_comment: number | null
  post_id: number
  user_id: number
  createdAt: string
  updatedAt: string
  user: {
    firstname: string
  }
  reactions: IReaction[]
  replies: IComment[]
}

export type Thread = {
  user_id: number
  description?: string
  id: number
  title: string
  category_id: number
  category: {
    name: string
  }
  count_comments: number
  createdAt?: Date
  updatedAt?: Date
}

export type Category = {
  id: number
  name: string
}

export interface ForumState {
  threads: Thread[]
  posts: Post[]
  categories: Category[]
  loading: boolean
  error: null | Error
}
