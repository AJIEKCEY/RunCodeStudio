import { NextFunction, Request, Response } from 'express'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { Category } from '../models/Category'
import { Comment } from '../models/Comment'

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip = 0, limit = 10 } = req.query
    const max_limit = 50

    const posts = await Post.findAll({
      offset: Number(skip),
      limit: Math.min(Number(limit), max_limit),
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    })

    const postsWithComments = await Promise.all(
      posts.map(async post => {
        const count = await Comment.count({
          where: { post_id: post.id },
        })

        return {
          ...post.get({ plain: true }),
          count_comments: count,
        }
      })
    )

    res.json({
      count: await Post.count(),
      items: postsWithComments,
    })
  } catch (error) {
    next(error)
  }
}

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['firstname'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    })
    res.json({
      item: post,
    })
  } catch (error) {
    next(error)
  }
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, user_id, category_id } = req.body

    if (!title || !user_id || !category_id) {
      res.status(400).json({ error: 'Необходимы title, user_id и category_id' })
      return
    }

    const post = await Post.create({
      title,
      description,
      user_id,
      category_id,
    })

    res.json({
      item: post,
    })
  } catch (error) {
    next(error)
  }
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id },
    })

    if (!deleted) {
      res.status(404).json({ error: 'Пост не найден' })
      return
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export { getPosts, getPostById, createPost, deletePost }
