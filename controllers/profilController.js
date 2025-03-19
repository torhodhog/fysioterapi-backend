/*
  Controller for user profile management.
  - Allows therapists to upload a profile picture.
  - Stores images in Cloudinary and updates user profile.
*/

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Bruker = require("../models/Bruker");

// Konfigurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurer multer for å bruke Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profiler", // Mapper hvor bildene lagres i Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});

const upload = multer({ storage });

// 📌 API-endepunkt for bildeopplasting
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Ingen fil ble lastet opp" });
    }

    const bruker = await Bruker.findById(req.user.id);
    if (!bruker) {
      return res.status(404).json({ error: "Bruker ikke funnet" });
    }

    // Oppdater brukerens profil med bilde-URL fra Cloudinary
    bruker.bilde = req.file.path;
    await bruker.save();

    res.json({ message: "Bilde lastet opp", bildeUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { upload, uploadProfileImage };
