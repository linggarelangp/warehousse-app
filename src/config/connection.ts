import { Sequelize, type Dialect } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const host: string = process.env.DB_HOST as string
const port: number = Number(process.env.DB_PORT)
const user: string = process.env.DB_USER as string
const pass: string = process.env.DB_PASS as string
const db: string = process.env.DB_NAME as string
const dialect: Dialect = process.env.DIALECT as Dialect

const sequelizeConnection: Sequelize = new Sequelize(db, user, pass, {
    host: host,
    port: port,
    dialect: dialect
})

export default sequelizeConnection


