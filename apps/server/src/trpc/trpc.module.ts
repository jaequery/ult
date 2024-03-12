import { Global, Module } from '@nestjs/common';
import { PostModule } from '@server/post/post.module';
import { RoleModule } from '@server/role/role.module';
import { UserModule } from '@server/user/user.module';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

@Global()
@Module({
  imports: [UserModule, PostModule, RoleModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
