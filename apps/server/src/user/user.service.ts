import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@server/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDtoType, UserLoginDtoType } from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(userLoginDto: UserLoginDtoType) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userLoginDto.email,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid email address');
    }

    // check password
    const isMatch = await bcrypt.compare(userLoginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid login information');
    }

    // retrieve JWT
    const expiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') || '365d';
    const payload = {
      username: user.email,
      sub: user.id,
      expiresIn,
    };
    const accessToken = this.jwtService.sign(payload);

    // return login response
    return {
      jwt: {
        accessToken,
        expiresIn,
      },
      user,
    };
  }

  async create(userCreateDto: UserCreateDtoType) {
    if (userCreateDto.password) {
      userCreateDto.password = await this.encryptPassword(
        userCreateDto.password,
      );
    }
    userCreateDto.email = userCreateDto.email.toLowerCase();
    try {
      const user = await this.prismaService.user.create({
        data: userCreateDto,
      });
      const accessToken = await this.generateAccessToken(user);
      const expiresIn = this.configService.get('JWT_EXPIRES_IN');
      return { user, jwt: { accessToken, expiresIn } };
    } catch (error: any) {
      if (error.constraint === 'user__email__uq') {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async remove(id: number) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private async encryptPassword(password: string) {
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

  async findByAccessToken(accessToken: string) {
    try {
      // Verify the JWT token and decode its payload
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Use the decoded.sub as the user's identifier to fetch the user
      const user = await this.prismaService.user.findUnique({
        where: {
          id: decoded.sub,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      // Handle error (e.g., token is invalid or expired)
      // For simplicity, you might just rethrow the error or handle it based on your application's needs
      throw error;
    }
  }

  async generateAccessToken(user: User) {
    const expiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') || '365d';
    const payload = {
      username: user.email,
      sub: user.id,
      expiresIn,
    };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
