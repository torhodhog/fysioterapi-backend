// ruter/anamneseRuter.js

const express = require("express");
const router = express.Router();


const {
   opprettAnamnese,
   hentAnamneser, 
   oppdaterAnamnese,
   slettAnamnese,
 } = require("../controllers/anamneseController");
 


router.post("/", opprettAnamnese);
router.get("/:pasientId", hentAnamneser); 
router.delete("/:id", slettAnamnese);
router.put("/:pasientId", oppdaterAnamnese);


module.exports = router;
