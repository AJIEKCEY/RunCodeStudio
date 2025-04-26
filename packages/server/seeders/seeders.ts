import fs from 'fs/promises'
import { sequelize } from '../db'
import { Model, ModelStatic } from 'sequelize'

export const seeders = async <T extends Model>(
  namePath: string,
  Model: ModelStatic<T>
) => {
  try {
    await sequelize.authenticate()
    await Model.sync({ force: true })
    const raw = await fs.readFile(namePath, 'utf-8')
    const data = JSON.parse(raw)
    await Model.bulkCreate(data)
  } catch (error) {
    console.error(`Не удалось заполнить таблицу ${(error as Error).message}`)
  } finally {
    await sequelize.close()
  }
}
