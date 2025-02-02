const Business = require("../models/Business");

// Create Business
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

// Get all Businesses
const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ user: req.user._id });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Business by ID
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Business
const updateBusiness = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const business = await Business.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: updateData }, // Use `$set` to update only provided fields
      { new: true } // Return updated document
    );
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Business
const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBusiness, getBusinesses };

const businessController = {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};

module.exports = businessController;
