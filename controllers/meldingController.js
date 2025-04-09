/*
  Controller for handling message-related API requests.
  This file contains logic for sending, retrieving, and deleting messages.
*/

const Melding = require("../models/Melding");
const Varsel = require("../models/Varsel"); // 👈 importert
const Pasient = require("../models/Pasient");



const sendMessage = async (req, res) => {
  try {
    const { innhold } = req.body;

    // Finn pasienten basert på innlogget bruker
    const pasient = await Pasient.findOne({ brukerId: req.user.id });

    if (!pasient || !pasient.terapeut) {
      return res
        .status(404)
        .json({ error: "Fant ikke tilknyttet terapeut for pasienten" });
    }

    const newMessage = new Melding({
      sender: req.user.rolle,
      mottakerId: pasient._id, 
      innhold,
    });
    
    await newMessage.save();

    // 🔔 Lag et varsel til terapeuten
    await Varsel.create({
      terapeutId: pasient.terapeut,
      pasientId: pasient._id,
      type: "melding",
      tekst: `Ny melding fra pasient ${pasient.navn}`,
    });
    

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Retrieve all messages for a specific recipient
const getMessagesForRecipient = async (req, res) => {
  try {
    const messages = await Melding.find({ mottakerId: req.params.mottakerId }).populate("mottakerId");


    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Melding.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ error: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendMessage, getMessagesForRecipient, deleteMessage };
