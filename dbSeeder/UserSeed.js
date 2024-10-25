const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const userData = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'USA',
      password: bcrypt.hashSync('password1', 10),
      phoneNumber: '1234567890',
      address: '123 Main St, Springfield',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      country: 'UK',
      password: bcrypt.hashSync('password2', 10),
      phoneNumber: '0987654321',
      address: '456 Park Ave, London',
    },
  ];

  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .then(() => {
    console.log('Seeding successful!');
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    return prisma.$disconnect();
  });
