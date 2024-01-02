import express, { type Router } from 'express'
import { addUser, getUsers, updateUser, userLogin, userLogout } from '../controller/user.controller'
import { addUserValidation } from '../middleware/validation'
import { authentication } from '../middleware/auth'

const userRouter: Router = express.Router()

userRouter.post('/user/login', userLogin)
userRouter.get('/user/logout/:id', userLogout)
userRouter.post('/user/add', authentication, addUserValidation, addUser)
userRouter.put('/user/put', authentication, updateUser)
userRouter.get('/user/get', authentication, getUsers)

export default userRouter