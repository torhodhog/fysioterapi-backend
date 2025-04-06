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
  getMyInfo,
  leggTilEgenSmerte,
  kobleBrukerTilPasient,
} = require("../controllers/pasientController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mine", verifyToken, getPatientsForTherapist);
router.get("/meg", verifyToken, getMyInfo); 
router.post("/meg/smerte", verifyToken, leggTilEgenSmerte);

router.get("/:id", verifyToken, getSinglePatient); 
router.post("/", verifyToken, createPatient);
router.put("/:id", verifyToken, updatePatient);
router.delete("/:id", verifyToken, deletePatient);
router.post("/:id/smerterate", verifyToken, leggTilSmerterate);
router.post("/:id/smerte", verifyToken, leggTilSmerterate);
router.post("/koble-bruker", verifyToken, kobleBrukerTilPasient);



module.exports = router;
