/*
  Controller for varsler.
  - Henter uleste varsler for terapeut
  - Oppretter nye varsler
  - Marker varsler som lest
*/

const Varsel = require("../models/Varsel");

// ✅ Hent alle uleste varsler for innlogget terapeut
exports.hentVarsler = async (req, res) => {
  try {
    const varsler = await Varsel.find({
      terapeutId: req.user.id,
      lest: false,
    })
      .populate("pasientId", "navn") // Bare hent pasientens navn
      .sort({ createdAt: -1 }); // Nyeste først

    res.json(varsler);
  } catch (err) {
    console.error("Feil ved henting av varsler:", err);
    res.status(500).json({ error: "Kunne ikke hente varsler" });
  }
};

// ✅ Opprett nytt varsel
exports.lagVarsel = async (req, res) => {
  try {
    const { pasientId, tekst, type } = req.body;

    if (!pasientId || !tekst || !type) {
      return res.status(400).json({ error: "Mangler pasientId, tekst eller type" });
    }

    const nyttVarsel = new Varsel({
      terapeutId: req.user.id,
      pasientId,
      tekst,
      type,
    });

    await nyttVarsel.save();
    res.status(201).json(nyttVarsel);
  } catch (err) {
    console.error("Feil ved oppretting av varsel:", err);
    res.status(500).json({ error: "Kunne ikke lage varsel" });
  }
};

// ✅ Marker et varsel som lest
exports.settSomLest = async (req, res) => {
  try {
    const varsel = await Varsel.findById(req.params.id);
    if (!varsel) {
      return res.status(404).json({ error: "Varsel ikke funnet" });
    }

    if (varsel.terapeutId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Ingen tilgang til dette varselet" });
    }

    varsel.lest = true;
    await varsel.save();

    res.json({ success: true, message: "Varsel markert som lest" });
  } catch (err) {
    console.error("Feil ved oppdatering av varsel:", err);
    res.status(500).json({ error: "Kunne ikke oppdatere varsel" });
  }
};
