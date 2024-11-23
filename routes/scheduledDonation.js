const express = require("express");
const ScheduledDonation = require("../models/ScheduledDonation");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Schedule a donation
router.post("/schedule", authenticate, async (req, res) => {
  try {
    const { date, time, location, bloodType } = req.body;

    if (!date || !time || !location || !bloodType) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newDonation = new ScheduledDonation({
      donor: req.user.id, // Extracted from authenticated user
      date,
      time,
      location,
      bloodType,
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling donation:", error);
    res.status(500).json({ error: "Failed to schedule donation." });
  }
});

// Get all scheduled donations for a donor
router.get("/", authenticate, async (req, res) => {
  try {
    const donations = await ScheduledDonation.find({ donor: req.user.id });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations." });
  }
});

module.exports = router;
