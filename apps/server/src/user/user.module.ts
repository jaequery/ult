import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/trpc/trpc.module';
import { User } from './user.entity';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TrpcModule)],
  controllers: [],
  providers: [UserService, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
