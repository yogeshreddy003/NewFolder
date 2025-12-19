import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  getAllProducts,
  getProductById,
  createProduct, 
  
} from "../controllers/productController.js"; 

const router = express.Router();


router.get('/', getAllProducts);





router.get('/:id', getProductById);





router.post('/', protect, createProduct);    


export default router;