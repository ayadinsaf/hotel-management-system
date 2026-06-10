const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getDashboardSummary() {
  const activeBookings = await prisma.booking.count({
    where: {
      status: { in: ['CONFIRMED', 'CHECKED_IN'] },
    },
  });

  const availableRooms = await prisma.room.count({
    where: {
      status: 'AVAILABLE',
    },
  });

  return { activeBookings, availableRooms };
}

module.exports = { getDashboardSummary };