import connection from '../../config/connection'
import { DataTypes, Model, type Optional } from 'sequelize'

interface IRoleAttributes {
  id?: number,
  roleId?: number,
  rolename?: string,
  createdAt?: Date
  updatedAt?: Date
}

export interface IRoleInput extends Optional<IRoleAttributes, 'id'> { }
export interface IRoleOutput extends Required<IRoleAttributes> { }

class Roles extends Model<IRoleAttributes, IRoleInput> implements IRoleAttributes {
  public id!: number
  public roleId!: number
  public rolename!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Roles.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  roleId: {
    allowNull: false,
    unique: true,
    type: DataTypes.BIGINT
  },
  rolename: {
    allowNull: false,
    type: DataTypes.STRING(20)
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

export default Roles