const router = require('express').Router();
const { createGuestHandler } = require('../controllers/guestController');

router.post('/', createGuestHandler);

module.exports = router;