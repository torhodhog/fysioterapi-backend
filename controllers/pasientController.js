/*
  Controller for handling patient-related API requests.
  This file contains logic for creating, retrieving, updating, and deleting patient records.
*/

const Pasient = require("../models/Pasient");

// 🟢 Opprette ny pasient (kun tilgjengelig for terapeuter)
const createPatient = async (req, res) => {
  try {
    const { navn, alder, diagnose } = req.body;

    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan opprette pasienter" });
    }

    const newPatient = new Pasient({
      navn,
      alder,
      diagnose,
      terapeut: req.user.id, // 🔥 Knytter pasienten til terapeuten som oppretter den
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔵 Hente ALLE pasientene for den innloggede terapeuten
const getAllPatients = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan hente pasienter" });
    }

    const patients = await Pasient.find({ terapeut: req.user.id }); // 🔥 Henter kun pasienter tilknyttet terapeuten
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟡 Oppdatere en pasient (kun hvis terapeuten eier pasienten)
const updatePatient = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan oppdatere pasienter" });
    }

    const updatedPatient = await Pasient.findOneAndUpdate(
      { _id: req.params.id, terapeut: req.user.id }, // 🔥 Sikrer at terapeuten kun kan oppdatere egne pasienter
      req.body,
      { new: true }
    );

    if (!updatedPatient) return res.status(404).json({ error: "Pasient ikke funnet" });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔴 Slette en pasient (kun hvis terapeuten eier pasienten)
const deletePatient = async (req, res) => {
  try {
    if (req.user.rolle !== "terapeut") {
      return res.status(403).json({ error: "Kun terapeuter kan slette pasienter" });
    }

    const deletedPatient = await Pasient.findOneAndDelete({
      _id: req.params.id,
      terapeut: req.user.id, // 🔥 Sikrer at terapeuten kun kan slette egne pasienter
    });

    if (!deletedPatient) return res.status(404).json({ error: "Pasient ikke funnet" });
    res.json({ message: "Pasient slettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPatient, getAllPatients, updatePatient, deletePatient };
