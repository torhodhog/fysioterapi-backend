/*
  Route for managing patient data.
  This file defines API endpoints for creating, retrieving, updating, and deleting patients.
*/

const express = require("express");
const {
  createPatient,
  getPatientsForTherapist,
  getSinglePatient, // 👈
  updatePatient,
  deletePatient,
  leggTilSmerterate, 
} = require("../controllers/pasientController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mine", verifyToken, getPatientsForTherapist);
router.get("/:id", verifyToken, getSinglePatient); 
router.post("/", verifyToken, createPatient);
router.put("/:id", verifyToken, updatePatient);
router.delete("/:id", verifyToken, deletePatient);
router.post("/:id/smerterate", verifyToken, leggTilSmerterate);
router.post("/:id/smerte", verifyToken, leggTilSmerterate);


module.exports = router;
