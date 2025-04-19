/*
  Route for handling patient reports sent to therapists.
  This file defines API endpoints for submitting, retrieving, updating, and deleting reports.
*/

const express = require('express');
const router = express.Router();
const { submitReport, getReportsForPatient, updateReport, deleteReport } = require('../controllers/rapportController');

// Route to submit a new report
router.post('/', submitReport);

// Route to get all reports for a specific patient
router.get('/:pasientId', getReportsForPatient);

// Route to update a report
router.put('/:id', updateReport);

// Route to delete a report
router.delete('/:id', deleteReport);


router.get('/rapport/:id', async (req, res) => {
  const Rapport = require('../models/Rapport');
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) {
      return res.status(404).json({ error: 'Rapport ikke funnet' });
    }
    res.json(rapport);
  } catch (err) {
    console.error('Feil ved henting av rapport:', err);
    res.status(500).json({ error: 'Kunne ikke hente rapport' });
  }
});


module.exports = router;
