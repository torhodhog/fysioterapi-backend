/*
  Model for patient data.
  Defines the structure for storing patient information in MongoDB.
*/

const mongoose = require('mongoose');

const pasientSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  alder: { type: Number, required: true },
  diagnose: { type: String, required: true },
  brukerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bruker' } // Tied to a user
}, { timestamps: true });

module.exports = mongoose.model('Pasient', pasientSchema);
