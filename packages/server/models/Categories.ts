import {
  Model,
  Column,
  Table,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript'
import { Post } from './Post'

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model<Category> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @Column(DataType.STRING)
  declare name: string

  @HasMany(() => Post, {
    foreignKey: 'category_id',
  })
  declare posts: Post[]
}
