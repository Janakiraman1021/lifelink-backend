const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/hospital");
const Request = require("../models/request");
const authenticate = require("../middleware/authenticate");

const hospitalRoutes = (io) => {
  const router = express.Router();

  // Signup Route
  router.post("/signup", async (req, res) => {
    try {
      const { name, email, password, hospitalId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const hospital = new Hospital({ name, email, password: hashedPassword, hospitalId });
      await hospital.save();
      res.status(201).json({ message: "Hospital registered successfully" });
    } catch (err) {
      res.status(400).json({ error: "Error during hospital signup", details: err.message });
    }
  });

  // Login Route
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const hospital = await Hospital.findOne({ email });
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });

      const validPassword = await bcrypt.compare(password, hospital.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ id: hospital._id, role: "hospital" }, "secretKey", { expiresIn: "1h" });
      res.status(200).json({ token, message: "Login successful" });
    } catch (err) {
      res.status(400).json({ error: "Error during hospital login", details: err.message });
    }
  });

  // Create Request Route
  router.post("/request", authenticate, async (req, res) => {
    try {
      const { bloodType, quantity, urgency, reason, location } = req.body;

      const newRequest = new Request({
        hospital: req.user.id,
        bloodType,
        quantity,
        urgency,
        reason,
        location,
      });

      const savedRequest = await newRequest.save();

      // Emit real-time notification to organization
      io.emit("new_request", {
        message: "New blood request received",
        request: savedRequest,
      });

      res.status(201).json(savedRequest);
    } catch (err) {
      res.status(500).json({ error: "Failed to create request" });
    }
  });

  return router;
};

module.exports = hospitalRoutes;
