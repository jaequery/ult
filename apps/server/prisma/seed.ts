import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example: Creating a new user
  const newUser = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Jo',
      email: 'alice@example.com',
      password: 'password',
      // Add other fields as required
    },
  });
  console.log(`Created new user: ${newUser.email} (ID: ${newUser.id})`);

  // Add more seeding logic as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
