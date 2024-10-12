import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';

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
app.use('/api/user', userRouter); // Prefix all user routes with /api/users
app.use('/api/nanny',nannyRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





