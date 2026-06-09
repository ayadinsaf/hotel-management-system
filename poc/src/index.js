require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/rooms', require('./routes/rooms'));
app.use('/api/v1/guests', require('./routes/guests'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/dashboard', require('./routes/dashboard'));

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;