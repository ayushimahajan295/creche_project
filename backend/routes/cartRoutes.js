import express from 'express';
import {
  addCartItem,
  getCartItems,
  deleteCartItem, // Import the deleteCartItem function
} from '../controllers/cartControllers.js'; // Adjust the path if necessary
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Add a new cart item
router.post('/', authenticate, addCartItem);

// Get cart items
router.get('/', authenticate, getCartItems);

// Delete a cart item by ID
router.delete('/:id', authenticate, deleteCartItem); // Correctly set route to delete by ID

export default router;


