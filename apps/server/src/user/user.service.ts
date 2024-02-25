import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { UserCreateDtoType, UserLoginDtoType } from './dto/user.dto';

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
    const expiryDays = this.configService.get<number>('JWT_EXPIRY_DAYS');
    const payload = {
      username: user.email,
      sub: user.id,
      expiresIn: expiryDays,
    };
    const accessToken = this.jwtService.sign(payload);

    // return login response
    return {
      jwt: {
        accessToken,
        expiryDays,
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
      return this.prismaService.user.create({ data: userCreateDto });
    } catch (error) {
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

  async delete(id: number) {
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
    if (password.indexOf('$2a$') === 0 && password.length === 60) {
      encryptedPassword = password;
    } else {
      encryptedPassword = await bcrypt.hash(password, rounds);
    }
    return encryptedPassword;
  }
}
