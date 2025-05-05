import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Post } from './Post'
import { Comment } from './Comment'
import { Theme } from './Theme'
import { Reaction } from './Reaction'

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare firstname: string

  @Column(DataType.STRING(50))
  declare lastname: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Уникальный email, то есть не повторяется в дургих записях таблицы
    validate: { isEmail: true }, // Вроде postgres сам проверит соответствует ли запись емайлу или нет
  })
  declare email: string

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  declare login: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string

  @HasMany(() => Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  })
  declare posts: Post[]

  @HasMany(() => Comment, {
    foreignKey: 'user_id',
  })
  declare comments: Comment[]

  @HasMany(() => Reaction, {
    foreignKey: 'user_id',
  })
  declare reactions: Reaction[]

  @ForeignKey(() => Theme)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare themeId: number | null

  @BelongsTo(() => Theme)
  declare theme: Theme
}
