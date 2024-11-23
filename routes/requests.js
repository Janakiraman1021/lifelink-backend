const express = require("express");
const Request = require("../models/request");
const authenticate = require("../middleware/authenticate");


const router = express.Router();

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("hospital", "name") // Populate hospital name
      .populate("assignedDonor", "name"); // Populate donor name
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// Assign request to a donor
router.post("/:id/assign", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user is authenticated
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { assignedDonor: userId, status: "Approved" },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign request" });
  }
});

module.exports = router;
