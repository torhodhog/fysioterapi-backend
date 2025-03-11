/*
  Model for user authentication.
  Defines the structure for storing users in MongoDB, including roles for access control.
*/

const mongoose = require('mongoose');

const brukerSchema = new mongoose.Schema({
  navn: { type: String, required: true },
  epost: { type: String, required: true, unique: true },
  passord: { type: String, required: true },
  rolle: { type: String, enum: ['pasient', 'terapeut'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bruker', brukerSchema);
