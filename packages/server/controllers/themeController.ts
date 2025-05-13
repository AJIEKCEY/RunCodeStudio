import { RequestHandler } from 'express'
import { User } from '../models/User'
import { Theme } from '../models/Theme'
import { NotFoundError } from '../errors'
import { ErrorTexts } from '../consts'

export const getAllThemes: RequestHandler = async (_req, res) => {
  const themes = await Theme.findAll()
  return res.json(themes)
}

export const getUserTheme: RequestHandler = async (req, res) => {
  // TODO use json schema validation
  const userId = parseInt(req.params.userId, 10)
  const user = await User.findByPk(userId, { include: [Theme] })
  if (!user) {
    throw new NotFoundError(ErrorTexts.USER_NOT_FOUND)
  }
  return res.json(user.theme ?? null)
}

export const setUserTheme: RequestHandler = async (req, res) => {
  // TODO use json schema validation
  const userId = parseInt(req.params.userId, 10)
  const { themeId } = req.body as { themeId: number }
  const theme = await Theme.findByPk(themeId)
  if (!theme) {
    throw new NotFoundError(ErrorTexts.THEME_NOT_FOUND)
  }

  const [updatedRows] = await User.update(
    { themeId },
    { where: { id: userId } }
  )
  if (!updatedRows) {
    throw new NotFoundError(ErrorTexts.USER_NOT_FOUND)
  }

  return res.json(theme)
}
