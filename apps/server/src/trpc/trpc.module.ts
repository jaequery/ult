import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '@server/user/user.module';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

export const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [],
  providers: [
    TrpcService,
    TrpcRouter,
    {
      provide: 'package:superjson',
      useFactory: () => dynamicImport('superjson').then((p) => p.SuperJSON),
    },
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
