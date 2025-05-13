import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { User } from './User'
import { Comment } from './Comment'

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  HEART = 'heart',
  LAUGH = 'laugh',
  ANGRY = 'angry',
}

export class Reaction extends Model {
  public id!: number
  public type!: ReactionType
  public user_id!: number
  public comment_id!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ReactionType)),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'reactions',
    modelName: 'Reaction',
  }
)

Reaction.belongsTo(User, { foreignKey: 'user_id' })
Reaction.belongsTo(Comment, { foreignKey: 'comment_id' })

User.hasMany(Reaction, { foreignKey: 'user_id' })
Comment.hasMany(Reaction, { foreignKey: 'comment_id' })
