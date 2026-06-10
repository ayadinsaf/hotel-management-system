const express = require('express');
const { createRoomHandler } = require('../controllers/roomController');

const router = express.Router();

router.post('/', createRoomHandler);

module.exports = router;