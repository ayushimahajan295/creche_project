import express from 'express';
import { loginUser, signupUser, adminLogin } from '../controllers/userController.js';
import authenticate from '../middlewares/auth.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

// Authentication Routes
userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/admin', adminLogin);

// Get Profile Route - Protected by authenticate middleware
userRouter.get('/profile', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId; // Use userID from authenticated request
        const user = await User.findById(userId).select('username email phoneNumber aadharCard');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user); // Return user data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile Route - Protected by authenticate middleware
userRouter.put('/profile', authenticate, async (req, res) => {
    const { username, email, phoneNumber, aadharCard } = req.body;

    try {
        const userId = req.user.userId; // Use userID from authenticated request
        console.log(userId);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, phoneNumber, aadharCard },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(updatedUser); // Return updated user data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default userRouter;
