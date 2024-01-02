import connection from '../../config/connection'
import { DataTypes, Model, type Optional } from 'sequelize'
import Products from './Products'
import Users from './Users'

interface ITransactionAttributes {
  id?: number,
  userId?: string,
  username?: string,
  productId?: string,
  productName?: string,
  price?: number,
  amount?: number,
  unit?: string,
  totalPrice?: number,
  status?: string,
  createdAt?: Date,
  updateddAt?: Date
}

export interface ITransactionInput extends Optional<ITransactionAttributes, 'id'> { }
export interface ITransactionOutput extends Required<ITransactionAttributes> { }

class Transactions extends Model<ITransactionAttributes, ITransactionInput> implements ITransactionAttributes {
  public id!: number
  public userId!: string
  public username?: string
  public productId!: string
  public productName?: string
  public price!: number
  public amount!: number
  public unit!: string
  public totalPrice!: number
  public status!: string
  public readonly createdAt!: Date
  public readonly updateddAt!: Date
}

Transactions.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  productId: {
    allowNull: false,
    type: DataTypes.STRING(6)
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  price: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  amount: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  unit: {
    allowNull: false,
    type: DataTypes.STRING(10)
  },
  totalPrice: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING(10)
  }
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false
})

Transactions.belongsTo(Products, { foreignKey: 'productId', targetKey: 'productId' })
Transactions.belongsTo(Users, { foreignKey: 'userId', targetKey: 'userId' })
Products.hasMany(Transactions, { foreignKey: 'productId' })
Users.hasMany(Transactions, { foreignKey: 'userId' })

Transactions.addHook('afterCreate', async (transaction, Option) => {
  try {
    const product: Products | null = await Products.findOne({ where: { productId: transaction.dataValues.productId } })

    if (transaction.dataValues.amount === undefined || transaction.dataValues.amount === null) {
      transaction.dataValues.amount = 1
    }

    if (product !== null) {
      await product.update({ productStock: product.productStock - transaction.dataValues.amount })
    }

  } catch (error: any) {
    console.error(`Error Data: ${error}`)
  }
})

export default Transactions