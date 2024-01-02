import { type Request, type Response, type NextFunction } from 'express'
import Validator, { type Rules } from 'validatorjs'
import response from '../utils/response'
import Roles from '../db/models/Roles'
import Users from '../db/models/Users'
import Products from '../db/models/Products'

export const roleValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { ...body } = req.body

    const data: object = {
        roleId: body.roleId,
        rolename: body.rolename
    }

    const rules: Rules = {
        roleId: 'required|integer',
        rolename: 'required|string|max:20'
    }

    const validate: Validator.Validator<object> = new Validator(data, rules)

    if (validate.fails() ?? false) return response(400, 'Bad Request', validate.errors, res)

    try {
        const existingRoles: Roles | null = await Roles.findOne({
            where: {
                roleId: body.roleId,
                rolename: body.rolename
            }
        })

        if (existingRoles !== null) {
            const errorsMessage = {
                errors: {
                    data: ['Data Already Exists']
                }
            }

            return response(400, 'Bad Request', errorsMessage, res)
        }

        next()

    } catch (error: any) {
        return response(500, 'Internal Server Error', null, res)
    }
}

export const addUserValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { ...body } = req.body

    const data: object = {
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        password: body.password,
        confirmPassword: body.confirmPassword
    }

    const rules: Rules = {
        firstname: 'required|string|max:30',
        lastname: 'required|string|max:30',
        username: 'required|string|max:30',
        password: 'required|string|min:8',
        confirmPassword: 'required|same:password'
    }

    const validate: Validator.Validator<object> = new Validator(data, rules)

    if (validate.fails() ?? false) return response(400, 'Bad Request', validate.errors, res)

    try {
        const existingUsers: Users | null = await Users.findOne({
            where: { username: body.username }
        })

        if (existingUsers !== null) {
            const errorsMessage = {
                errors: {
                    username: ['Username Already Exists']
                }
            }

            return response(400, 'Bad Request', errorsMessage, res)
        }

        next()

    } catch (error: any) {
        return response(500, 'Internal Server Error', null, res)
    }
}

export const productValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { ...body } = req.body

    const data: object = {
        productId: body.productId,
        productName: body.productName,
        productStock: body.productStock,
        productUnit: body.productUnit,
        productPrice: body.productPrice,
    }

    const rules: Rules = {
        productId: 'required|string|max:6',
        productName: 'required|string|max:30',
        productStock: 'required|integer',
        productUnit: 'required|string|max:10',
        productPrice: 'required|integer',
    }

    const validate: Validator.Validator<object> = new Validator(data, rules)

    if (validate.fails() ?? false) return response(400, 'Bad Request', validate.errors, res)

    try {
        const existingProduct: Products | null = await Products.findOne({
            where: { productId: body.productId }
        })

        if (existingProduct !== null) {
            const errorsMessage = {
                errors: {
                    username: ['Product Already Exists']
                }
            }

            return response(400, 'Bad Request', errorsMessage, res)
        }

        next()
    } catch (error: any) {
        return response(500, 'Internal Server Error', null, res)
    }
}

export const updateProductValidation = (req: Request, res: Response, next: NextFunction): any => {
    const { ...body } = req.body

    const data: object = {
        productId: body.productId,
        productName: body.productName,
        productStock: body.productStock,
        productUnit: body.productUnit,
        productPrice: body.productPrice,
    }

    const rules: Rules = {
        productId: 'required|string|max:6',
        productName: 'required|string|max:30',
        productStock: 'required|integer',
        productUnit: 'required|string|max:10',
        productPrice: 'required|integer',
    }

    const validate: Validator.Validator<object> = new Validator(data, rules)

    if (validate.fails() ?? false) return response(400, 'Bad Request', validate.errors, res)
    next()
}