import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ConfigService } from '@server/config/config.service';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmationUrl = `${this.configService.get('WEB_HOST')}/verify-email?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Ult! Confirm your Email',
      template: './welcome',
      context: {
        firstName: user.firstName,
        confirmationUrl,
      },
    });
  }
}
