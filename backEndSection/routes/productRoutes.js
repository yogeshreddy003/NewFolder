import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
// Corrected import statement for all controller functions
import {
  getAllProducts,
  getProductById,
  createProduct, // This now correctly matches the export from the controller
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByPriceRange,
} from "../controllers/productController.js"; 

const router = express.Router();

// --- Public Routes ---

// GET /api/products
// Gets all products (or returns an empty list)
router.get('/', getAllProducts);

// GET /api/products/search?query=keyword
// Searches products by name or description
router.get('/search', searchProducts);

// GET /api/products/filter?minPrice=100&maxPrice=500
// Filters products by price range
router.get('/filter', getProductsByPriceRange);

// GET /api/products/:id
// Gets a single product by ID
router.get('/:id', getProductById);


// --- Private/Admin Routes (Would typically have an authentication/authorization middleware here) ---


router.post('/', protect, createProduct);    // Add protect here
router.put('/:id', protect, updateProduct);   // Add protect here
router.delete('/:id', protect, deleteProduct); // Add protect here

export default router;