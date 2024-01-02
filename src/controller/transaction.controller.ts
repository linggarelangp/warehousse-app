import { type Request, type Response } from "express";
import Transactions from "../db/models/Transactions";
import response from "../utils/response";
import Users from "../db/models/Users";
import Products from "../db/models/Products";
import { Model, Op } from "sequelize";
import Roles from "../db/models/Roles";

export const addTransaction = async (req: Request, res: Response): Promise<Response> => {
    const { ...body } = req.body

    try {
        const user: Users | null = await Users.findOne({
            attributes: ['userId', 'fullname'],
            where: { userId: body.userId as string }
        })

        if (user === null) {
            return response(404, 'Not Found', null, res)
        }

        const product: Products | null = await Products.findOne({
            attributes: ['productId', 'productName', 'productUnit'],
            where: { productId: body.productId as string }
        })

        if (product === null) {
            return response(404, 'Not Found', null, res)
        }

        const data: object = {
            userId: user.userId,
            username: user.fullname,
            productId: product.productId,
            productName: product.productName,
            price: body.price,
            amount: body.amount,
            unit: product.productUnit,
            totalPrice: body.totalPrice,
            status: 'Success'
        }

        const transaction: Transactions = await Transactions.create(data)

        return response(201, 'Created', Array(transaction), res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getTransactions = async (req: Request, res: Response): Promise<Response> => {
    try {
        const transaction = await Transactions.findAll({
            attributes: ['id', 'userId', 'productId', 'price', 'amount', 'totalPrice', 'status', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Users,
                    attributes: ['fullname', 'username', 'active'],
                    required: true
                },
                {
                    model: Products,
                    attributes: ['productName', 'productPrice'],
                    required: true
                }
            ]
        });

        return response(200, 'OK', transaction, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getTransaction = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    try {
        const transaction = await Transactions.findAll({
            where: {
                userId: id as string
            }
        });

        return response(200, 'OK', transaction, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getTransactionById = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.transactionId as string
    const userId: string = req.params.userId as string

    try {
        const transaction = await Transactions.findAll({
            where: {
                id: id as string,
                userId: userId as string
            }
        });

        return response(200, 'OK', transaction, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getTransactionByAnyting = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const productName: string = req.query.productName as string
    try {
        if (productName !== undefined) {
            const transaction = await Transactions.findAll({
                where: {
                    userId: userId as string,
                    productName: { [Op.like]: `%${productName}%` }

                }
            });
            return response(200, 'OK', transaction, res)
        }

        const transaction = await Transactions.findAll({
            where: {
                userId: userId as string,
            }
        });

        return response(200, 'OK', transaction, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}