import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthJwt } from '@server/auth/auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, encryptedPassword: string) {
    return bcrypt.compare(password, encryptedPassword);
  }

  async encryptPassword(password: string) {
    const rounds = 10;
    let encryptedPassword;
    // do not hash again if already hashed
    if (password.indexOf('$2a$') === 0 && password.length === 60) {
      encryptedPassword = password;
    } else {
      encryptedPassword = await bcrypt.hash(password, rounds);
    }
    return encryptedPassword;
  }

  getJwt(user: User): AuthJwt {
    const expiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') || '365d';
    const payload = {
      username: user.email,
      sub: user.id,
      expiresIn,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, expiresIn };
  }

  async decodeJwtToken(accessToken: string) {
    return this.jwtService.verifyAsync(accessToken, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
