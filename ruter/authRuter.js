/*
  Routes for user authentication.
  - Register new users.
  - Login and receive JWT token.
  - Get the logged-in user's info.
*/

const express = require("express");
const { registerUser, loginUser, getMe, logoutUser } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Brukerruter
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.get("/me", verifyToken, getMe); // Krever autentisering

module.exports = router;
