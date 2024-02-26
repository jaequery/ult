import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TrpcModule } from './trpc/trpc.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV ?? 'development'}`,
      validationSchema: Joi.object({
        // server config
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),

        // auth config
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.string().default('365d'),

        // database config
        DB_URL: Joi.string().default(
          'postgresql://postgres:password@localhost:5432/postgres?schema=public',
        ),
      }),
    }),
    TrpcModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
