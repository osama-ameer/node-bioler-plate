const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you import the User model

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user and attach to the request object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Token Verification Error:", error); // Debugging log
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.error("No Token Provided"); // Debugging log
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
