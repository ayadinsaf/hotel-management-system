const { createBooking, getActiveBookings } = require('../services/bookingService');

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

async function getActiveBookingsHandler(req, res) {
  try {
    const bookings = await getActiveBookings();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { createBookingHandler, getActiveBookingsHandler };