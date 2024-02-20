import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserCreateDtoType } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: UserCreateDtoType) {
    const user = await this.userRepository.save(dto);
    return user;
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
}
