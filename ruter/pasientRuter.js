/*
  Route for managing patient data.
  This file defines API endpoints for creating, retrieving, updating, and deleting patients.
*/

const express = require("express");
const { createPatient, getPatientsForTherapist, updatePatient, deletePatient } = require("../controllers/pasientController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Rute for å hente pasientene som tilhører innlogget terapeut
router.get("/mine", verifyToken, getPatientsForTherapist);

// Opprette en ny pasient
router.post("/", verifyToken, createPatient);

// Oppdatere en pasient
router.put("/:id", verifyToken, updatePatient);

// Slette en pasient
router.delete("/:id", verifyToken, deletePatient);

module.exports = router;
