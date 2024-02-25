import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { UserCreateDtoType, UserLoginDtoType } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDtoType) {
    const authUser = await this.userRepository.findOne({
      select: ['id', 'password', 'deleted'],
      where: {
        email: userLoginDto.email.toLowerCase(),
      },
    });
    if (!authUser || authUser.deleted) {
      throw new NotFoundException('Invalid email address');
    }

    // check password
    const isMatch = await bcrypt.compare(
      userLoginDto.password,
      authUser.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid login information');
    }

    // retrieve JWT
    const payload = { username: authUser.email, sub: authUser.id };
    const jwt = { accessToken: this.jwtService.sign(payload) };

    // return user
    const user = await this.findById(authUser.id);
    return {
      jwt,
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
      return this.userRepository.save(userCreateDto);
    } catch (error) {
      if (error.constraint === 'user__email__uq') {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll(where?: { email?: string }) {
    const users = await this.userRepository.find({
      where,
    });
    return users;
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
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
