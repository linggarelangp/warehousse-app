import connection from '../../config/connection'
import { DataTypes, Model, type Optional } from 'sequelize'

interface IProductAttributes {
    id?: number
    productId?: string
    productName?: string
    productStock?: number
    productUnit?: string
    productPrice?: number
    createdAt?: Date
    updatedA?: Date
}

export interface IProductInput extends Optional<IProductAttributes, 'id'> { }
export interface IProductOutput extends Required<IProductAttributes> { }

class Products extends Model<IProductAttributes, IProductInput> implements IProductAttributes {
    public id!: number
    public productId!: string
    public productName!: string
    public productStock!: number
    public productUnit!: string
    public productPrice!: number
    public readonly createdAt?: Date
    public readonly updatedAt?: Date
}

Products.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    productId: {
        allowNull: false,
        type: DataTypes.STRING(6)
    },
    productName: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    productStock: {
        allowNull: false,
        type: DataTypes.BIGINT
    },
    productUnit: {
        allowNull: false,
        type: DataTypes.STRING(10)
    },
    productPrice: {
        allowNull: false,
        type: DataTypes.BIGINT
    }
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
})

export default Products