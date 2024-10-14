import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';
import cartRouter from './routes/cartRoutes.js'; // Import cart routes
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
app.use('/api/user', userRouter);
app.use('/api/nanny', nannyRouter);
app.use('/api/cart', cartRouter); // Use cart routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





