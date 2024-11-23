const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  hospitalId: String,
});

module.exports = mongoose.model("Hospital", hospitalSchema);
