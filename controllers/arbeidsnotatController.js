const Arbeidsnotat = require("../models/Arbeidsnotat");
const Pasient = require("../models/Pasient");

// Opprett nytt arbeidsnotat
exports.opprettArbeidsnotat = async (req, res) => {
  try {
    const { pasientId, innhold, arbeidsdiagnose } = req.body;
    const pasient = await Pasient.findById(pasientId);

    const nyttNotat = new Arbeidsnotat({
      pasientId,
      terapeutId: pasient.terapeut,
      behandlingsnotat: innhold,
      arbeidsdiagnose,
      aiForslag: diagnose, 
    });
    

    await nyttNotat.save();
    res.status(201).json(nyttNotat);
  } catch (err) {
    console.error("Feil ved oppretting av arbeidsnotat:", err);
    res.status(500).json({ error: "Kunne ikke opprette notat" });
  }
};

// Hent alle arbeidsnotater for en pasient
exports.hentArbeidsnotat = async (req, res) => {
  try {
    const pasientId = req.params.pasientId;

    const notater = await Arbeidsnotat.find({ pasientId })
      .populate("terapeutId", "navn")
      .sort({ opprettet: -1 });

    res.json(notater);
  } catch (err) {
    console.error("Feil ved henting av arbeidsnotater:", err);
    res.status(500).json({ error: "Kunne ikke hente notater" });
  }
};

// Slett et arbeidsnotat
exports.slettArbeidsnotat = async (req, res) => {
  try {
    const notat = await Arbeidsnotat.findById(req.params.id);
    if (!notat) return res.status(404).json({ error: "Notat ikke funnet" });

    if (notat.terapeutId.toString() !== req.user.id)
      return res.status(403).json({ error: "Ingen tilgang" });

    await notat.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error("Feil ved sletting av arbeidsnotat:", err);
    res.status(500).json({ error: "Kunne ikke slette notat" });
  }
};
