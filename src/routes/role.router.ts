import express, { type Router } from 'express'
import { addRole, getRoles, getRoleById, updateRole, deleteRole } from '../controller/role.controller'
import { roleValidation } from '../middleware/validation'
import { authentication } from '../middleware/auth'


const roleRouter: Router = express.Router()

// roleRouter.use(authentication)
roleRouter.post('/role/add', authentication, roleValidation, addRole)
roleRouter.get('/role/get', authentication, getRoles)
roleRouter.get('/role/get/:id', authentication, getRoleById)
roleRouter.put('/role/update/:id', authentication, updateRole)
roleRouter.delete('/role/delete/:id', authentication, deleteRole)

export default roleRouter