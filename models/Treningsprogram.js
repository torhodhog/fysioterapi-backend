// models/Treningsprogram.js

const mongoose = require('mongoose');

const treningsprogramSchema = new mongoose.Schema({
  pasientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasient", // Koble til pasient
    required: true
  },
  øvelser: [
    {
      øvelse: { type: String, required: true },
      repetisjoner: { type: Number, required: true },
      sett: { type: Number, required: true },
      pause: { type: Number, required: true },
      varighet: { type: Number, required: true },
      illustrasjon: { type: String },
      utstyr: { type: String },
      kommentarer: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Treningsprogram', treningsprogramSchema);
