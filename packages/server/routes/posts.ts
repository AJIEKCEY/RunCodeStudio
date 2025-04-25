import express from 'express'
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from '../controllers/postController'

const postRouter = express.Router()

postRouter.get('/posts', getPosts)
postRouter.get('/posts:id', getPostById)
postRouter.post('/posts', createPost)
postRouter.delete('/posts:id', deletePost)

export default postRouter
