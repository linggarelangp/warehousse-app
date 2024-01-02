import express, { type Router } from 'express'
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controller/product.controller'
import { productValidation, updateProductValidation } from '../middleware/validation'
import { authentication } from '../middleware/auth'

const productRouter: Router = express.Router()

// Web
productRouter.post('/product/add', authentication, productValidation, addProduct)
productRouter.get('/product/get', authentication, getProducts)
productRouter.get('/product/get/:id', authentication, getProductById)
productRouter.put('/product/put/:id', authentication, productValidation, updateProduct)
productRouter.delete('/product/delete/:id', authentication, deleteProduct)

// Desktop
// productRouter.post('/desktop/product/add', productValidation, addProduct)
// productRouter.get('/desktop/product/get', getProducts)
// productRouter.get('/desktop/product/get/:id', getProductById)
// productRouter.put('/desktop/product/put/:id', updateProductValidation, updateProduct)
// productRouter.delete('/desktop/product/delete/:id', deleteProduct)

export default productRouter