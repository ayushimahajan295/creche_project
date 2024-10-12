import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure token_decode contains the necessary information
    // This depends on your token structure, adapt accordingly
    if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
