/*
  Main server file for the backend API.
  - Connects to MongoDB Atlas.
  - Sets up Express with CORS and JSON support.
  - Defines the main API entry point.
  - Starts the server on the specified port.
*/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allow all domains (not recommended for production)
app.use(cors());

const pasientRuter = require('./ruter/pasientRuter');
app.use('/api/pasienter', pasientRuter);
const meldingRuter = require('./ruter/meldingRuter');
app.use('/api/meldinger', meldingRuter);
const rapportRuter = require('./ruter/rapportRuter');
app.use('/api/rapporter', rapportRuter);

// Koble til MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));