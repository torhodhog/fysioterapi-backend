// ruter/treningsprogramRuter.js

const express = require('express');
const Treningsprogram = require('../models/Treningsprogram');
const { deleteTreningsprogram } = require('../controllers/treningsprogramController');
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
     // feilmelding om du har reps og tid
    if(err.name === "ValidationError") {
      return res.status(400).json({error: err.message});
    }

    console.error("Feil ved oppretting av treningsprogram:", err);
    res.status(500).json({ error: "Kunne ikke opprette treningsprogram" });
  }
});

router.get("/:pasientId", async (req, res) => {
  try {
    const treningsprogram = await Treningsprogram.find({ pasientId: req.params.pasientId });
    if (!treningsprogram) {
      return res.status(404).json({ error: "Ingen treningsprogram funnet for denne pasienten" });
    }
    res.json(treningsprogram);
  } catch (err) {
    console.error("Feil ved henting av treningsprogram:", err);
    res.status(500).json({ error: "Kunne ikke hente treningsprogram" });
  }
});


// Route to delete a report
router.delete('/:id', deleteTreningsprogram);


module.exports = router;
