const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Donor = require("../models/donor");
const ScheduledDonation = require("../models/ScheduledDonation"); 
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, bloodGroup } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const donor = new Donor({ name, email, password: hashedPassword, bloodGroup });
    await donor.save();
    res.status(201).json({ message: "Donor registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error during donor signup", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(404).json({ error: "Donor not found" });

    const validPassword = await bcryptjs.compare(password, donor.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: donor._id, role: "donor" }, "secretKey", { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(400).json({ error: "Error during donor login", details: err.message });
  }
});


router.post("/schedule", authenticate, async (req, res) => {
  try {
    const { date, time, location, bloodType } = req.body;

    if (!date || !time || !location || !bloodType) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newDonation = new ScheduledDonation({
      donor: req.user.id, // Retrieved from authenticated user
      date,
      time,
      location,
      bloodType,
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation scheduled successfully!" });
  } catch (err) {
    console.error("Error scheduling donation:", err);
    res.status(500).json({ error: "Failed to schedule donation." });
  }
});

module.exports = router;
