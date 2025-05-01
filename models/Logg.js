const mongoose = require("mongoose");

const loggSchema = new mongoose.Schema({
  pasientId: { type: mongoose.Schema.Types.ObjectId, ref: "Pasient", required: true },
  smerteVerdi: { type: Number, required: false }, 
  smerteVerdiTrening: { type: Number, required: false }, 
  trente: { type: Boolean, required: true },
  øktOpplevelse: { 
    type: String, 
    enum: ["Lett", "Passe", "Vanskelig"], 
    required: true 
  },
  notater: { type: String },
  dato: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Logg", loggSchema);
