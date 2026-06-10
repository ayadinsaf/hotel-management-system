const { createRoom } = require('../services/roomService');

async function createRoomHandler(req, res) {
  try {
    const { number, type, capacity, rate } = req.body;

    const room = await createRoom({ number, type, capacity, rate });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createRoomHandler };