import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OpenaiModule } from './openai/openai.module';
import { PrismaService } from './prisma/prisma.service';
import { TrpcModule } from './trpc/trpc.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    OpenaiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV ?? 'development'}`,
      validationSchema: Joi.object({
        // DO NOT update these directly, update them from the .env.x files,
        // server config
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        API_HOST: Joi.string(),
        APP_HOST: Joi.string(),

        // auth config
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.string().default('365d'),

        // database config
        DB_URL: Joi.string().default(
          'postgresql://postgres:password@localhost:5432/postgres?schema=public',
        ),

        // mailer config
        MAIL_SMTP_HOST: Joi.string().default('smtp-relay.brevo.com'),
        MAIL_SMTP_PORT: Joi.number().default(587),
        MAIL_SMTP_SECURE: Joi.boolean().default(true),
        MAIL_SMTP_USERNAME: Joi.string().default('user@gmail.com'),
        MAIL_SMTP_PASSWORD: Joi.string().default('password'),
        MAIL_DEFAULT_FROM: Joi.string().default('user@gmail.com'),

        // Google SSO config
        GOOGLE_CLIENT_ID: Joi.string(),
        GOOGLE_CLIENT_SECRET: Joi.string(),
        GOOGLE_CALLBACK_URL: Joi.string(),

        // OpenAI config
        OPENAI_API_KEY: Joi.string(),

        // Pinecone config
        PINECONE_API_KEY: Joi.string(),

        // AWS S3 config
        AWS_REGION: Joi.string().default('us-east-1'),
        AWS_S3_BUCKET: Joi.string().default('ult-uploads'),
        AWS_ACCESS_KEY_ID: Joi.string().optional(),
        AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
      }),
    }),
    TrpcModule,
    UserModule,
    AuthModule,
    OpenaiModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
