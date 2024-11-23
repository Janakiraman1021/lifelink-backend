const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const donorRoutes = require("./routes/donor");
const hospitalRoutes = require("./routes/hospital");
const organizationRoutes = require("./routes/organization");
const profileRoutes = require("./routes/profile");
const requestRoutes = require("./routes/requests");
const scheduledDonationRoutes = require("./routes/scheduledDonation");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
  },
});

app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = "mongodb+srv://lifelink:lifelink@lifelink.sgulw.mongodb.net/lifelink?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Routes
app.use("/api/donor", donorRoutes); // Updated with `/api` prefix
app.use("/api/hospital", hospitalRoutes(io)); // Pass io for real-time functionality
app.use("/api/organization", organizationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/scheduled-donations", scheduledDonationRoutes);

// 404 Handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Start Server
const PORT = 5000; // Or the port used by Render
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
