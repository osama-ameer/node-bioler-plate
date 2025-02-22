const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const signupWithGithub = async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).send("Missing GitHub code");

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Ensures JSON response
        },
        body: JSON.stringify({
          client_id: "Ov23lizNSMDmpKgJkYHj",
          client_secret: "41caedffffeec75e818763d03b78908768e2d211",
          code: code,
        }),
      }
    );
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res
        .status(400)
        .json({ message: "Failed to retrieve access token", error: tokenData });
    }

    const accessToken = tokenData.access_token;

    // Fetch GitHub user info
    const userResponse = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const user = await userResponse.json();

    res.json({ token: accessToken, user });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        access_token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const authController = { registerUser, signupWithGithub, loginUser };

module.exports = authController;
