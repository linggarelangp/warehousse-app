import express, { type Router } from 'express'
import cookieParser from 'cookie-parser'
import roleRouter from './role.router'
import userRouter from './user.router'
import productRouter from './product.router'
import transactionRouter from './transaction.router'

const router: Router = express.Router()

router.use(cookieParser())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.use('/api', userRouter)
router.use('/api', roleRouter)
router.use('/api', productRouter)
router.use('/api', transactionRouter)

export default router