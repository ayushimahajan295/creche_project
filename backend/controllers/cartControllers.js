import Cart from '../models/CartModel.js'; // Adjust the path if necessary

// Add a new cart item
export const addCartItem = async (req, res) => {
  try {
    const { nannyId, firstName, lastName, contactEmail, rate } = req.body;
    const userId = req.userId; // Now correctly aligned with middleware

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
    res.status(500).json({ message: 'Failed to add nanny to cart.', error: error.message });
  }
};

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    // Access userId from the authenticated user
    const userId = req.userId; // Assuming the userId is set in the request by your authentication middleware
console.log(userId);
    // Fetch cart items for the specific user from the database
    const cartItems = await Cart.find({ userId }); // Filter by userId to get the specific user's cart items
    res.status(200).json({ cartItems }); // Send the cart items as a response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



