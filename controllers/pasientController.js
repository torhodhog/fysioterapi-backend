// pasientController.js

const mongoose = require("mongoose");
const Pasient = require("../models/Pasient");
const Bruker = require("../models/Bruker");
const Rapport = require("../models/Rapport");
const Varsel = require("../models/Varsel"); 

// ✅ Opprette ny pasient (kun for terapeuter)
const createPatient = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan opprette pasienter" });
    }

    const {
      navn, alder, kjønn, adresse, telefon, epost,
      diagnose, smerterate, fremgang,
      henvisendeLege, kommentar, brukerId
    } = req.body;

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
      brukerId: brukerId ? new mongoose.Types.ObjectId(brukerId) : null,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Hente ALLE pasienter knyttet til innlogget terapeut
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

// ✅ Hente ÉN spesifikk pasient (kun for tilknyttet terapeut)
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

// ✅ Oppdatere pasient (kun for tilknyttet terapeut)
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

// ✅ Slette pasient (kun for tilknyttet terapeut)
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

// ✅ Legg til smerterate med ID (både pasient og terapeut kan gjøre det)
const leggTilSmerterate = async (req, res) => {
  try {
    const { id } = req.params;
    const { verdi } = req.body;

    if (typeof verdi !== "number" || verdi < 0 || verdi > 10) {
      return res.status(400).json({ error: "Smerterate må være mellom 0 og 10" });
    }

    const pasient = await Pasient.findById(id);
    if (!pasient) return res.status(404).json({ error: "Pasient ikke funnet" });

    const erTerapeut = req.user.rolle === "terapeut" && pasient.terapeut.toString() === req.user.id;
    const erPasient = req.user.rolle === "pasient" && pasient.brukerId?.toString() === req.user.id;

    if (!erTerapeut && !erPasient) {
      return res.status(403).json({ error: "Ingen tilgang til å oppdatere denne pasienten" });
    }

    pasient.smertehistorikk.push({ verdi, dato: new Date() });
    await pasient.save();

    res.json(pasient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Pasienten selv legger inn smerte (uten å vite ID)
// ✅ Pasienten selv legger inn smerte (uten å vite ID)
const leggTilEgenSmerte = async (req, res) => {
  try {
    if (req.user.rolle !== "pasient") {
      return res.status(403).json({ error: "Kun pasienter har tilgang" });
    }

    const pasient = await Pasient.findOne({ brukerId: req.user.id });
    if (!pasient) return res.status(404).json({ error: "Pasient ikke funnet" });

    const { verdi } = req.body;
    if (typeof verdi !== "number" || verdi < 0 || verdi > 10) {
      return res.status(400).json({ error: "Smerterate må være mellom 0 og 10" });
    }

    // 👉 Legg til ny smerte i historikken
    pasient.smertehistorikk.push({ verdi, dato: new Date() });
    await pasient.save();

    // 👉 Lag varsel for terapeut
    await Varsel.create({
      pasientId: pasient._id,
      melding: "Pasienten har registrert en ny smerterate.",
    });

    res.json({ message: "Smerterate lagt til", pasient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ Hent ALT om innlogget pasient (info, tilhørende pasientdata og rapporter)
const getMyInfo = async (req, res) => {
  try {
    if (req.user.rolle !== "pasient") {
      return res.status(403).json({ error: "Kun pasienter har tilgang til denne ruten" });
    }

    const bruker = await Bruker.findById(req.user.id).select("-passord");
    const pasient = await Pasient.findOne({ brukerId: req.user.id });
    const rapporter = pasient ? await Rapport.find({ pasientId: pasient._id }) : [];

    if (!bruker || !pasient) {
      return res.status(404).json({ error: "Pasientdata ikke funnet" });
    }

    res.json({ bruker, pasient, rapporter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const kobleBrukerTilPasient = async (req, res) => {
  try {
    if (req.user.rolle !== "pasient") {
      return res.status(403).json({ error: "Kun pasienter kan koble seg til en pasientprofil" });
    }

    const { epost } = req.body;

    const pasient = await Pasient.findOne({ epost });
    if (!pasient) {
      return res.status(404).json({ error: "Fant ingen pasient med den e-posten" });
    }

    pasient.brukerId = req.user.id; // Koble bruker til pasient
    await pasient.save();

    res.json({ message: "Bruker koblet til pasientprofil", pasient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Eksporter alle funksjoner
module.exports = {
  createPatient,
  getPatientsForTherapist,
  getSinglePatient,
  updatePatient,
  deletePatient,
  leggTilSmerterate,
  leggTilEgenSmerte,
  getMyInfo,
  kobleBrukerTilPasient,
};
