// loggController.js
const Logg = require("../models/Logg");
const Pasient = require("../models/Pasient");

// Lag ny logg
const opprettLogg = async (req, res) => {
  try {
    // Verifiser at innlogget bruker er en pasient
    if (req.user.rolle !== "pasient") {
      return res.status(403).json({ error: "Kun pasienter kan logge økter" });
    }

    // Finn pasientprofilen til innlogget bruker
    const pasient = await Pasient.findOne({ brukerId: req.user.id });

    if (!pasient) {
      return res.status(404).json({ error: "Ingen pasientprofil funnet" });
    }

    // Ekstra sjekk for å sikre at vi har de nødvendige dataene i body
    const { smerteVerdi, øktOpplevelse, trente, notater } = req.body;
    if (!smerteVerdi || !øktOpplevelse || !trente) {
      return res.status(400).json({ error: "Mangler nødvendig informasjon i loggen." });
    }

    const nyLogg = new Logg({
      pasientId: pasient._id, // Automatisk koblet til pasientens ID
      smerteVerdi,
      øktOpplevelse,
      trente,
      notater,
    });

    await nyLogg.save();
    res.status(201).json(nyLogg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hent logg for en pasient
const hentLoggerForPasient = async (req, res) => {
  try {
    const logger = await Logg.find({ pasientId: req.params.pasientId });
    res.json(logger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { opprettLogg, hentLoggerForPasient };
