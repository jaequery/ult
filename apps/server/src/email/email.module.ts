// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@server/config/config.service';
import { join } from 'path';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_SMTP_HOST'),
          port: configService.get('MAIL_SMTP_PORT'),
          secure: configService.get('MAIL_SMTP_SECURE'),
          auth: {
            user: configService.get('MAIL_SMTP_USERNAME'),
            pass: configService.get('MAIL_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `${configService.get('MAIL_DEFAULT_FROM')}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService, ConfigService],
  exports: [EmailService, ConfigService],
})
export class EmailModule {}
