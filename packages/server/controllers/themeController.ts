import { RequestHandler } from 'express'
import { User } from '../models/User'
import { Theme } from '../models/Theme'

export const getAllThemes: RequestHandler = async (_req, res) => {
  const themes = await Theme.findAll()
  return res.json(themes)
}

export const getUserTheme: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  const user = await User.findByPk(userId, { include: [Theme] })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  return res.json(user.theme ?? null)
}

export const setUserTheme: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  const { themeId } = req.body as { themeId: number }
  const theme = await Theme.findByPk(themeId)
  if (!theme) {
    return res.status(404).json({ error: 'Тема не найдена' })
  }

  const [updatedRows] = await User.update(
    { themeId },
    { where: { id: userId } }
  )
  if (!updatedRows) {
    return res.status(404).json({ error: 'Юзер не найден' })
  }

  return res.json(theme)
}
