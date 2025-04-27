import { Router } from 'express'
import {
  getAllThemes,
  getUserTheme,
  setUserTheme,
} from '../controllers/themeController'
import expressAsyncHandler from 'express-async-handler'

const router = Router()

router.get('/themes', expressAsyncHandler(getAllThemes))
router.get('/users/:userId/theme', expressAsyncHandler(getUserTheme))
router.post('/users/:userId/theme', expressAsyncHandler(setUserTheme))

export default router
