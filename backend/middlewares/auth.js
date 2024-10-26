import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID; // Attach userID to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default authenticate;
