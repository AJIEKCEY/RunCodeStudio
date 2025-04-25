import { NextFunction, Request, Response } from 'express'
import { Post } from '../models/Post'

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip = 0, limit = 10 } = req.query
    const posts = await Post.findAll({
      offset: Number(skip),
      limit: Number(limit),
    })

    res.json({
      count: await Post.count(),
      items: posts,
    })
  } catch (error) {
    next(error)
  }
}

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findByPk(req.params.id)
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
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

export { getPosts, getPostById, createPost, deletePost }
