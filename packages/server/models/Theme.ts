import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  Model,
} from 'sequelize-typescript'
import { User } from './User'

interface ThemeSettings {
  background: string
  buttonColor: string
  textColor: string
}

@Table({
  tableName: 'themes',
  timestamps: true,
})
export class Theme extends Model<Theme> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {},
  })
  declare settings: ThemeSettings

  @HasMany(() => User)
  declare users: User[]
}
