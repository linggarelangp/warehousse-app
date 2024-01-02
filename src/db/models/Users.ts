import connection from '../../config/connection'
import { DataTypes, Model, type Optional } from 'sequelize'
import Roles from './Roles'


interface IUserAttributes {
  id?: number,
  userId?: string,
  roleId?: number,
  firstname?: string,
  lastname?: string,
  fullname?: string,
  username?: string,
  password?: string,
  active?: boolean,
  refreshToken?: string | null
  createdAt?: Date,
  updatedAt?: Date
}

export interface IUserInput extends Optional<IUserAttributes, 'id'> { }
export interface IUserOutput extends Required<IUserAttributes> { }

class Users extends Model<IUserAttributes, IUserInput> implements IUserAttributes {
  public id!: number
  public userId!: string
  public roleId!: number
  public firstname!: string
  public lastname!: string
  public fullname!: string
  public username!: string
  public password!: string
  public active!: boolean
  public refreshToken!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  roleId: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  firstname: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  fullname: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  refreshToken: {
    allowNull: true,
    type: DataTypes.TEXT
  },

}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

Users.belongsTo(Roles, { foreignKey: 'roleId', targetKey: 'roleId' })

export default Users