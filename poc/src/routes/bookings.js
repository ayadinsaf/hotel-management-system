const router = require('express').Router();
const { createBookingHandler, getActiveBookingsHandler } = require('../controllers/bookingController');

router.post('/', createBookingHandler);
router.get('/', getActiveBookingsHandler);

module.exports = router;