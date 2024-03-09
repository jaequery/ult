import { Module, forwardRef } from '@nestjs/common';
import { PostModule } from '@server/post/post.module';
import { UserModule } from '@server/user/user.module';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

@Module({
  imports: [forwardRef(() => UserModule), PostModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
