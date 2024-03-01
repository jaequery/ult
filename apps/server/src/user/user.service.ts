import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@server/auth/auth.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { UserCreateDtoType, UserLoginDtoType } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async login(userLoginDto: UserLoginDtoType) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userLoginDto.email,
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Invalid login');
    }
    // check password
    const verified = await this.authService.verifyPassword(
      user,
      userLoginDto.password,
    );
    if (!verified) {
      throw new UnauthorizedException('Invalid login');
    }
    // retrieve JWT
    const jwt = this.authService.getJwt(user);
    // return login response
    return {
      jwt,
      user,
    };
  }

  async create(userCreateDto: UserCreateDtoType) {
    if (userCreateDto.password) {
      userCreateDto.password = await this.authService.encryptPassword(
        userCreateDto.password,
      );
    }
    userCreateDto.email = userCreateDto.email.toLowerCase();
    let roleConnections: { id: number }[] = [];
    if (userCreateDto.roles && userCreateDto.roles.length > 0) {
      // Retrieve the roles from the database
      const roles = await this.prismaService.role.findMany({
        where: {
          name: { in: userCreateDto.roles }, // Use 'in' operator for filtering by multiple names
        },
      });
      // Prepare role connections for Prisma create operation
      roleConnections = roles.map((role) => ({ id: role.id }));
    }
    try {
      // Exclude roles from userCreateDto to avoid conflicts
      const { ...userData } = userCreateDto;
      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          roles: {
            connect: roleConnections, // Use 'connect' to associate existing roles
          },
        },
      });
      const jwt = this.authService.getJwt(user);
      return { user, jwt };
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
      include: {
        roles: true,
      },
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

  async findByAccessToken(accessToken: string) {
    try {
      // Verify the JWT token and decode its payload
      const decoded = await this.authService.decodeJwtToken(accessToken);
      // Use the decoded.sub as the user's identifier to fetch the user
      const user = await this.findById(decoded.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(
        'Access token is invalid or expired. Please login again.',
      );
    }
  }
}
