const express = require("express");
const { createOrUpdateProfile, getProfile } = require("../controllers/profilController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", verifyToken, getProfile); // Hent terapeutens profil
router.post("/", verifyToken, createOrUpdateProfile); // Opprett eller oppdater profil

module.exports = router;
