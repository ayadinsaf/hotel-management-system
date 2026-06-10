const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createRoom(data) {
  const room = await prisma.room.create({
    data: {
      number: data.number,
      type:     data.type,
      capacity: data.capacity,
      rate:     data.rate,
    },
  });
  return room;
}

module.exports = { createRoom };