/*
  Middleware for verifying JWT authentication.
  - Ensures only authenticated users can access protected routes.
*/

const jwt = require("jsonwebtoken");
const Bruker = require("../models/Bruker");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Hent token fra cookie eller Authorization-header

  console.log("Token mottatt i middleware:", req.cookies.token);

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Lagre brukerinfo i req.user

    // Hent hele brukerobjektet og legg det til i req.user
    const bruker = await Bruker.findById(verified.id).select("-passord");
    if (!bruker) return res.status(404).json({ error: "Bruker ikke funnet" });

    req.user = bruker;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
