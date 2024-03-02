import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { AuthService } from '@server/auth/auth.service';
import { EmailService } from '@server/email/email.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { Roles } from '@shared/interfaces';
import {
  UserCreateDtoType,
  UserLoginDtoType,
  UserSignupDtoType,
} from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  async signup(signupDto: UserSignupDtoType) {
    const payload = {
      ...signupDto,
      roles: [Roles.User],
    } as UserCreateDtoType;
    const jwtUser = await this.create(payload);
    await this.emailService.sendUserWelcome(
      jwtUser.user,
      jwtUser.jwt.accessToken,
    );
    return jwtUser;
  }

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
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: userCreateDto.email,
        deletedAt: null,
      },
    });
    if (existingUser) {
      throw new ConflictException('Email is already taken, please try again.');
    }

    if (userCreateDto.password) {
      userCreateDto.password = await this.authService.encryptPassword(
        userCreateDto.password,
      );
    }
    userCreateDto.email = userCreateDto.email.toLowerCase();
    let roleConnections: { id: number }[] = [];
    if (userCreateDto.roles && userCreateDto.roles.length > 0) {
      const roles = await this.prismaService.role.findMany({
        where: {
          name: { in: userCreateDto.roles },
        },
      });
      roleConnections = roles.map((role) => ({ id: role.id }));
    }
    try {
      const { ...userData } = userCreateDto;
      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          roles: {
            connect: roleConnections,
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
      // verify the JWT token and decode its payload
      const decoded = await this.authService.decodeJwtToken(accessToken);
      // use the decoded.sub as the user's identifier to fetch the user
      const user = await this.findById(decoded.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const jwt = this.authService.getJwt(user);
      return { user, jwt };
    } catch (error) {
      throw new UnauthorizedException(
        'Access token is invalid or expired. Please login again.',
      );
    }
  }

  async verifyAccessToken(accessToken: string) {
    const jwtUser = await this.findByAccessToken(accessToken);
    if (jwtUser) {
      await this.prismaService.user.update({
        where: {
          id: jwtUser.user.id,
        },
        data: {
          verifiedAt: new Date(),
        },
      });
      return jwtUser;
    }
    throw new UnauthorizedException('invalid access token');
  }
}
