const mongoose = require("mongoose");

const businessSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
