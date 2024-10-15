import express from 'express';
import upload from '../middlewares/multer.js';
import {
    addNanny,
    listNannies,
    getNannyById,
    removeNanny
} from '../controllers/nannyController.js'; // Adjust the path as necessary


const nannyRouter = express.Router();

// Route to add a nanny (requires admin authentication)
nannyRouter.post('/add', upload.fields([{ name: 'profilePicture', maxCount: 1 }]), addNanny); 

// Route to list all nannies (requires admin authentication)
nannyRouter.post('/list', listNannies); 

// Route to get a single nanny by ID (no admin auth needed)
nannyRouter.get('na/:id', getNannyById); 

// Route to remove a nanny by ID (requires admin authentication)
nannyRouter.delete('/remove/:id', removeNanny); 

export default nannyRouter;


