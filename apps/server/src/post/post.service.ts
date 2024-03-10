import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PrismaService } from '@server/prisma/prisma.service';
import { UserById } from '@shared/interfaces';
import {
  PostCreateDtoType,
  PostFindAllDtoType,
  PostUpdateDtoType,
} from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(postCreateDto: PostCreateDtoType, requestUser: UserById) {
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

  async update(postUpdateDto: PostUpdateDtoType, requestUser: UserById) {
    const post = await this.findById(postUpdateDto.id);
    if (
      !requestUser.roles?.some((r) => r.name === 'Admin') &&
      post.userId !== requestUser.id
    ) {
      throw new UnauthorizedException('You cannot update other users post');
    }
    try {
      const updatedPost = await this.prismaService.post.update({
        where: {
          id: post.id,
        },
        data: { ...postUpdateDto },
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
      where: {
        deletedAt: null,
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
    return this.prismaService.post.findFirstOrThrow({
      where: { id, deletedAt: null },
      include: {
        user: {
          include: {
            roles: true,
          },
        },
      },
    });
  }

  async remove(id: number | number[], requestUser: UserById) {
    let ids: number[] = [];
    if (id instanceof Array) {
      ids = id;
    } else if (typeof id === 'number') {
      ids = [id];
    }
    const output = [];
    for (const id of ids) {
      const post = await this.findById(id);
      if (
        !requestUser.roles?.some((r) => r.name === 'Admin') &&
        post?.userId !== requestUser.id
      ) {
        throw new UnauthorizedException('You cannot update other users post');
      }
      output.push(
        await this.prismaService.post.update({
          where: {
            id,
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
    }
    return output;
  }
}
