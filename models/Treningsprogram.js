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

treningsprogramSchema.path("øvelser").validate({
  validator: function (øvelser) {
    return øvelser.every(øvelse => {
      const harRepetisjoner = typeof øvelse.repetisjoner === 'number';
      const harVarighet = typeof øvelse.varighet === 'number';

      return (harRepetisjoner || harVarighet) && !(harRepetisjoner && harVarighet);
    });
  },
  message: "En øvelse kan bare ha repetisjoner eller varighet, velg en av dem"
})

module.exports = mongoose.model('Treningsprogram', treningsprogramSchema);
