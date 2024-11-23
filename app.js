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

// Socket.IO connection

// Define routes and pass io to hospital routes
app.use("/donor", donorRoutes);
app.use("/hospital", hospitalRoutes(io)); // Pass io for real-time functionality
app.use("/organization", organizationRoutes);
app.use("/profile", profileRoutes);
app.use("/requests", requestRoutes);
app.use("/scheduled-donations", scheduledDonationRoutes);


// Start Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
