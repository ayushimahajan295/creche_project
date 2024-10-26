import express from 'express';
import upload from '../middlewares/multer.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
    addNanny,
    listNannies,
    getNannyById,
    removeNanny
} from '../controllers/nannyController.js';

const nannyRouter = express.Router();
nannyRouter.use('/public', express.static(path.join(__dirname, 'public')));
// Serve static files from the correct path
// Define routes
nannyRouter.post('/add', upload.single('profilePicture'), addNanny);
nannyRouter.post('/list', listNannies);
nannyRouter.get('/na/:id', getNannyById);
nannyRouter.delete('/remove/:id', removeNanny);
    
export default nannyRouter;
