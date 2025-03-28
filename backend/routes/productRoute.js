import express from 'express'
import { listProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/list', listProduct);

export default productRouter