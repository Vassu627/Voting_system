const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // First check if the request headers have the authorization field or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the JWT token from the authorization header
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "2h" });
};

module.exports = { jwtAuthMiddleware, generateToken };
