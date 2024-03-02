import { Module, forwardRef } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { TrpcModule } from '@server/trpc/trpc.module';
import { AuthModule } from '../auth/auth.module';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => TrpcModule),
    PrismaModule,
    AuthModule,
    EmailModule,
  ],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
