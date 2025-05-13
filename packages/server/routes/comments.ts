import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getComments } from '../controllers/commentController'

const commentsRouter = express.Router()

commentsRouter.get('/posts/:postId/comments', expressAsyncHandler(getComments))

export default commentsRouter
