import { Injectable, BadGatewayException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserRegistrationEmail(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: this.configService.get('MAIL_DEFAULT_FROM'),
        subject: 'Your registration was successful',
        text: `Thank you for registering, click here to VERIFY your email address: ${this.configService.get(
          'API_BASE_URL',
        )}/users/verify?token=${user.id}`,
      });
    } catch (e) {
      console.log(e);
      throw new BadGatewayException('Email send failed');
    }
  }
}