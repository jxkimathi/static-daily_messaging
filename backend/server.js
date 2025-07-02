require('dotenv').config();
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Start server immediately
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Handle application termination
process.on('SIGINT', () => {
  console.log('Application terminating');
  process.exit(0);
});
