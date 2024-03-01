import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '@server/app.module';
import { UserService } from '@server/user/user.service';
import { Roles } from '@shared/interfaces';

const prisma = new PrismaClient();

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  // setup roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });
  console.log(`Created new role: ${adminRole.name} (ID: ${adminRole.id})`);
  const userRole = await prisma.role.create({
    data: {
      name: 'User',
    },
  });
  console.log(`Created new role: ${userRole.name} (ID: ${userRole.id})`);

  // setup users
  const admin = await userService.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password',
    roles: [Roles.Admin],
  });
  console.log(`Created new user: ${admin.user.email} (ID: ${admin.user.id})`);
  const normalUser = await userService.create({
    firstName: 'Normal',
    lastName: 'User',
    email: 'user@example.com',
    password: 'password',
    roles: [Roles.User],
  });
  console.log(
    `Created new user: ${normalUser.user.email} (ID: ${normalUser.user.id})`,
  );

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
