/*
  Route for handling patient reports sent to therapists.
  This file defines API endpoints for submitting and retrieving reports.
*/

const express = require('express');
const router = express.Router();
const { submitReport, getReportsForPatient } = require('../controllers/rapportController');

// Route to submit a new report
router.post('/', submitReport);

// Route to get all reports for a specific patient
router.get('/:pasientId', getReportsForPatient);

module.exports = router;
