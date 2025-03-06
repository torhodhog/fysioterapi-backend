/*
  Model for patient reports sent to the therapist.
  Defines the structure of report data stored in MongoDB.
*/

const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  pasientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pasient', required: true }, // The patient sending the report
  innhold: { type: String, required: true }, // Report content
  dato: { type: Date, default: Date.now } // When the report was sent
});

module.exports = mongoose.model('Rapport', rapportSchema);
