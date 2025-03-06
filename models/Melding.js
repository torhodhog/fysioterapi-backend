/*
  Model for messages between therapist and patient.
  Defines the structure of message data stored in MongoDB.
*/

const mongoose = require('mongoose');

const meldingSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // "therapist" or "patient"
  mottakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pasient', required: true }, // The recipient of the message
  innhold: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now } // When the message was sent
});

module.exports = mongoose.model('Melding', meldingSchema);
