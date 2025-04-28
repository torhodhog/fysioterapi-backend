const Arbeidsnotat = require("../models/Arbeidsnotat");
const Pasient = require("../models/Pasient");

// Opprett nytt arbeidsnotat
exports.opprettArbeidsnotat = async (req, res) => {
  try {
    const { pasientId, behandlingsnotat, arbeidsdiagnose } = req.body;

    const pasient = await Pasient.findById(pasientId);
    if (!pasient) {
      return res.status(404).json({ error: "Pasient ikke funnet" });
    }

    const nyttNotat = new Arbeidsnotat({
      pasientId,
      terapeutId: pasient.terapeut, 
      behandlingsnotat,
      arbeidsdiagnose,
    });

    await nyttNotat.save();
    res.status(201).json(nyttNotat);
  } catch (err) {
    console.error("Feil ved oppretting av arbeidsnotat:", err);
    res.status(500).json({ error: "Kunne ikke opprette notat" });
  }
};

// Hent ALLE arbeidsnotater for en pasient
exports.hentArbeidsnotaterForPasient = async (req, res) => {
  try {
    const { pasientId } = req.params;

    const notater = await Arbeidsnotat.find({ pasientId })
      .populate("terapeutId", "navn")
      .sort({ createdAt: -1 }); // nyeste først

    res.json(notater);
  } catch (err) {
    console.error("Feil ved henting av arbeidsnotater:", err);
    res.status(500).json({ error: "Kunne ikke hente notater" });
  }
};

// Hent ETT spesifikt arbeidsnotat
exports.hentArbeidsnotat = async (req, res) => {
  try {
    const { notatId } = req.params;

    const notat = await Arbeidsnotat.findById(notatId)
      .populate("terapeutId", "navn");

    if (!notat) {
      return res.status(404).json({ error: "Notat ikke funnet" });
    }

    res.json(notat);
  } catch (err) {
    console.error("Feil ved henting av arbeidsnotat:", err);
    res.status(500).json({ error: "Kunne ikke hente notat" });
  }
};

// Slett et arbeidsnotat
exports.slettArbeidsnotat = async (req, res) => {
  try {
    const { notatId } = req.params;

    const notat = await Arbeidsnotat.findById(notatId);
    if (!notat) {
      return res.status(404).json({ error: "Notat ikke funnet" });
    }

    // Hvis du bruker authMiddleware og vil at kun eier (terapeut) kan slette
    if (notat.terapeutId?.toString() !== req.user.id) {
      return res.status(403).json({ error: "Ingen tilgang til å slette" });
    }

    await notat.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error("Feil ved sletting av arbeidsnotat:", err);
    res.status(500).json({ error: "Kunne ikke slette notat" });
  }
};
