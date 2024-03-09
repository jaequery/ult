import { Module, forwardRef } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { TrpcModule } from '@server/trpc/trpc.module';
import { AuthModule } from '../auth/auth.module';
import { PostRouter } from './post.router';
import { PostService } from './post.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => TrpcModule),
    PrismaModule,
    AuthModule,
    EmailModule,
  ],
  providers: [PostService, PostRouter],
  exports: [PostService, PostRouter],
})
export class PostModule {}
