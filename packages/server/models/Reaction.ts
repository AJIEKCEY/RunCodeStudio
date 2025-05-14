import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { User } from './User'
import { Comment } from './Comment'

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  HEART = 'heart',
  LAUGH = 'laugh',
  ANGRY = 'angry',
}

@Table({
  tableName: 'reactions',
  timestamps: true,
})
export class Reaction extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number

  @Column({
    type: DataType.ENUM(...Object.values(ReactionType)),
    allowNull: false,
  })
  type!: ReactionType

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number

  @BelongsTo(() => User, 'user_id')
  user!: User

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  comment_id!: number

  @BelongsTo(() => Comment, 'comment_id')
  comment!: Comment
}
