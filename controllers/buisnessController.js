const Business = require("../models/Business");

const createBusiness = async (req, res) => {
  const { name, address } = req.body;
  try {
    const business = await Business.create({
      name,
      address,
      user: req.user._id,
    });
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ user: req.user._id });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBusiness, getBusinesses };

const businessController = { createBusiness, getBusinesses };

module.exports = businessController;
