const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../models/organization");
const Request = require("../models/request");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, organizationId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const organization = new Organization({
      name,
      email,
      password: hashedPassword,
      organizationId,
    });
    await organization.save();
    res.status(201).json({ message: "Organization registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error during organization signup", details: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const organization = await Organization.findOne({ email });
    if (!organization) return res.status(404).json({ error: "Organization not found" });

    const validPassword = await bcrypt.compare(password, organization.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: organization._id, role: "organization" }, "secretKey", { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(400).json({ error: "Error during organization login", details: err.message });
  }
});

// Fetch Requests for Organization
router.get("/requests", authenticate, async (req, res) => {
  try {
    const requests = await Request.find({ status: "Pending" }).populate("hospital");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;
