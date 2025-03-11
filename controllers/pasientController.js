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

// Update a patient
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Pasient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ error: "Patient not found" });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Pasient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ error: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPatient, getAllPatients, updatePatient, deletePatient };
