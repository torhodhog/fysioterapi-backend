// models/Logg.js
const mongoose = require("mongoose");

const loggSchema = new mongoose.Schema({
   pasientId: { type: mongoose.Schema.Types.ObjectId, ref: "Pasient", required: true },
   smerteVerdi: { type: Number, required: true },
   øktOpplevelse: { 
     type: String, 
     enum: ["Lett", "Passe", "Vanskelig", "Bra trening", "Sliten", "Andet"], // Legg til verdier her om nødvendig
     required: true 
   },
   notater: { type: String },
   dato: { type: Date, default: Date.now }
 });
 

module.exports = mongoose.model("Logg", loggSchema);
