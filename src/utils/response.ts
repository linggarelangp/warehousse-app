import { type Response } from 'express'
import { stat } from 'fs'

const response = (statusCode: number, msg: string, datas: any, res: Response): Response => {
    if (datas instanceof Error || datas === null) {
        return res.status(statusCode).json({
            status: statusCode,
            message: msg,
        })
    }

    return res.status(statusCode).json({
        status: statusCode,
        message: msg,
        data: datas
    })
}

export default response