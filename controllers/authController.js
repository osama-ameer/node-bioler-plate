const User = require("../models/User");
const jwt = require("jsonwebtoken");
const helperFunctions = require("../utils/helpers");

// Signup a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const { access_token, refresh_token } = helperFunctions.generateTokens(
      user._id
    );

    user.refresh_token = refresh_token;
    await user.save();

    res.status(201).json({
      _id: user._id,
      access_token,
      refresh_token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const { access_token, refresh_token } = helperFunctions.generateTokens(
        user._id
      );
      // Save the refresh token in the database
      user.refresh_token = refresh_token;
      await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        access_token,
        refresh_token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh token
const refreshAccessToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id);

    if (!user || user.refresh_token !== refresh_token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const { access_token } = helperFunctions.generateTokens(user._id);

    res.json({ access_token });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const authController = { registerUser, loginUser, refreshAccessToken };

module.exports = authController;
