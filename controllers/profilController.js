const Profil = require("../models/Profil");

// Opprett eller oppdater terapeutens profil
const createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, spesialisering, bilde } = req.body;

    let profil = await Profil.findOne({ brukerId: req.user.id });

    if (profil) {
      profil.bio = bio || profil.bio;
      profil.spesialisering = spesialisering || profil.spesialisering;
      profil.bilde = bilde || profil.bilde;
      await profil.save();
    } else {
      profil = new Profil({
        brukerId: req.user.id,
        bio,
        spesialisering,
        bilde,
      });
      await profil.save();
    }

    res.json(profil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hent terapeutens profil
const getProfile = async (req, res) => {
  try {
    const profil = await Profil.findOne({ brukerId: req.user.id });

    if (!profil) return res.status(404).json({ error: "Profil ikke funnet" });

    res.json(profil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrUpdateProfile, getProfile };
