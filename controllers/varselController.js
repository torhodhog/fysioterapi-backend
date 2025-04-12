// controllers/varselController.js

const Varsel = require("../models/Varsel");

// Hent alle varsler for en terapeut
exports.hentVarsler = async (req, res) => {
  try {
    const varsler = await Varsel.find({ terapeutId: req.user.id })
      .populate("pasientId", "navn") // Hent pasientens navn
      .populate("terapeutId", "navn"); // Hent terapeutens navn

    res.json(varsler);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke hente varsler" });
  }
};

// Opprett nytt varsel
exports.lagVarsel = async (req, res) => {
  try {
    const { pasientId, melding } = req.body;

    const nyttVarsel = new Varsel({
      terapeutId: req.user.id,
      pasientId,
      melding,
    });

    await nyttVarsel.save();
    res.status(201).json(nyttVarsel);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke lage varsel" });
  }
};

// Merk som lest
exports.settSomLest = async (req, res) => {
  try {
    const varsel = await Varsel.findById(req.params.id);
    if (!varsel) return res.status(404).json({ error: "Varsel ikke funnet" });

    if (varsel.terapeutId.toString() !== req.user.id)
      return res.status(403).json({ error: "Ingen tilgang" });

    varsel.lest = true;
    await varsel.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke oppdatere varsel" });
  }
};
