import { Module, forwardRef } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserModule } from '@server/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
