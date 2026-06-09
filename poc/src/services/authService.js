const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const login = async (email, password) => {
  const staff = await prisma.staff.findUnique({
    where: { email }
  });

  if (!staff) {
    throw { status: 401, message: 'Invalid credentials', code: 'UNAUTHORIZED' };
  }

  const validPassword = await bcrypt.compare(password, staff.password);

  if (!validPassword) {
    throw { status: 401, message: 'Invalid credentials', code: 'UNAUTHORIZED' };
  }

  const token = jwt.sign(
    {
      id: staff.id,
      email: staff.email,
      role: staff.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    staff: {
      id: staff.id,
      email: staff.email,
      firstName: staff.firstName,
      lastName: staff.lastName,
      role: staff.role
    }
  };
};

module.exports = { login };