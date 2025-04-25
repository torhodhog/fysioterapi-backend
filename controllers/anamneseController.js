// controllers/anamneseController.js

const Anamnese = require("../models/Anamnese");
const Pasient = require("../models/Pasient");

// ✅ Opprett ny anamnese
const opprettAnamnese = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan opprette anamnese." });
    }

    const { pasientId, ...innhold } = req.body;

    if (!pasientId) {
      return res.status(400).json({ error: "Mangler pasientId." });
    }

    const pasient = await Pasient.findById(pasientId);
    if (!pasient) {
      return res.status(404).json({ error: "Pasient ikke funnet." });
    }

    const ny = await Anamnese.create({
      pasientId,
      terapeutId: req.user.id,
      ...innhold,
    });

    res.status(201).json(ny);
  } catch (err) {
    console.error("Feil ved oppretting av anamnese:", err);
    res.status(500).json({ error: "Kunne ikke opprette anamnese." });
  }
};

// ✅ Hent alle anamneser for en pasient
const hentAnamneser = async (req, res) => {
  try {
    const { pasientId } = req.params;

    const data = await Anamnese.find({ pasientId })
      .populate("terapeutId", "navn")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error("Feil ved henting av anamnese:", err);
    res.status(500).json({ error: "Kunne ikke hente anamnese." });
  }
};

// ✅ Oppdater eksisterende anamnese
const oppdaterAnamnese = async (req, res) => {
  try {
    const { pasientId } = req.params;
    const eksisterende = await Anamnese.findOne({ pasientId });

    if (!eksisterende) {
      return res.status(404).json({ error: "Anamnese ikke funnet." });
    }

    if (eksisterende.terapeutId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Du har ikke tilgang til å endre denne anamnesen." });
    }

    const oppdatert = await Anamnese.findOneAndUpdate(
      { pasientId },
      req.body,
      { new: true }
    );

    res.json(oppdatert);
  } catch (err) {
    console.error("Feil ved oppdatering av anamnese:", err);
    res.status(500).json({ error: "Kunne ikke oppdatere anamnese." });
  }
};

// ✅ Slett anamnese
const slettAnamnese = async (req, res) => {
  try {
    const { id } = req.params;
    const anamnese = await Anamnese.findById(id);

    if (!anamnese) {
      return res.status(404).json({ error: "Anamnese ikke funnet." });
    }

    if (anamnese.terapeutId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Du har ikke tilgang til å slette denne anamnesen." });
    }

    await anamnese.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error("Feil ved sletting av anamnese:", err);
    res.status(500).json({ error: "Kunne ikke slette anamnese." });
  }
};

module.exports = {
  opprettAnamnese,
  hentAnamneser,
  oppdaterAnamnese,
  slettAnamnese,
};