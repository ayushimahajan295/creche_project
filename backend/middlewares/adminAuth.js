import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user is an admin
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized. Admin access required." });
        }

        // Add the decoded token to the request for further use
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default adminAuth;

