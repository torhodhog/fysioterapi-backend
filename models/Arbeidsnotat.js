// models/Arbeidsnotat.js

const mongoose = require("mongoose");

const arbeidsnotatSchema = new mongoose.Schema(
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
    behandlingsnotat: {
      type: String,
      required: true,
    },
    aiForslag: {
      type: String,
      required: false,
    },
    arbeidsdiagnose: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Arbeidsnotat", arbeidsnotatSchema);
