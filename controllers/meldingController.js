/*
  Controller for handling message-related API requests.
  This file contains logic for sending, retrieving, and deleting messages.
*/

const Melding = require('../models/Melding');

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const newMessage = new Melding(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve all messages for a specific recipient
const getMessagesForRecipient = async (req, res) => {
  try {
    const messages = await Melding.find({ mottaker: req.params.mottakerId });
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

