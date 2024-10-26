import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Adjust the path to your userModel if necessary

// Login controller function
const loginUser = async (req, res) => {
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

    const token = jwt.sign({ userID: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Signup controller function
const signupUser = async (req, res) => {
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
        { phoneNumber },
      ],
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
    const token = jwt.sign({ userID: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully!', token });
    
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin login controller function
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, signupUser, adminLogin };
