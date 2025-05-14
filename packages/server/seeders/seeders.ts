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

    // Сбрасываем последовательность для автоинкремента после импорта данных
    const tableName = Model.getTableName()
    if (typeof tableName === 'string') {
      try {
        await sequelize.query(
          `SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), (SELECT MAX(id) FROM "${tableName}"));`
        )
        console.info(`✓ Sequence reset for table: ${tableName}`)
      } catch (seqError) {
        console.error(`Error resetting sequence for ${tableName}:`, seqError)
      }
    }
  } catch (error) {
    console.error(`Не удалось заполнить таблицу ${(error as Error).message}`)
  } finally {
    await sequelize.close()
  }
}
