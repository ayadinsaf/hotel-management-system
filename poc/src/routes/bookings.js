const router = require('express').Router();
const { createBookingHandler } = require('../controllers/bookingController');

router.post('/', createBookingHandler);

module.exports = router;