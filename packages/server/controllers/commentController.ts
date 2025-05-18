import { Request, Response } from 'express'
import { Comment } from '../models/Comment'
import { User } from '../models/User'
import { Reaction } from '../models/Reaction'
import {
  getCommentsSchema,
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  schemaValidator,
} from '../schemas'

const getComments = async (req: Request, res: Response): Promise<void> => {
  const query = { postId: Number(req.params.postId) }

  schemaValidator.validate(getCommentsSchema, query)

  const comments = await Comment.findAll({
    where: {
      post_id: query.postId,
      root_comment: null,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstname'],
      },
      {
        model: Reaction,
        as: 'reactions',
        include: [
          {
            model: User,
            attributes: ['id', 'firstname'],
          },
        ],
      },
      {
        model: Comment,
        as: 'replies',
        include: [
          {
            model: User,
            attributes: ['id', 'firstname'],
          },
          {
            model: Reaction,
            as: 'reactions',
            include: [
              {
                model: User,
                attributes: ['id', 'firstname'],
              },
            ],
          },
          {
            model: Comment,
            as: 'replies',
            include: [
              {
                model: User,
                attributes: ['id', 'firstname'],
              },
              {
                model: Reaction,
                as: 'reactions',
                include: [
                  {
                    model: User,
                    attributes: ['id', 'firstname'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })

  res.status(200).json(comments)
}

const createComment = async (req: Request, res: Response): Promise<void> => {
  const { text, rootCommentId } = req.body
  const postId = Number(req.params.postId)
  const userId = req.user?.id

  if (!userId) {
    res.status(401).json({ message: 'Необходима авторизация' })
    return
  }

  schemaValidator.validate(createCommentSchema, { text, postId, rootCommentId })

  const newComment = await Comment.create({
    text,
    post_id: postId,
    user_id: userId,
    root_comment: rootCommentId || null,
  })

  const comment = await Comment.findByPk(newComment.id, {
    include: [
      {
        model: User,
        attributes: ['id', 'firstname'],
      },
      {
        model: Reaction,
        as: 'reactions',
        include: [
          {
            model: User,
            attributes: ['id', 'firstname'],
          },
        ],
      },
    ],
  })

  res.status(201).json(comment)
}

const updateComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { text } = req.body
  const userId = req.user?.id

  if (!userId) {
    res.status(401).json({ message: 'Необходима авторизация' })
    return
  }

  schemaValidator.validate(updateCommentSchema, { id: Number(id), text })

  const comment = await Comment.findByPk(id)

  if (!comment) {
    res.status(404).json({ message: 'Комментарий не найден' })
    return
  }

  if (comment.user_id !== userId) {
    res
      .status(403)
      .json({ message: 'У вас нет прав для редактирования этого комментария' })
    return
  }

  await comment.update({ text })

  res.status(200).json(comment)
}

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) {
    res.status(401).json({ message: 'Необходима авторизация' })
    return
  }

  schemaValidator.validate(deleteCommentSchema, { id: Number(id) })

  const comment = await Comment.findByPk(id)

  if (!comment) {
    res.status(404).json({ message: 'Комментарий не найден' })
    return
  }

  if (comment.user_id !== userId) {
    res
      .status(403)
      .json({ message: 'У вас нет прав для удаления этого комментария' })
    return
  }

  await comment.destroy()

  res.status(204).send()
}

const addReaction = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { type } = req.body
  const userId = req.user?.id

  if (!userId) {
    res.status(401).json({ message: 'Необходима авторизация' })
    return
  }

  const comment = await Comment.findByPk(id)

  if (!comment) {
    res.status(404).json({ message: 'Комментарий не найден' })
    return
  }

  // Проверяем, есть ли уже реакция от этого пользователя
  const existingReaction = await Reaction.findOne({
    where: {
      comment_id: id,
      user_id: userId,
    },
  })

  if (existingReaction) {
    // Если реакция того же типа, удаляем её
    if (existingReaction.type === type) {
      await existingReaction.destroy()
    } else {
      // Если реакция другого типа, обновляем её
      await existingReaction.update({ type })
    }
  } else {
    // Создаем новую реакцию
    await Reaction.create({
      comment_id: id,
      user_id: userId,
      type,
    })
  }

  // Получаем обновленный комментарий со всеми реакциями
  const updatedComment = await Comment.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['id', 'firstname'],
      },
      {
        model: Reaction,
        as: 'reactions',
        include: [
          {
            model: User,
            attributes: ['id', 'firstname'],
          },
        ],
      },
    ],
  })

  res.status(200).json(updatedComment)
}

export { getComments, createComment, updateComment, deleteComment, addReaction }
