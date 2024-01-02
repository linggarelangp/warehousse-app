import { type Request, type Response } from 'express'
import response from '../utils/response'
import Roles from '../db/models/Roles'

export const addRole = async (req: Request, res: Response): Promise<Response> => {
    const { ...body } = req.body

    try {
        const data: object = {
            roleId: body.roleId,
            rolename: body.rolename
        }

        const role: Roles = await Roles.create(data)

        return response(201, 'Created', role, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }

}

export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles: Roles[] = await Roles.findAll()

        return response(200, 'OK', roles, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getRoleById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    try {
        const role: Roles | null = await Roles.findByPk(id)

        if (role === null) return response(404, 'Not Found', null, res)
        return response(200, 'OK', role, res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const updateRole = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    const { ...body } = req.body

    try {
        const data: object = {
            roleId: body.roleId,
            rolename: body.rolename
        }

        const role: [affectedCount: number] = await Roles.update(data, { where: { roleId: id } })

        if (role[0] === 0) return response(400, 'Bad Request', null, res)
        return response(200, 'OK', 'Data Has Been Updated', res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    try {
        const role: number = await Roles.destroy({ where: { roleId: id } })

        if (role === 0) return response(404, 'Not Found', null, res)
        return response(200, 'OK', null, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
} 