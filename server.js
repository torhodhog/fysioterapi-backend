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
app.use(cors());

const verifyToken = require("./middleware/authMiddleware");

// Import routes
const authRuter = require('./ruter/authRuter');
const pasientRuter = require('./ruter/pasientRuter');
const meldingRuter = require('./ruter/meldingRuter');
const rapportRuter = require('./ruter/rapportRuter');

app.use('/api/auth', authRuter);
app.use('/api/pasienter', verifyToken, pasientRuter);
app.use('/api/meldinger', verifyToken, meldingRuter);
app.use('/api/rapporter', verifyToken, rapportRuter);

// Koble til MongoDB
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
