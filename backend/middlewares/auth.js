import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    const token = authHeader.split(' ')[1]; // Assumes the token is in "Bearer <token>" format

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        if (!decoded || !decoded.userID) {
            console.error("Decoded token does not contain userID:", decoded);
            return res.status(401).json({ success: false, message: "Invalid token payload." });
        }

        console.log("Decoded token:", decoded); // Log to confirm structure and content
        req.user = { userId: decoded.userID }; // Attach userID to req.user
        next(); // Proceed to the next middleware/route handler
    });
};

export default authenticate;
