import express from 'express'
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from '../controllers/postController'
import expressAsyncHandler from 'express-async-handler'

const postRouter = express.Router()

postRouter.get('/posts', expressAsyncHandler(getPosts))
postRouter.get('/posts/:id', expressAsyncHandler(getPostById))
postRouter.post('/posts', expressAsyncHandler(createPost))
postRouter.delete('/posts/:id', expressAsyncHandler(deletePost))

export default postRouter
