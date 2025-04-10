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
const profilRuter = require("./ruter/profilRuter");
const varselRoutes = require("./ruter/varselRuter");
const loggRuter = require("./ruter/loggRuter"); // Logg-ruten for økter

// Define routes
app.use("/api/auth", authRuter); // Auth routes
app.use("/api/pasienter", verifyToken, pasientRuter); // Pasient routes with authentication
app.use("/api/meldinger", verifyToken, meldingRuter); // Melding routes with authentication
app.use("/api/rapporter", verifyToken, rapportRuter); // Rapport routes with authentication
app.use("/api/profil", verifyToken, profilRuter); // Profil routes with authentication
app.use("/api/varsler", varselRoutes); // Varsel routes (no need for authentication if public)
app.use("/api/logg", verifyToken, loggRuter); // Logg routes for økter, requires authentication

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
