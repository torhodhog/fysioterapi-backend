/*
  Controller for user authentication.
  - Handles user registration and login.
  - Uses JWT for secure authentication.
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Bruker = require("../models/Bruker");

const registerUser = async (req, res) => {
  try {
    const { navn, epost, passord, rolle } = req.body;

    // Sjekk om bruker allerede finnes
    let bruker = await Bruker.findOne({ epost });
    if (bruker) return res.status(400).json({ error: "E-post allerede i bruk" });

    // Krypter passord
    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(passord, salt);

    // Lagre ny bruker
    bruker = new Bruker({ navn, epost, passord: hashedPassord, rolle });
    await bruker.save();

    res.status(201).json({ message: "Bruker opprettet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { epost, passord } = req.body;

    // Finn bruker
    const bruker = await Bruker.findOne({ epost });
    if (!bruker) return res.status(400).json({ error: "Ugyldig e-post eller passord" });

    // Sjekk passord
    const isMatch = await bcrypt.compare(passord, bruker.passord);
    if (!isMatch) return res.status(400).json({ error: "Ugyldig e-post eller passord" });

    // Lag JWT-token
    const token = jwt.sign({ id: bruker._id, rolle: bruker.rolle }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hent innlogget bruker
const getMe = async (req, res) => {
  try {
    const bruker = await Bruker.findById(req.user.id).select("-passord"); // Ekskluder passord fra responsen
    if (!bruker) {
      return res.status(404).json({ error: "Bruker ikke funnet" });
    }
    res.json(bruker);
  } catch (err) {
    res.status(500).json({ error: "Serverfeil" });
  }
};

module.exports = { registerUser, loginUser, getMe };
