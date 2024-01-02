import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import Users from "../db/models/Users"
import response from "../utils/response"
import { hashPassword, comparePassword } from '../utils/hash'
import { generateAccessToken, generateRefreshToken } from '../utils/token'

interface IDatauser {
    id: number
    userId: string
    firstname: string
    lastname: string
    fullname: string
    active: boolean
}

export const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { ...body } = req.body

    try {
        const id: string = uuidv4()
        const activeUser: number = 1
        const hashingPassword: string = await hashPassword(body.password)
        const setFullName = body.firstname + " " + body.lastname

        const data: object = {
            userId: id,
            roleId: body.roleId,
            firstname: body.firstname,
            lastname: body.lastname,
            fullname: setFullName,
            username: body.username,
            password: hashingPassword,
            active: activeUser,
            token: null,
        }

        const user: Users = await Users.create(data)

        return response(201, 'Created', Array(user), res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { ...body } = req.body

    try {

        const user: Users | null = await Users.findOne({ where: { userId: body.userId as string } })

        if (user === null) {
            return response(400, 'Bad Request', null, res)
        }

        const hashingPassword: string = await hashPassword(body.password)
        const setFullName = body.firstname + " " + body.lastname

        const data: object = {
            firstname: body.firstname,
            lastname: body.lastname,
            fullname: setFullName,
            username: body.username,
            password: hashingPassword,
        }

        await user.update(data)

        return response(200, 'OK', Array(user), res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users: Users[] = await Users.findAll({
            attributes: ['id', 'userId', 'firstname', 'lastname', 'fullname', 'username', 'active']
        })

        return response(200, 'OK', Array(users), res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const userLogin = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body

    try {
        const isErrors = {
            error: { data: 'Username or Password Incorrect!' }
        }

        const user: Users | null = await Users.findOne({ where: { username: username } })

        if (user === null) {
            return response(404, 'Not Found', isErrors, res)
        }

        const match: boolean = await comparePassword(password, user.password)

        if (!match) {
            return response(404, 'Not Found', isErrors, res)
        }

        const userToken: IDatauser = {
            id: user.id,
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            fullname: user.fullname,
            active: user.active,
        }
        const accessToken: string = generateAccessToken(userToken)
        const UserRefreshToken: string = generateRefreshToken(userToken)

        res.cookie('usrToken', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        })

        user.refreshToken = UserRefreshToken

        await user.save()

        const data: object = {
            ...userToken,
            username: user.username,
            roleId: user.roleId,
            token: accessToken,
            refreshToken: UserRefreshToken
        }

        return response(200, 'OK', Array(data), res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const userLogout = async (req: Request, res: Response): Promise<Response> => {
    const tokenByCookies = req.cookies?.usrToken
    const { id } = req.params

    try {
        if (tokenByCookies === undefined) {
            res.clearCookie('usrToken')
            return response(200, 'OK', null, res)
        }

        const user: Users | null = await Users.findOne({ where: { id: id } })

        if (user === null) {
            res.clearCookie('usrToken')
            return response(200, 'OK', null, res)
        }

        await user?.update({ refreshToken: null })

        res.clearCookie('usrToken')

        return response(200, 'OK', null, res)

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}