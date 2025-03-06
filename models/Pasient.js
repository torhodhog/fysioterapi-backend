/*
  Pasient model for managing patient data in the system.
  Defines the structure of patient data stored in MongoDB.
*/

const mongoose = require('mongoose');

const pasientSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  alder: { type: Number, required: true },
  diagnose: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pasient', pasientSchema);
