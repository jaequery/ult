import { Global, Module } from '@nestjs/common';
import { PostModule } from '@server/post/post.module';
import { RoleModule } from '@server/role/role.module';
import { UploadModule } from '@server/upload/upload.module';
import { UserModule } from '@server/user/user.module';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { CategoryModule } from '@server/category/category.module';

@Global()
@Module({
  imports: [UserModule, PostModule, RoleModule, CategoryModule, UploadModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
