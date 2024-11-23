const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secretKey"); // Replace "secretKey" with a secure environment variable
    req.user = decoded; // Attach decoded user data to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticate;
