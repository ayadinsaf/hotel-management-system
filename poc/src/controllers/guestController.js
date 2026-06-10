const { createGuest } = require('../services/guestService');

async function createGuestHandler(req, res) {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'firstName, lastName and email are required' });
  }

  try {
    const guest = await createGuest({ firstName, lastName, email, phone });
    return res.status(201).json(guest);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
}

module.exports = { createGuestHandler };