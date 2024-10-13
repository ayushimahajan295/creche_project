import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';
<<<<<<< HEAD
import mongoose from 'mongoose';
import Nanny from './models/nannyModel.js';
import dotenv from 'dotenv';
import Cart from './models/CartModel.js';
=======

import dotenv from 'dotenv';
>>>>>>> 5022549007facf901d2234bae4b035eb969f7880
dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();
connectCloudinary();
connectDB();

app.use(cors());
app.use(express.json());

// API endpoints
app.get('/', (req, res) => {
  res.send("API working");
});

// Use user routes
app.use('/api/user', userRouter); // Prefix all user routes with /api/users
app.use('/api/nanny',nannyRouter);
<<<<<<< HEAD
app.get('/api/nannylist', async (req, res) => {
  try {
      const nannies = await Nanny.find(); // Fetch all nannies from MongoDB
      res.status(200).json({ success: true, nannies }); // Return nannies in JSON format
  } catch (error) {
      console.error('Error fetching nannies:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/cart', async (req, res) => {
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
});
app.post('/api/getcart', async (req, res) => {
  try {
    // Fetch cart items from the database
    const cartItems = await Cart.find(); // Add filtering criteria if needed
    res.status(200).json({ cartItems }); // Send the cart items as a response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
=======

>>>>>>> 5022549007facf901d2234bae4b035eb969f7880
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





