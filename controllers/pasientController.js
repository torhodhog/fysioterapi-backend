const Pasient = require("../models/Pasient");

// Opprette ny pasient (kun tilgjengelig for terapeuter)
const createPatient = async (req, res) => {
  try {
    const {
      navn,
      alder,
      kjønn,
      adresse,
      telefon,
      epost,
      diagnose,
      smerterate,
      fremgang,
      henvisendeLege,
      kommentar,
    } = req.body;

    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan opprette pasienter" });
    }

    const newPatient = new Pasient({
      navn,
      alder,
      kjønn,
      adresse,
      telefon,
      epost,
      diagnose,
      smerterate,
      fremgang,
      henvisendeLege,
      kommentar,
      terapeut: req.user.id,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hente alle pasientene for den innloggede terapeuten
const getPatientsForTherapist = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan hente pasienter" });
    }

    const pasienter = await Pasient.find({ terapeut: req.user.id });
    res.json(pasienter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hente én spesifikk pasient med ID
const getSinglePatient = async (req, res) => {
  try {
    const pasient = await Pasient.findOne({
      _id: req.params.id,
      terapeut: req.user.id,
    });

    if (!pasient) return res.status(404).json({ error: "Pasient ikke funnet" });
    res.json(pasient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Oppdatere en pasient
const updatePatient = async (req, res) => {
  try {
    const updated = await Pasient.findOneAndUpdate(
      { _id: req.params.id, terapeut: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Pasient ikke funnet" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Slette en pasient
const deletePatient = async (req, res) => {
  try {
    const deleted = await Pasient.findOneAndDelete({
      _id: req.params.id,
      terapeut: req.user.id,
    });

    if (!deleted) return res.status(404).json({ error: "Pasient ikke funnet" });

    res.json({ message: "Pasient slettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Legg til ny smerterate i historikk
const leggTilSmerterate = async (req, res) => {
  try {
    const { id } = req.params;
    const { verdi } = req.body;

    if (typeof verdi !== "number" || verdi < 0 || verdi > 10) {
      return res.status(400).json({ error: "Smerterate må være mellom 0 og 10" });
    }

    const pasient = await Pasient.findOneAndUpdate(
      { _id: id, terapeut: req.user.id },
      { $push: { smertehistorikk: { verdi } } },
      { new: true }
    );

    if (!pasient) return res.status(404).json({ error: "Pasient ikke funnet" });
    res.json(pasient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createPatient,
  getPatientsForTherapist,
  getSinglePatient,
  updatePatient, 
  deletePatient,
  leggTilSmerterate,
};