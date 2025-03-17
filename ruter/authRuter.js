/*
  Routes for user authentication.
  - Register new users.
  - Login and receive JWT token.
  - Get the logged-in user's info.
*/

const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe); // Ny rute for å hente innlogget bruker

module.exports = router;
