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
      const userId = req.user.userId;
      console.log("User ID:", userId);

      // Fetch purchased nannies for the logged-in user and populate the nanny's name
      const purchasedNannies = await PurchasedNannies.find({ userId })
          .populate({
              path: 'nannyId',
              select: 'firstName lastName', // Only fetch the fields needed
              options: { strictPopulate: false } // Ensure population even if nannyId is missing
          })
          .exec();

      // Log the data after population
      console.log("Purchased Nannies after population:", purchasedNannies);

      // Map the results to include all purchased records with a default message for missing nannyId
      const response = purchasedNannies.map((purchasedNanny) => {
          const nanny = purchasedNanny.nannyId;
          return {
              nannyName: nanny ? `${nanny.firstName} ${nanny.lastName}` : 'Nanny not found',
              purchaseDate: purchasedNanny.purchaseDate,
              nannyId: nanny ? nanny._id : null,
          };
      });

      res.status(200).json({ success: true, nannies: response });
  } catch (error) {
      console.error('Error retrieving purchased nannies:', error);
      res.status(500).json({
          success: false,
          message: 'Error retrieving purchased nannies.',
          error: error.message,
      });
  }
});


// Route to save purchased nanny
nannyRouter.post('/purchasednanny', authenticate, async (req, res) => {
  const { nannyId } = req.body;
  const userId = req.user.userId;

  try {
      const newPurchasedNanny = new PurchasedNannies({
          userId,
          nannyId,
      });
      await newPurchasedNanny.save();
      res.status(201).json({ message: 'Nanny purchased successfully.', nannyId: newPurchasedNanny.nannyId });
  } catch (error) {
      res.status(500).json({ message: 'Failed to save purchased nanny.' });
  }
});


export default nannyRouter;
