import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_SMTP_HOST'),
          port: configService.get<number>('MAIL_SMTP_PORT'),
          secure: configService.get<boolean>('MAIL_SMTP_SECURE'),
          auth: {
            user: configService.get<string>('MAIL_SMTP_USERNAME'),
            pass: configService.get<string>('MAIL_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_DEFAULT_FROM'),
          tls: { rejectUnauthorized: false },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [],
})
export class MailModule {}
