import { Module } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryRouter } from './category.router';
import { CategoryService } from './category.service';

@Module({
  imports: [AuthModule, PrismaModule, EmailModule],
  providers: [CategoryService, CategoryRouter],
  exports: [CategoryService, CategoryRouter],
})
export class CategoryModule {}
