import express from 'express';
import upload from '../middlewares/multer.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Nanny from '../models/nannyModel.js';// Adjust the path based on your project structure
import authenticate from '../middlewares/auth.js';
import PurchasedNannies from '../models/PurchasedNannies.js';
import {
    addNanny,
    listNannies,
    getNannyById,
    removeNanny
} from '../controllers/nannyController.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nannyRouter = express.Router();
nannyRouter.use('/public', express.static(path.join(__dirname, 'public')));

// Define routes
nannyRouter.post('/add', upload.single('profilePicture'), addNanny);
nannyRouter.post('/list', listNannies);
nannyRouter.get('/na/:id', getNannyById);
nannyRouter.delete('/remove/:id', removeNanny);
nannyRouter.get('/user/purchased-nannies', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming req.user is populated with user details after authentication
console.log(userId);
        // Fetch purchased nannies for the logged-in user and populate the nanny's name
        const purchasedNannies = await PurchasedNannies.find({ userId })
            .populate('nannyId', 'firstName lastName') // Populate only the first and last name fields from Nanny model
            .exec();

        // Map the results to only include necessary details
        const response = purchasedNannies.map((purchasedNanny) => ({
            nannyName: `${purchasedNanny.nannyId.firstName} ${purchasedNanny.nannyId.lastName}`,
            purchaseDate: purchasedNanny.purchaseDate,
            nannyId: purchasedNanny.nannyId._id
        }));

        res.status(200).json({ success: true, nannies: response });
    } catch (error) {
        console.error('Error retrieving purchased nannies:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving purchased nannies.',
            error: error.message
        });
    }
});

export default nannyRouter;
