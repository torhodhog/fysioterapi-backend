/*
  Routes for user authentication.
  - Register new users.
  - Login and receive JWT token.
*/

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
