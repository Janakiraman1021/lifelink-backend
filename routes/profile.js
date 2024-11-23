const express = require("express");
const Donor = require("../models/donor");
const Hospital = require("../models/hospital");
const Organization = require("../models/organization");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate and get user type
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Attach user info (id and role) to the request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Fetch user profile
router.get("/", authenticate, async (req, res) => {
  try {
    let user;
    if (req.user.role === "donor") user = await Donor.findById(req.user.id);
    else if (req.user.role === "hospital") user = await Hospital.findById(req.user.id);
    else if (req.user.role === "organization") user = await Organization.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update user profile
router.put("/", authenticate, async (req, res) => {
  try {
    const { name, email, ...otherDetails } = req.body;
    let updatedUser;

    if (req.user.role === "donor") {
      updatedUser = await Donor.findByIdAndUpdate(
        req.user.id,
        { name, email, ...otherDetails },
        { new: true }
      );
    } else if (req.user.role === "hospital") {
      updatedUser = await Hospital.findByIdAndUpdate(
        req.user.id,
        { name, email, ...otherDetails },
        { new: true }
      );
    } else if (req.user.role === "organization") {
      updatedUser = await Organization.findByIdAndUpdate(
        req.user.id,
        { name, email, ...otherDetails },
        { new: true }
      );
    }

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
