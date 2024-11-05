// routes/imageRoutes.js
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Configure storage for multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: set the folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'webp'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    // If the upload was successful, return the URL of the uploaded image
    res.status(200).json({
      success: true,
      url: req.file.path, // Cloudinary URL of the uploaded image
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Upload failed',
    });
  }
});

export default router;
