import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'posts',
  timestamps: true,
})
export default class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number
}
