import fs from 'fs/promises'
import { sequelize } from '../db'
import { Model, ModelStatic } from 'sequelize'

export const seeders = async <T extends Model>(
  namePath: string,
  Model: ModelStatic<T>
) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    const filePath = namePath
    const raw = await fs.readFile(filePath, 'utf-8')
    const usersData = JSON.parse(raw)
    await Model.bulkCreate(usersData)
  } catch (error) {
    console.error(`Не удалось заполнить таблицу ${(error as Error).message}`)
  } finally {
    sequelize.close()
  }
}
