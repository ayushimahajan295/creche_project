// upload.js
const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder for uploaded files
        cb(null, path.join(__dirname, 'public', 'uploads')); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        // Use original filename
        cb(null, file.originalname);
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
