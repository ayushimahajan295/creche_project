import Cart from '../models/CartModel.js'; // Adjust the path if necessary

// Add a new cart item
export const addCartItem = async (req, res) => {
  try {
    const { nannyId, firstName, lastName, contactEmail, rate } = req.body;

    // Create a new cart item
    const newCart = new Cart({
      nannyId,
      firstName,
      lastName,
      contactEmail,
      rate,
    });

    // Save the cart item to the database
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
    // Fetch cart items from the database
    const cartItems = await Cart.find(); // Add filtering criteria if needed
    res.status(200).json({ cartItems }); // Send the cart items as a response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
