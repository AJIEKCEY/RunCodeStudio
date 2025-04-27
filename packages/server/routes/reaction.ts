import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { createReaction } from '../controllers/reactionController'

const reactionRouter = express.Router()

reactionRouter.post('/reaction', expressAsyncHandler(createReaction))

export default reactionRouter
