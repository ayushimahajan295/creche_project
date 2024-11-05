import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';
import cartRouter from './routes/cartRoutes.js'; 
import authenticate from './middlewares/auth.js';
//import PurchasedNanny from '../frontend/src/pages/PurchasedNannies.jsx';// Import cart routes
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
//import purchasedNanniesRoute from "./routes/PurchasedNanniesRoutes.js";
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
connectCloudinary();
connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you need to send cookies with the request
}));
app.use(express.json());

// Define Order Schema
const OrderSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

const PurchasedNannySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  nannyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nanny", // Reference to the Nanny model
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});
// API endpoints
export default mongoose.model("PurchasedNanny", PurchasedNannySchema);
app.get('/', (req, res) => {
  res.send("API working");
});

// Use user, nanny, and cart routes
app.use('/api/user', userRouter);
app.use('/api/nanny', nannyRouter);
app.use('/api/cart', cartRouter); // Use cart routes

// Get purchased nannies for the logged-in user

//app.use("/api/purchased-nannies", purchasedNanniesRoute);
// Create order endpoint
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});

// Validate payment endpoint
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Validate the payment signature
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  // Save order data to the database
  try {
    const newOrder = new Order({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "Success",
    });

    await newOrder.save();

    res.json({
      msg: "Payment successful and order saved to database",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving order to database" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




