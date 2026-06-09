const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const manager = await prisma.staff.upsert({
    where: { email: 'manager@hotel.com' },
    update: {},
    create: {
      email: 'manager@hotel.com',
      password,
      firstName: 'Alice',
      lastName: 'Martin',
      role: 'MANAGER'
    }
  });

  const receptionist = await prisma.staff.upsert({
    where: { email: 'reception@hotel.com' },
    update: {},
    create: {
      email: 'reception@hotel.com',
      password,
      firstName: 'Bob',
      lastName: 'Dupont',
      role: 'RECEPTIONIST'
    }
  });

  console.log('Seeded:', manager.email, receptionist.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
