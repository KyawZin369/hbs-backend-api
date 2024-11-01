const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Create hashed passwords
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  };

  // Data for Admin users
  const adminUsers = [
    {
      username: 'admin1',
      email: 'admin1@example.com',
      password: await hashPassword('adminPassword1'),
      role: 'ADMIN',
    },
    {
      username: 'admin2',
      email: 'admin2@example.com',
      password: await hashPassword('adminPassword2'),
      role: 'ADMIN',
    },
    {
      username: 'admin3',
      email: 'admin3@example.com',
      password: await hashPassword('adminPassword3'),
      role: 'ADMIN',
    },
  ];

  // Data for Regular users
  const regularUsers = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: await hashPassword('userPassword1'),
      role: 'USER',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: await hashPassword('userPassword2'),
      role: 'USER',
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      password: await hashPassword('userPassword3'),
      role: 'USER',
    },
    {
      username: 'user4',
      email: 'user4@example.com',
      password: await hashPassword('userPassword4'),
      role: 'USER',
    },
    {
      username: 'user5',
      email: 'user5@example.com',
      password: await hashPassword('userPassword5'),
      role: 'USER',
    },
  ];

  // Insert Admin users into the database
  for (const admin of adminUsers) {
    await prisma.user.create({ data: admin });
  }

  // Insert Regular users into the database
  for (const user of regularUsers) {
    await prisma.user.create({ data: user });
  }

  console.log('Seed data for users has been added to the database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
