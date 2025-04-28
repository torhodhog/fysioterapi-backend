/*
  Route for handling messages between therapist and patient.
  This file defines API endpoints for sending, retrieving, and deleting messages.
*/

const express = require('express');
const router = express.Router();
const { sendMessage, sendMessageFromTherapist, getMessagesForRecipient, deleteMessage } = require('../controllers/meldingController');


// Route to send a new message
router.post('/', sendMessage);

router.post('/terapeut', sendMessageFromTherapist);

// Route to get all messages for a specific recipient
router.get('/:mottakerId', getMessagesForRecipient);

// Route to delete a message
router.delete('/:id', deleteMessage);

module.exports = router;
