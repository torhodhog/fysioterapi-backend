// routes/varselRoutes.js

const express = require("express");
const router = express.Router();
const varselController = require("../controllers/varselController");
const auth = require("../middleware/authMiddleware");

// Hent varsler for innlogget terapeut
router.get("/", auth, varselController.hentVarsler);

// Opprett nytt varsel
router.post("/", auth, varselController.lagVarsel);

// Sett et varsel som lest
router.patch("/:id/lest", auth, varselController.settSomLest);

module.exports = router;
