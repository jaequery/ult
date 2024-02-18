import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
