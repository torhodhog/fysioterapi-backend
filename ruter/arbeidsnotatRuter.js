const express = require("express");
const router = express.Router();
const arbeidsnotatController = require("../controllers/arbeidsnotatController");
const auth = require("../middleware/authMiddleware");

// Opprett nytt arbeidsnotat
router.post("/", auth, arbeidsnotatController.opprettArbeidsnotat);

// Hent ALLE arbeidsnotater for en pasient
router.get("/pasient/:pasientId", auth, arbeidsnotatController.hentArbeidsnotaterForPasient);

// Hent ETT spesifikt arbeidsnotat
router.get("/id/:notatId", auth, arbeidsnotatController.hentArbeidsnotat);

// Slett et arbeidsnotat
router.delete("/:notatId", auth, arbeidsnotatController.slettArbeidsnotat);

router.get("/siste/pasient/:pasientId", auth, arbeidsnotatController.hentSisteArbeidsnotatForPasient);

module.exports = router;
