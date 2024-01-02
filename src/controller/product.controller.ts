import { type Request, type Response } from 'express'
import response from '../utils/response'
import Products from '../db/models/Products'
import { Op } from 'sequelize'

export const addProduct = async (req: Request, res: Response): Promise<Response> => {
    const { ...body } = req.body
    try {
        const data: object = {
            productId: body.productId,
            productName: body.productName,
            productStock: body.productStock,
            productUnit: body.productUnit,
            productPrice: body.productPrice
        }

        const product: Products = await Products.create(data)

        return response(201, 'Created', Array(product), res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const productName: string = req.query.productName as string

    try {
        if (productName !== undefined) {
            const product: Products[] = await Products.findAll({ where: { productName: { [Op.like]: `%${productName}%` } } })
            return response(200, 'OK', product, res)
        }

        const product: Products[] = await Products.findAll()

        return response(200, 'OK', product, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    try {
        const product: Products | null = await Products.findOne({ where: { productId: id } })

        if (product === null) return response(404, 'Not Found', null, res)
        return response(200, 'OK', Array(product), res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { ...body } = req.body
    try {
        const product: Products | null = await Products.findOne({ where: { id: id } })

        if (product === null) {
            return response(404, 'Not Found', null, res)
        }

        const data: object = {
            productId: body.productId,
            productName: body.productName,
            productStock: body.productStock,
            productUnit: body.productUnit,
            productPrice: body.productPrice,
        }

        await product.update(data)

        return response(200, 'OK', Array(product), res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    try {
        const product: number = await Products.destroy({ where: { productId: id } })

        if (product === 0) return response(404, 'Not Found', null, res)
        return response(200, 'OK', null, res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}
