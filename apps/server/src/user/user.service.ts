import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserCreateDtoType } from './dto/user.dto';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(user: UserCreateDtoType) {
    if (user.password) {
      user.password = await this.encryptPassword(user.password);
    }
    try {
      return this.userRepository.save(user);
    } catch (error) {
      if (error.constraint === 'user__email__uq') {
        throw new ConflictException(
          'Duplicate email. Please try a different email address.',
        );
      } else {
        throw error;
      }
    }
  }

  async findAll(where?: { email?: string }) {
    const users = await this.userRepository.find({
      where,
    });
    console.log('uss', users);
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
    // tslint:disable-next-line
    if (password.indexOf('$2a$') === 0 && password.length === 60) {
      // assume already a hash, maybe copied from another record
      encryptedPassword = password;
    } else {
      encryptedPassword = await bcrypt.hash(password, rounds);
    }
    return encryptedPassword;
  }
}
