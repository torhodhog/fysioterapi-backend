const mongoose = require("mongoose");

const profilSchema = new mongoose.Schema(
  {
    brukerId: { type: mongoose.Schema.Types.ObjectId, ref: "Bruker", required: true },
    bilde: { type: String, default: "" }, // URL til profilbildet (Cloudinary)
    bio: { type: String, default: "" },
    spesialisering: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profil", profilSchema);
