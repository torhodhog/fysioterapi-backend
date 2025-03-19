/*
  Main server file for the backend API.
  - Connects to MongoDB.
  - Sets up Express with CORS and JSON support.
  - Defines the main API entry point.
  - Secures routes with authentication.
  - Starts the server on the specified port.
*/

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all domains (adjust for production)

// Import authentication middleware
const verifyToken = require("./middleware/authMiddleware");

// Import routes
const authRuter = require("./ruter/authRuter");
const pasientRuter = require("./ruter/pasientRuter");
const meldingRuter = require("./ruter/meldingRuter");
const rapportRuter = require("./ruter/rapportRuter");

// Define routes
app.use("/api/auth", authRuter);
app.use("/api/pasienter", verifyToken, pasientRuter);
app.use("/api/meldinger", verifyToken, meldingRuter);
app.use("/api/rapporter", verifyToken, rapportRuter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("✅ Backend is running 🚀");
});

// Server Start
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
