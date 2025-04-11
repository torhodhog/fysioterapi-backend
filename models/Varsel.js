const mongoose = require("mongoose");

const varselSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["melding", "smerte", "rapport", "logg"], // La til "logg" som en gyldig verdi
      required: true,
    },
    tekst: {
      type: String,
      required: true,
    },
    lest: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Varsel", varselSchema);
