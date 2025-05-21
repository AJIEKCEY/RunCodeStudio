import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from './User'
import { Post } from './Post'
import { Reaction } from './Reaction'

interface CommentAttributes {
  text: string
  root_comment?: number | null
  post_id: number
  user_id: number
}

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model<Comment, CommentAttributes> {
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
  declare text: string

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'root_comment',
    allowNull: true,
  })
  declare root_comment: number | null

  @BelongsTo(() => Comment, {
    foreignKey: 'root_comment',
    as: 'parentComment',
  })
  declare parentComment: Comment

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
    allowNull: false,
  })
  declare post_id: number

  @BelongsTo(() => Post)
  declare post: Post

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  declare user_id: number

  @BelongsTo(() => User)
  declare user: User

  @HasMany(() => Comment, {
    foreignKey: 'root_comment',
    as: 'replies', // Это ключ, под которым будут вложенные ответы
  })
  declare replies: Comment[]

  @HasMany(() => Reaction, {
    foreignKey: 'comment_id',
    as: 'reactions', // Это ключ, под которым будут реакции
  })
  declare reactions: Reaction[]
}
