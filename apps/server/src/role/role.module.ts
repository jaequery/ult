import { Module } from '@nestjs/common';
import { EmailModule } from '@server/email/email.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { RoleRouter } from './role.router';
import { RoleService } from './role.service';

@Module({
  imports: [AuthModule, PrismaModule, EmailModule],
  providers: [RoleService, RoleRouter],
  exports: [RoleService, RoleRouter],
})
export class RoleModule {}
