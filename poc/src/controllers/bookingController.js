const { createBooking } = require('../services/bookingService');

async function createBookingHandler(req, res) {
  const { roomId, guestId, checkIn, checkOut } = req.body;

  if (!roomId || !guestId || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'roomId, guestId, checkIn and checkOut are required' });
  }

  try {
    const booking = await createBooking({ roomId, guestId, checkIn, checkOut });
    return res.status(201).json(booking);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
}

module.exports = { createBookingHandler };