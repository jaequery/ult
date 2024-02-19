import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { z } from 'zod';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async test() {
    const users = await this.userRepository.find();
    return users;
  }

  async create(createUserDto: z.infer<typeof CreateUserDto>) {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    console.log('uss', users);
    return users;
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
