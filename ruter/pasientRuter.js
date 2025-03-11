/*
  Route for managing patient data.
  This file defines API endpoints for creating, retrieving, updating, and deleting patients.
*/

const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients, updatePatient, deletePatient } = require('../controllers/pasientController');

// Route to create a new patient
router.post('/', createPatient);

// Route to get all patients
router.get('/', getAllPatients);

// Route to update a patient
router.put('/:id', updatePatient);

// Route to delete a patient
router.delete('/:id', deletePatient);

module.exports = router;
