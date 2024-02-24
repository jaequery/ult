import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
  ) {}

  async login(userLoginDto: UserLoginDtoType) {
    const user = await this.userRepository.findOne({
      where: {
        email: userLoginDto.email,
      },
    });

    if (!user || user.deleted) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(userCreateDto: UserCreateDtoType) {
    if (userCreateDto.password) {
      userCreateDto.password = await this.encryptPassword(
        userCreateDto.password,
      );
    }
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
