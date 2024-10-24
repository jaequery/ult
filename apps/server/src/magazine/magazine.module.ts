import { Module } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { OpenaiModule } from '@server/openai/openai.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { MagazineRouter } from './magazine.router';
import { MagazineService } from './magazine.service';

@Module({
  imports: [AuthModule, PrismaModule, EmailModule, OpenaiModule],
  providers: [MagazineService, MagazineRouter],
  exports: [MagazineService, MagazineRouter],
})
export class MagazineModule {}
