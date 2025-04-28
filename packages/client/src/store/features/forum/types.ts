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

export type CommentType = {
  id: number
  text: string
  post_id: number
  user_id: number
  root_comment: number
  user: {
    firstname: string
  }
  createdAt: Date
  updatedAt: Date
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
  title: string
}

export interface ForumState {
  threads: Thread[]
  posts: Post[]
  categories: Category[]
  loading: boolean
  error: null | Error
}
