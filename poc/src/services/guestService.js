const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createGuest({ firstName, lastName, email, phone }) {
  const existing = await prisma.guest.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('A guest with this email already exists');
    error.status = 409;
    throw error;
  }

  const guest = await prisma.guest.create({
    data: { firstName, lastName, email, phone },
  });

  return guest;
}

module.exports = { createGuest };