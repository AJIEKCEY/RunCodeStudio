import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript'
import { Theme } from './Theme'

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
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

  @ForeignKey(() => Theme)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare themeId: number | null

  @BelongsTo(() => Theme)
  declare theme: Theme
}
