import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { AuthService } from '@server/auth/auth.service';
import _ from 'lodash';
import { AvatarGenerator } from 'random-avatar-generator';

import { EmailService } from '@server/email/email.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { Roles } from '@shared/interfaces';
import generator from 'generate-password-ts';
import {
  UserCreateDtoType,
  UserFindAllDtoType,
  UserLoginDtoType,
  UserResetPasswordType,
  UserSignupDtoType,
  UserUpdateDtoType,
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

    if (userCreateDto.firstName) {
      userCreateDto.firstName = _.capitalize(userCreateDto.firstName);
    }

    if (userCreateDto.lastName) {
      userCreateDto.lastName = _.capitalize(userCreateDto.lastName);
    }

    if (userCreateDto.password) {
      userCreateDto.password = await this.authService.encryptPassword(
        userCreateDto.password,
      );
    }
    userCreateDto.email = userCreateDto.email.toLowerCase();

    // if roles was passed, assign them appropriately
    let roleConnections: { id: number }[] = [];
    if (userCreateDto.roles && userCreateDto.roles.length > 0) {
      const roles = await this.prismaService.role.findMany({
        where: {
          name: { in: userCreateDto.roles },
        },
      });
      roleConnections = roles.map((role) => ({ id: role.id }));
    } else {
      // otherwise, assign a default User role
      const role = await this.prismaService.role.findFirst({
        where: {
          name: 'User',
        },
      });
      if (role) {
        roleConnections = [{ id: role.id }];
      }
    }

    // assign a random profile avatar picture if profile pic is not provided
    const generator = new AvatarGenerator();
    if (!userCreateDto.profilePicUrl) {
      userCreateDto.profilePicUrl = await generator.generateRandomAvatar(
        userCreateDto.firstName,
      );
    }

    // create
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

  async update(userUpdateDto: UserUpdateDtoType) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        id: userUpdateDto.id,
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
    // normalize form values appropriately
    if (userUpdateDto.firstName) {
      userUpdateDto.firstName = _.capitalize(userUpdateDto.firstName);
    }
    if (userUpdateDto.lastName) {
      userUpdateDto.lastName = _.capitalize(userUpdateDto.lastName);
    }
    if (userUpdateDto.password) {
      userUpdateDto.password = await this.authService.encryptPassword(
        userUpdateDto.password,
      );
    }
    if (userUpdateDto.email) {
      userUpdateDto.email = userUpdateDto.email.toLowerCase();
    }
    // assign roles appropriately (TODO: simplify this mess)
    let roleConnections: { id: number }[] = [];
    let roleDisconnections: { id: number }[] = [];
    if (userUpdateDto.roles && userUpdateDto.roles.length > 0) {
      const allRoles = await this.prismaService.role.findMany();
      const rolesToConnect = userUpdateDto.roles.filter(
        (roleName) => !user.roles.some((role) => role.name === roleName),
      );
      roleConnections = allRoles
        .filter((role) => rolesToConnect.includes(role.name as Roles))
        .map((role) => ({ id: role.id }));
      const rolesToDisconnect = user.roles
        .filter(
          (role) => !(userUpdateDto.roles || []).includes(role.name as Roles),
        )
        .map((role) => ({ id: role.id }));
      roleDisconnections = allRoles
        .filter((role) => rolesToDisconnect.map((r) => r.id).includes(role.id))
        .map((role) => ({ id: role.id }));
      const roles = await this.prismaService.role.findMany({
        where: {
          name: { in: userUpdateDto.roles },
        },
      });
      roleConnections = roles.map((role) => ({ id: role.id }));
    }
    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: userUpdateDto.id,
        },
        data: {
          ...userUpdateDto,
          roles: {
            connect: roleConnections,
            disconnect: roleDisconnections,
          },
        },
      });
      return updatedUser;
    } catch (error: any) {
      if (error.constraint === 'user__email__uq') {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll(opts: UserFindAllDtoType) {
    const records = await this.prismaService.user.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      include: {
        roles: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await this.prismaService.user.count();
    const lastPage = Math.ceil(total / opts.perPage);
    return {
      records,
      total,
      currentPage: opts.page,
      lastPage,
      perPage: opts.perPage,
    };
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

  async resetPassword(resetPasswordDto: UserResetPasswordType) {
    // if email matches, set a random password
    const user = await this.prismaService.user.findUnique({
      where: {
        email: resetPasswordDto.email,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // generate random password
    const randomPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    // update user with random password
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await this.authService.encryptPassword(randomPassword),
      },
    });

    // send email with random password
    await this.emailService.sendResetPassword(user, randomPassword);
    console.log('Password reset for', user.email, 'to', randomPassword);

    return 'hello';
  }
}
