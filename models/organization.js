const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  organizationId: String,
});

module.exports = mongoose.model("Organization", organizationSchema);
