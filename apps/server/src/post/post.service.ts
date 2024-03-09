import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

import { PrismaService } from '@server/prisma/prisma.service';
import {
  PostCreateDtoType,
  PostFindAllDtoType,
  PostUpdateDtoType,
} from './post.dto';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(postCreateDto: PostCreateDtoType, requestUser: User) {
    // create
    try {
      const post = await this.prismaService.post.create({
        data: {
          ...postCreateDto,
          userId: requestUser.id,
        },
      });
      return post;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(postUpdateDto: PostUpdateDtoType, requestUser: User) {
    const post = await this.prismaService.post.findFirstOrThrow({
      where: {
        id: postUpdateDto.id,
        deletedAt: null,
      },
    });
    try {
      const updatedPost = await this.prismaService.post.update({
        where: {
          id: post.id,
        },
        data: { ...postUpdateDto, userId: requestUser.id },
      });
      return updatedPost;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(opts: PostFindAllDtoType) {
    const records = await this.prismaService.post.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await this.prismaService.post.count();
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
    return this.prismaService.post.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async remove(id: number) {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
