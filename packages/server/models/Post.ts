import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from './User'
import { Category } from './Categories'

interface PostAttributes {
  title: string
  description?: string // Опциональное поле
  user_id: number
  category_id: number
}

@Table({
  tableName: 'posts',
  timestamps: true,
})
export class Post extends Model<Post, PostAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare title: string

  @Column(DataType.TEXT)
  declare description: string

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'category_id',
    allowNull: false,
  })
  declare category_id: number

  @BelongsTo(() => Category)
  declare category: Category

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  declare user_id: number

  @BelongsTo(() => User)
  declare user: User
}
