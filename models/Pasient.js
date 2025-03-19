/*
  Model for patient data.
  Defines the structure for storing patient information in MongoDB.
*/

const mongoose = require("mongoose");

const pasientSchema = new mongoose.Schema(
  {
    navn: { type: String, required: true },
    alder: { type: Number, required: true },
    diagnose: { type: String, required: true },
    terapeut: { type: mongoose.Schema.Types.ObjectId, ref: "Bruker", required: true }, //  Knytter pasient til en terapeut
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pasient", pasientSchema);
