/*
  Routes for user profiles.
  - Handles profile image uploads using Cloudinary.
*/

const express = require("express");
const { upload, uploadProfileImage } = require("../controllers/profilController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Rute for å laste opp profilbilde
router.post("/upload", verifyToken, upload.single("image"), uploadProfileImage);

module.exports = router;
