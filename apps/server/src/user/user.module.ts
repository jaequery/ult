import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/trpc/trpc.module';
import { User } from './user.entity';
import { UserRouter } from './user.router';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TrpcModule),
  ],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
