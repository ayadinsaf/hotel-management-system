const router = require('express').Router();
const { createBookingHandler, getActiveBookingsHandler, cancelBookingHandler } = require('../controllers/bookingController');

router.post('/', createBookingHandler);
router.get('/', getActiveBookingsHandler);
router.patch('/:id/cancel', cancelBookingHandler);

module.exports = router;