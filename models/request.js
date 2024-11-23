const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
  reason: { type: String },
  location: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Completed"], default: "Pending" },
  assignedDonor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
