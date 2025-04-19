
const express = require("express");
const router = express.Router();
const arbeidsnotatController = require("../controllers/arbeidsnotatController");
const auth = require("../middleware/authMiddleware");

// Opprett nytt arbeidsnotat
router.post("/", auth, arbeidsnotatController.opprettArbeidsnotat);

// Hent arbeidsnotat for pasient
router.get("/:pasientId", auth, arbeidsnotatController.hentArbeidsnotat);

module.exports = router;