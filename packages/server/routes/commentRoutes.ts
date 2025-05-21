import { Router } from 'express'
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  addReaction,
} from '../controllers/commentController'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

// Получение комментариев к посту
router.get('/posts/:postId/comments', getComments)

// Создание комментария
router.post('/posts/:postId/comments', authMiddleware, createComment)

// Обновление комментария
router.put('/comments/:id', authMiddleware, updateComment)

// Удаление комментария
router.delete('/comments/:id', authMiddleware, deleteComment)

// Добавление/обновление реакции на комментарий
router.post('/comments/:id/reactions', authMiddleware, addReaction)

export default router
