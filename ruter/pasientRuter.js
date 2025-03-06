/*
  Route for managing patient data.
  This file defines API endpoints for creating and retrieving patients.
*/

const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/pasientController');

// Route to create a new patient
router.post('/', createPatient);

// Route to get all patients
router.get('/', getAllPatients);

module.exports = router;
