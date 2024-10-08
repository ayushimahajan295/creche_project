
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';


const app = express();


app.use(cors());
app.use(express.json()); 


mongoose.connect("mongodb://localhost:27017/Creche_application", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); 
});


const userSchema = new mongoose.Schema({
    username:    { type: String, required: true, unique: true, trim: true },
    email:       { type: String, required: true, unique: true, trim: true },
    password:    { type: String, required: true },
    aadharCard:  { type: String, required: true, unique: true, trim: true }, 
    phoneNumber: { type: String, required: true, unique: true, trim: true }, 
}, { timestamps: true });
const NannySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    certifications: {
        type: [String],
    },
    profilePicture: {
        type: String, 
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Nanny=mongoose.model('Nanny',NannySchema)

app.post('/signup', async (req, res) => {
  
  const { username, email, password, aadharCard, phoneNumber } = req.body;

  try {
    
    if (!username || !email || !password || !aadharCard || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const aadharRegex = /^\d{12}$/; 
    const phoneRegex = /^[6-9]\d{9}$/; 

    if (!aadharRegex.test(aadharCard)) {
      return res.status(400).json({ message: 'Invalid Aadhar Card number. It should be a 12-digit number.' });
    }

    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid Phone Number. It should be a 10-digit number starting with 6-9.' });
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { aadharCard },
        { phoneNumber }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email, Aadhar Card, or phone number already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      aadharCard,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// POST /nanny Route
app.post('/nanny', async (req, res) => {
  // Destructure all required fields from the request body
  const {
    firstName,
    lastName,
    age,
    experience,
    certifications,
    profilePicture,
    contactEmail,
    contactPhone,
    address,
    // Add more fields as needed
  } = req.body;

  try {
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !age ||
      !experience ||
      !contactEmail ||
      !contactPhone
    ) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Optional: Add more validation (e.g., email format, phone number format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Example: 10-digit Indian phone numbers starting with 6-9

    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!phoneRegex.test(contactPhone)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    // Check if a nanny with the same contact email or phone number already exists
    const existingNanny = await Nanny.findOne({
      $or: [{ contactEmail }, { contactPhone }],
    });

    if (existingNanny) {
      return res.status(409).json({ message: 'Nanny with this email or phone number already exists.' });
    }

    // Process certifications if provided (ensure it's an array)
    let certificationsArray = [];
    if (certifications) {
      if (Array.isArray(certifications)) {
        certificationsArray = certifications;
      } else if (typeof certifications === 'string') {
        certificationsArray = certifications.split(',').map(cert => cert.trim());
      } else {
        return res.status(400).json({ message: 'Invalid format for certifications.' });
      }
    }

    
    const newNanny = new Nanny({
      firstName,
      lastName,
      age,
      experience,
      certifications: certificationsArray,
      profilePicture,
      contactEmail,
      contactPhone,
      address,
    });

   
    const savedNanny = await newNanny.save();

   
    res.status(201).json({
      message: 'Nanny profile created successfully!',
      nanny: savedNanny,
    });
  } catch (error) {
    console.error('Error creating nanny profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
     
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
      
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
     
  
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
