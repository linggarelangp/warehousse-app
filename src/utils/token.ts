import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

interface IDatauser {
    id: number
    userId: string
    firstname: string
    lastname: string
    fullname: string
    active: boolean
}

export const generateAccessToken = (data: IDatauser): string => {
    const jwtToken: string = process.env.JWT_ACCESS_TOKEN as string
    const getAccessToken: string = jwt.sign(data, jwtToken, { expiresIn: '1h' })

    return getAccessToken
}

export const generateRefreshToken = (data: IDatauser): string => {
    const jwtToken: string = process.env.JWT_REFRESH_TOKEN as string
    const getRefreshToken: string = jwt.sign(data, jwtToken, { expiresIn: '12h' })

    return getRefreshToken
}

export const extractAccessToken = (token: string): IDatauser | null => {
    const jwtToken: string = process.env.JWT_ACCESS_TOKEN as string
    let data: any

    jwt.verify(token, jwtToken, (err, decode) => {
        if (decode === undefined && err !== null) data = undefined
        else data = decode
    })

    if (data === undefined) return null
    return data as IDatauser
}

export const extractRefreshToken = (token: string): IDatauser | null => {
    const jwtToken: string = process.env.JWT_REFRESH_TOKEN as string
    let data: any

    jwt.verify(token, jwtToken, (err, decode) => {
        if (decode === undefined && err !== null) data = undefined
        else data = decode
    })

    if (data === undefined) return null
    return data as IDatauser
}