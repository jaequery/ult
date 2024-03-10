import { Module } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, PrismaModule, AuthModule, EmailModule],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
