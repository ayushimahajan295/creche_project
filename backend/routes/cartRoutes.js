import express from 'express';
import {
  addCartItem,
  getCartItems,
  
} from '../controllers/cartControllers.js'; // Adjust the path if necessary

const router = express.Router();

// Add a new cart item
router.post('/', addCartItem);

// Get cart items
router.get('/', getCartItems);
// Add this route to handle the deletion
//router.delete('/api/cart/:id', deleteCartItem);


export default router;

