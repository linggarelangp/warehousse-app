import express, { type Router } from 'express'
import { addTransaction, getTransaction, getTransactionById, getTransactionByAnyting, getTransactions } from '../controller/transaction.controller'
import { authentication } from '../middleware/auth'

const transactionRouter: Router = express.Router()

transactionRouter.post('/transaction/add', authentication, addTransaction)
transactionRouter.get('/transaction/get/', getTransactions)
transactionRouter.get('/transaction/get/:id', authentication, getTransaction)
transactionRouter.get('/transaction/get/product/:userId', authentication, getTransactionByAnyting)
transactionRouter.get('/transaction/get/:transactionId/:userId', authentication, getTransactionById)

export default transactionRouter