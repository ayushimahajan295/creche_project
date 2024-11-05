import Cart from '../models/CartModel.js'; // Adjust the path if necessary

// Add a new cart item
export const addCartItem = async (req, res) => {
  try {
    const { nannyId, firstName, lastName, contactEmail, rate } = req.body;
    const userId = req.user.userId; // Get the authenticated user's ID

    const newCart = new Cart({
      userId,
      nannyId,
      firstName,
      lastName,
      contactEmail,
      rate,
    });

    await newCart.save();
    res.status(201).json({ message: 'Nanny added to cart successfully!', newCart });
  } catch (error) {
    console.error('Error adding nanny to cart:', error);
    res.status(500).json({ message: 'Failed to add nanny to cart. Please try again.' });
  }
};

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the authenticated user's ID
    const cartItems = await Cart.find({ userId }); // Fetch cart items for the user

    res.status(200).json({ cartItems }); // Send the cart items as a response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

// Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params; // Get the item ID from the request parameters
    const userId = req.user.userId; // Get the authenticated user's ID

    // Find and delete the cart item, ensuring it belongs to the user
    const cartItem = await Cart.findOneAndDelete({ _id: id, userId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found or does not belong to you.' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Failed to delete cart item. Please try again.' });
  }
};

