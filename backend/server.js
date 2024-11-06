import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';
import cartRouter from './routes/cartRoutes.js'; 
import authenticate from './middlewares/auth.js';
import path from 'path';
import Appointment from './models/Appointment.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import Nanny from './models/nannyModel.js';
import User from './models/userModel.js';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';
//import PurchasedNanny from '../frontend/src/pages/PurchasedNannies.jsx';// Import cart routes
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cloudinary from './config/cloudinary.js'; // Cloudinary config
import imageRouter from './routes/imageRoutes.js'; // Your new image routes
//import purchasedNanniesRoute from "./routes/PurchasedNanniesRoutes.js";
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
connectCloudinary();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: [
    'http://localhost:3000', // Existing frontend
    'http://localhost:5174'  // New frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you need to send cookies with the request
}));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
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
app.use('/backend/admin/public', express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Save files to the 'public/uploads' directory
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      // Set the filename as the original name
      cb(null, file.originalname);
  },
});
const adminEmail = 'aryanbachute063@gmail.com'; // Admin's email

// Mail setup (using Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER, // Sender email from .env file
      pass: process.env.EMAIL_PASS, // Sender email password from .env file (or app password)
  },
});

const sendEmail = (to, subject, text) => {
    if (!to) {
        console.error('Recipient email is missing!');
        return Promise.reject(new Error('Recipient email is missing'));
    }

    const mailOptions = {
        from: 'bachutearyan@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

app.post('/api/nanny/book-appointment/:nannyId', authenticate, async (req, res) => {
  const { nannyId } = req.params;
  const { userLocation, appointmentDate, meetingTime } = req.body;
  const userId = req.user.userId;

  if (!meetingTime) {
    return res.status(400).json({ message: "Meeting time is required." });
  }

  try {
    const appointmentDateTime = new Date(`${appointmentDate}T${meetingTime}:00.000Z`);
    const appointment = new Appointment({
      userId,
      nannyId,
      location: userLocation,
      meetingTime: appointmentDateTime,
    });

    await appointment.save();

    // Retrieve user and nanny details for the email
    const user = await User.findById(userId);
    const nanny = await Nanny.findById(nannyId);

    if (!user || !nanny) {
      return res.status(404).json({ message: "User or nanny not found." });
    }

    // Log user and nanny email to verify they exist
    console.log('User Email:', user.email);
    console.log('Nanny Email:', nanny.contactEmail);

    // Send confirmation email to the user
    const emailSubject = "Appointment Confirmation";
    const emailText = `
      Hi ${user.username},

      Your appointment with ${nanny.firstName} has been booked successfully!

      Appointment Details:
      - Date: ${appointmentDate}
      - Time: ${meetingTime}
      - Location: ${userLocation}

      Thank you for choosing our service!
    `;

    await sendEmail(user.email, emailSubject, emailText);

    // Send confirmation email to the nanny
    const nannyEmailSubject = "New Appointment Booking";
    const nannyEmailText = `
      Hi ${nanny.firstName},

      You have a new appointment booked with ${user.username}!

      Appointment Details:
      - Date: ${appointmentDate}
      - Time: ${meetingTime}
      - Location: ${userLocation}
      - User: ${user.username}

      Please confirm your availability.
    `;

    await sendEmail(nanny.contactEmail, nannyEmailSubject, nannyEmailText);
    
    res.status(200).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment. Please try again later.' });
  }
});




// Initialize upload
const upload = multer({ storage });
app.use('/api/images', imageRouter);
// Use user, nanny, and cart routes
app.use('/api/user', userRouter);
app.use('/api/nanny', nannyRouter);
app.use('/api/cart', cartRouter); // Use cart routes
app.get('/api/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'uploads', filename);
  
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
});
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




