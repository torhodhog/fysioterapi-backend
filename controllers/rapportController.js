/*
  Controller for handling report-related API requests.
  This file contains logic for creating and retrieving reports.
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

module.exports = { submitReport, getReportsForPatient };
