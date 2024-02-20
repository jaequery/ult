import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/app.module';
import { UserService } from '@server/user/user.service';
import { differenceInSeconds } from 'date-fns';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { EntityManager } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';

dotenv.config();
const environment = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(process.cwd(), `.env.${environment}`);
dotenv.config({ path: envFilePath });

// Run this script using:
// npx ts-node -r tsconfig-paths/register ./scripts/db-seed.ts

(async () => {
  const start = new Date();
  const app = await NestFactory.create(AppModule);
  initializeTransactionalContext();
  const userService = app.get(UserService);

  try {
    const user = await userService.create({
      firstName: 'jae',
      lastName: 'lee',
      email: 'ho@ho.com',
      password: 'password',
    });
    console.log('created user', user);

    // benchmark
    const diff = differenceInSeconds(new Date(), start);
    console.log(`completed after ${diff} seconds`);
    process.exit(1); // abort with non-zero code
  } catch (error) {
    const diff = differenceInSeconds(new Date(), start);
    console.log(`error after ${diff} seconds`);
    console.log('error:', error);
    process.exit(1); // abort with non-zero code
  }
})();
