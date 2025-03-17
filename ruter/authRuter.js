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
router.get("/me", verifyToken, async (req, res) => {
  try {
    const bruker = await Bruker.findById(req.user.id).select("-passord"); // Henter bruker uten passord
    if (!bruker) return res.status(404).json({ error: "Bruker ikke funnet" });

    res.json(bruker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
