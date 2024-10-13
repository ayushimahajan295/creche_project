import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure token_decode contains the necessary information
    // This depends on your token structure; adapt accordingly
    if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    // If verification is successful, proceed to the next middleware
    next();
  } catch (error) {
    // Handle TokenExpiredError specifically
    if (error.name === 'TokenExpiredError') {
      return res.json({ success: false, message: "Session expired. Please log in again." });
    }

    // Handle other JWT errors
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
