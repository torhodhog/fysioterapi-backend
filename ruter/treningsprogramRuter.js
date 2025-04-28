// ruter/treningsprogramRuter.js

const express = require('express');
const Treningsprogram = require('../models/Treningsprogram');
const router = express.Router();

// Opprett nytt treningsprogram
router.post("/", async (req, res) => {
  try {
    const { pasientId, øvelser } = req.body;

    // Sjekk at alle nødvendige data er med
    if (!pasientId || !øvelser || øvelser.length === 0) {
      return res.status(400).json({ error: "Manglende informasjon" });
    }

    const nyttTreningsprogram = new Treningsprogram({
      pasientId,
      øvelser
    });

    await nyttTreningsprogram.save();
    res.status(201).json(nyttTreningsprogram);
  } catch (err) {
    console.error("Feil ved oppretting av treningsprogram:", err);
    res.status(500).json({ error: "Kunne ikke opprette treningsprogram" });
  }
});

module.exports = router;
