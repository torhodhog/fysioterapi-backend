const mongoose = require("mongoose");

const pasientSchema = new mongoose.Schema(
  {
    navn: { type: String, required: true },
    alder: { type: Number, required: true },
    kjønn: { type: String, enum: ["Mann", "Kvinne", "Annet"], default: "Annet" },
    adresse: { type: String },
    telefon: { type: String },
    epost: { type: String },

    diagnose: { type: String, required: true },
    smerterate: { type: Number, min: 0, max: 10 },
    fremgang: { type: String },
    henvisendeLege: { type: String },
    kommentar: { type: String },

    terapeut: { type: mongoose.Schema.Types.ObjectId, ref: "Bruker", required: true },

    // 🔥 Historikk for smerterate over tid
    smertehistorikk: [
      {
        verdi: { type: Number, required: true },
        dato: { type: Date, default: Date.now },
      }
    ],

    // Gjør brukerId valgfritt for oppretting
    brukerId: { type: mongoose.Schema.Types.ObjectId, ref: "Bruker", required: false },  // ENDRET TIL false
  },
  { timestamps: true }
);


module.exports = mongoose.model("Pasient", pasientSchema);
