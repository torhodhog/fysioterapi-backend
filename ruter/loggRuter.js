const express = require("express");
const router = express.Router();
const { opprettLogg, hentLoggerForPasient } = require("../controllers/loggController");
const verifyToken = require("../middleware/authMiddleware"); // Vi trenger å bruke autentisering for å få tak i innlogget bruker

// Opprett ny logg (pasient) - Verifiser at brukeren er en pasient og koble automatisk til pasientId
router.post("/", verifyToken, opprettLogg);

// Hent logger for en pasient
router.get("/:pasientId", verifyToken, hentLoggerForPasient); // Sørg for at denne ruten også er beskyttet av token (dvs. kun terapeuter/admin kan hente pasientlogger)

module.exports = router;
