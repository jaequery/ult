import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleInternal } from '@nestjs/config';
import Joi from 'joi';
import { ConfigService } from './config.service';

export interface ConfigModuleOptions {
  environment: string;
}

@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      imports: [
        ConfigModuleInternal.forRoot({
          isGlobal: true,
          expandVariables: true,
          envFilePath: `./.env${
            process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
          }`,
          validationSchema: Joi.object({
            NODE_ENV: Joi.string()
              .valid('development', 'production', 'test', 'provision')
              .default('development'),
            // server config
            API_BASE_URL: Joi.string().default('http://localhost:3000'),

            // auth config
            JWT_SECRET: Joi.string(),
            JWT_EXPIRES_IN: Joi.string().default('365d'),

            // database config
            DATABASE_URL: Joi.string().default(
              'postgresql://postgres:password@localhost:5432/postgres?schema=public',
            ),

            // email config
            MAIL_SMTP_HOST: Joi.string().default('smtp-relay.brevo.com'),
            MAIL_SMTP_PORT: Joi.number().default(587),
            MAIL_SMTP_SECURE: Joi.boolean().default(true),
            MAIL_SMTP_USERNAME: Joi.string().default('user@gmail.com'),
            MAIL_SMTP_PASSWORD: Joi.string().default(''),
            MAIL_DEFAULT_FROM: Joi.string().default('user@gmail.com'),
          }),
        }),
      ],
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
