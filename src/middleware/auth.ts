import { type Request, type Response, type NextFunction } from 'express'
import response from '../utils/response'
import { extractAccessToken, extractRefreshToken, generateAccessToken } from '../utils/token'
import Users from '../db/models/Users'

interface IDatauser {
    id: number
    userId: string
    firstname: string
    lastname: string
    fullname: string
    active: boolean
}

const handleUserAccessToken = (req: Request): boolean | null | IDatauser => {
    // const authToken: string = req.headers.authorization as string
    const tokenFromCookies: string = req.cookies?.usrToken

    //const token: string | undefined = (authToken === undefined) ? undefined : authToken.split(" ")[1]

    // if (token === undefined || tokenFromCookies === undefined || token !== tokenFromCookies) {
    //     return false
    // }

    if (tokenFromCookies === null || tokenFromCookies === undefined) {
        return false
    }

    const verifyToken: IDatauser | null = extractAccessToken(tokenFromCookies)

    return verifyToken
}

const handleUserRefreshToken = async (req: Request): Promise<boolean | string> => {
    const refreshToken = req.headers['x-refresh-token'] as string | undefined

    try {
        if (!refreshToken) {
            throw new Error("Invalid refresh token")
        }

        const data: Users | null = await Users.findOne({ where: { refreshToken } })

        if (data === null) {
            throw new Error("Data can\'t be verified")
        }

        const verifyRefreshToken: IDatauser | null = extractRefreshToken(refreshToken)

        if (verifyRefreshToken === null) {
            throw new Error("Refresh token verification failed")
        }

        const newUserAccessToken: IDatauser = {
            id: data.id,
            userId: data.userId,
            firstname: data.firstname,
            lastname: data.lastname,
            fullname: data.fullname,
            active: data.active
        }
        return generateAccessToken(newUserAccessToken);
    } catch (error: any) {
        if (error instanceof Error) return false
        return false
    }

}

export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const verifyToken: boolean | IDatauser | null = handleUserAccessToken(req)

        if (verifyToken === false) {
            return response(401, 'Unauthorized', null, res)
        }

        if (verifyToken === null) {

            const newAccessToken: boolean | string = await handleUserRefreshToken(req);

            if (!newAccessToken) {
                throw Error
            }

            res.clearCookie('usrToken')

            res.cookie('usrToken', newAccessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })
        }

        next()

    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', null, res)
        return response(400, 'Bad Request', null, res)
    }
}
