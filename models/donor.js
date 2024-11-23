const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bloodGroup: String,
});

module.exports = mongoose.model("Donor", donorSchema);
