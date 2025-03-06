/*
  Route for handling messages between therapist and patient.
  This file defines API endpoints for sending and retrieving messages.
*/

const express = require('express');
const router = express.Router();
const { sendMessage, getMessagesForRecipient } = require('../controllers/meldingController');

// Route to send a new message
router.post('/', sendMessage);

// Route to get all messages for a specific recipient
router.get('/:mottakerId', getMessagesForRecipient);

module.exports = router;
