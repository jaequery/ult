import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRouter } from './user.router';
import { UserService } from './user.service';
import { TrpcModule } from '@server/trpc/trpc.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TrpcModule)],
  controllers: [UserController],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
