import { NextFunction, Request, Response } from 'express'
import { Category } from '../models/Category'

const getCategories = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findAll()
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}

export { getCategories }
