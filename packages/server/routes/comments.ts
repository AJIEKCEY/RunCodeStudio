import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getComments, createComment, updateComment, deleteComment } from '../controllers/commentController'
import { authMiddleware } from '../middlewares/auth'

const commentsRouter = express.Router()

// Маршрут для получения комментариев к посту
commentsRouter.get('/posts/:postId/comments', expressAsyncHandler(getComments))

// Маршрут для создания комментария (требует авторизации)
commentsRouter.post('/comments', authMiddleware, expressAsyncHandler(createComment))

// Маршрут для обновления комментария (требует авторизации)
commentsRouter.put('/comments/:id', authMiddleware, expressAsyncHandler(updateComment))

// Маршрут для удаления комментария (требует авторизации)
commentsRouter.delete('/comments/:id', authMiddleware, expressAsyncHandler(deleteComment))

export default commentsRouter
