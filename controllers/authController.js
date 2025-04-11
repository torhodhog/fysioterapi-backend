/*
  Controller for user authentication.
  - Handles user registration and login.
  - Uses JWT for secure authentication.
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Bruker = require("../models/Bruker");

// Registrer ny bruker
const registerUser = async (req, res) => {
  try {
    const { navn, epost, passord, rolle } = req.body;

    // Sjekk om e-post allerede er i bruk
    let bruker = await Bruker.findOne({ epost });
    if (bruker) return res.status(400).json({ error: "E-post allerede i bruk" });

    // Krypter passord
    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(passord, salt);

    // Sett rolle automatisk: hvis ikke terapeut → pasient
    const brukerRolle = rolle === "terapeut" ? "terapeut" : "pasient";

    // Opprett ny bruker
    bruker = new Bruker({ navn, epost, passord: hashedPassord, rolle: brukerRolle });
    await bruker.save();

    res.status(201).json({ message: "Bruker opprettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logg inn bruker
const loginUser = async (req, res) => {
  try {
    const { epost, passord } = req.body;

    // Finn bruker i databasen
    const bruker = await Bruker.findOne({ epost });
    if (!bruker) return res.status(400).json({ error: "Ugyldig e-post eller passord" });

    // Sjekk passord
    const isMatch = await bcrypt.compare(passord, bruker.passord);
    if (!isMatch) return res.status(400).json({ error: "Ugyldig e-post eller passord" });

    // Generer JWT-token
    const token = jwt.sign(
      { id: bruker._id, rolle: bruker.rolle },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Sett token som en HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Bruk secure flagg i produksjon
      sameSite: "none", // Tillat cross-site cookies
      maxAge: 3600000, // 1 time
    });
    console.log("Cookie satt med token:", token);

    res.status(200).json({ message: "Innlogging vellykket" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hent innlogget bruker
const getMe = async (req, res) => {
  try {
    const bruker = await Bruker.findById(req.user.id).select("-passord"); // Ekskluder passord
    if (!bruker) {
      return res.status(404).json({ error: "Bruker ikke funnet" });
    }
    res.json(bruker);
  } catch (err) {
    res.status(500).json({ error: "Serverfeil" });
  }
};

module.exports = { registerUser, loginUser, getMe };
