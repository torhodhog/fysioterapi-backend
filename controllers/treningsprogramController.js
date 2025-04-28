const Treningsprogram = require("../models/Treningsprogram");
const Arbeidsnotat = require("../models/Arbeidsnotat");

// Opprett nytt treningsprogram
exports.opprettTreningsprogram = async (req, res) => {
  try {
    const { pasientId, øvelser, rapportId } = req.body;

    // Enkel validering for at dataene er til stede
    if (!pasientId || !øvelser || øvelser.length === 0) {
      return res.status(400).json({ error: "PasientId og øvelser er påkrevd" });
    }

    // Sjekk at rapportId er gyldig (en arbeidsnotat-ID)
    const rapport = await Arbeidsnotat.findById(rapportId);
    if (!rapport) {
      return res.status(404).json({ error: "Rapporten ble ikke funnet" });
    }

    // Opprett nytt treningsprogram
    const nyttTreningsprogram = new Treningsprogram({
      pasientId,
      øvelser,
      rapportId,  // Knytter treningsprogrammet til arbeidsnotatet
    });

    await nyttTreningsprogram.save();
    res.status(201).json(nyttTreningsprogram);  // Returner det opprettede treningsprogrammet
  } catch (err) {
    console.error("Feil ved oppretting av treningsprogram:", err);
    res.status(500).json({ error: "Kunne ikke opprette treningsprogram" });
  }
};
