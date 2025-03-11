/*
  Route for handling patient reports sent to therapists.
  This file defines API endpoints for submitting, retrieving, updating, and deleting reports.
*/

const express = require('express');
const router = express.Router();
const { submitReport, getReportsForPatient, updateReport, deleteReport } = require('../controllers/rapportController');

// Route to submit a new report
router.post('/', submitReport);

// Route to get all reports for a specific patient
router.get('/:pasientId', getReportsForPatient);

// Route to update a report
router.put('/:id', updateReport);

// Route to delete a report
router.delete('/:id', deleteReport);

module.exports = router;
