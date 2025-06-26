import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthJwt } from '@server/auth/auth.types';
import { PrismaService } from '@server/prisma/prisma.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
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

  async loginFromGoogle(req: any) {
    let user: User | null;
    if (req.user.email) {
      user = await this.prismaService.user.findFirst({
        where: {
          email: req.user.email,
        },
      });
      if (!user) {
        // assign a default User role
        let roleConnections: { id: number }[] = [];
        const role = await this.prismaService.role.findFirst({
          where: {
            name: 'User',
          },
        });
        if (role) {
          roleConnections = [{ id: role.id }];
        }

        user = await this.prismaService.user.create({
          data: {
            email: req.user.email,
            password: '',
            verifiedAt: new Date(),
            lastLoggedInAt: new Date(),
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            profilePicUrl: req.user.picture,
            authType: 'google',
            roles: {
              connect: roleConnections,
            },
          },
        });
      } else {
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLoggedInAt: new Date(),
            profilePicUrl: req.user.picture,
          },
        });
      }
      const jwt = this.getJwt(user);
      return { user, jwt };
    }
  }
}
