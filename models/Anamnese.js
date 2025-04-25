// models/Anamnese.js

const mongoose = require("mongoose");

const AnamneseSchema = new mongoose.Schema(
  {
    pasientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pasient",
      required: true,
    },
    terapeutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bruker",
      required: true,
    },
    hovedproblem: String,
    sykehistorie: String,
    smertebeskrivelse: String,
    funksjon: String,
    medisiner: String,
    psykososialt: String,
    målsetting: String,
    forventninger: String,
    annet: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anamnese", AnamneseSchema);