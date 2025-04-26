import { Router } from 'express'
import {
  getAllThemes,
  getUserTheme,
  setUserTheme,
} from '../controllers/themeController'

const router = Router()

router.get('/themes', getAllThemes)

router.get('/users/:userId/theme', getUserTheme)

router.post('/users/:userId/theme', setUserTheme)

export default router
