/*
  Controller for handling patient-related API requests.
  This file contains logic for creating, retrieving, updating, and deleting patient records.
*/

const Pasient = require('../models/Pasient');

// Create a new patient
const createPatient = async (req, res) => {
  try {
    const newPatient = new Pasient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Pasient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPatient, getAllPatients };
