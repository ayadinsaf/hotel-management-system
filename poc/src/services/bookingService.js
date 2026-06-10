const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createBooking({ roomId, guestId, checkIn, checkOut }) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    const error = new Error('checkOut must be after checkIn');
    error.status = 400;
    throw error;
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    const error = new Error('Room not found');
    error.status = 404;
    throw error;
  }

  const guest = await prisma.guest.findUnique({ where: { id: guestId } });
  if (!guest) {
    const error = new Error('Guest not found');
    error.status = 404;
    throw error;
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      status: { in: ['CONFIRMED', 'CHECKED_IN'] },
      AND: [
        { checkIn: { lt: checkOutDate } },
        { checkOut: { gt: checkInDate } },
      ],
    },
  });

  if (conflict) {
    const error = new Error('Room is not available for these dates');
    error.status = 409;
    throw error;
  }

  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );
  const totalAmount = nights * room.rate;

  const booking = await prisma.booking.create({
    data: {
      roomId,
      guestId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalAmount,
    },
    include: {
      room: { select: { number: true, type: true, rate: true } },
      guest: { select: { firstName: true, lastName: true, email: true } },
    },
  });

  return booking;
}

async function getActiveBookings() {
  const bookings = await prisma.booking.findMany({
    where: {
      status: { in: ['CONFIRMED', 'CHECKED_IN'] },
    },
    include: {
      room: { select: { number: true, type: true } },
      guest: { select: { firstName: true, lastName: true, email: true } },
    },
    orderBy: { checkIn: 'asc' },
  });
  return bookings;
}

async function cancelBooking(id) {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    const error = new Error('Booking not found');
    error.status = 404;
    throw error;
  }

  if (booking.status === 'CANCELLED' || booking.status === 'CHECKED_OUT') {
    const error = new Error(`Booking cannot be cancelled (status: ${booking.status})`);
    error.status = 400;
    throw error;
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: 'CANCELLED' },
    include: {
      room: { select: { number: true, type: true } },
      guest: { select: { firstName: true, lastName: true, email: true } },
    },
  });

  return updated;
}

module.exports = { createBooking, getActiveBookings, cancelBooking };