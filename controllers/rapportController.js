/*
  Controller for handling report-related API requests.
  This file contains logic for creating, retrieving, updating, and deleting reports.
*/

const Rapport = require('../models/Rapport');

// Submit a new report
const submitReport = async (req, res) => {
  try {
    const newReport = new Rapport(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve all reports for a specific patient
const getReportsForPatient = async (req, res) => {
  try {
    const reports = await Rapport.find({ pasientId: req.params.pasientId });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a report
const updateReport = async (req, res) => {
  try {
    const updatedReport = await Rapport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReport) return res.status(404).json({ error: "Report not found" });
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  try {
    const deletedReport = await Rapport.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ error: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitReport, getReportsForPatient, updateReport, deleteReport };
