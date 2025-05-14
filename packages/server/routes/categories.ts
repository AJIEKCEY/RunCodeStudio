import express from 'express'
import { getCategories } from '../controllers/categoriesController'

const categoryRouter = express.Router()

categoryRouter.get('/categories', getCategories)

export default categoryRouter
