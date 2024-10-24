import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { PostReactionType } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';
import { PostById, UserById } from '@shared/interfaces';
import {
  PostCommentCreateDtoType,
  PostCommentRemoveDtoType as PostCommentDeleteDtoType,
  PostCreateDtoType,
  PostFindAllDtoType,
  PostReactionCreateDtoType,
  PostUpdateDtoType,
} from './post.dto';

@Injectable()
/**
 * PostService handles CRUD operations for posts.
 *
 * Provides methods for creating, updating, finding, deleting posts.
 * Also includes methods for post reactions, comments, and categories.
 */
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new post.
   *
   * @param postCreateDto - The data for the new post.
   * @param requestUser - The user creating the post.
   * @returns The created post.
   */
  async create(postCreateDto: PostCreateDtoType, requestUser: UserById) {
    const category = await this.prismaService.category.findFirst({
      where: {
        id: postCreateDto.categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (
      category?.adminWriteOnly &&
      !requestUser.roles?.some((r) => r.name === 'Admin')
    ) {
      throw new UnauthorizedException('You cannot write to this category');
    }
    const post = await this.prismaService.post.create({
      data: {
        ...postCreateDto,
        userId: requestUser.id,
      },
    });
    if (postCreateDto.categoryId) {
      await this.prismaService.category.update({
        where: {
          id: postCreateDto.categoryId,
        },
        data: {
          lastPostedAt: new Date(),
        },
      });
    }
    return post;
  }

  /**
   * Updates an existing post.
   *
   * @param postUpdateDto - The data to update the post with.
   * @param requestUser - The user making the update request.
   * @returns The updated post.
   * @throws UnauthorizedException if the user is not allowed to update the post.
   * @throws InternalServerErrorException on unknown errors.
   */
  async update(postUpdateDto: PostUpdateDtoType, requestUser: UserById) {
    const post = await this.findById(postUpdateDto.id);

    const isAdmin = requestUser.roles?.some((r) => r.name === 'Admin');
    const isPostOwner = post.userId === requestUser.id;

    if (!isAdmin && !isPostOwner) {
      throw new UnauthorizedException("You cannot update other users' posts");
    }

    const updatedPost = await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: { ...postUpdateDto },
    });
    return updatedPost;
  }

  /**
   * Finds all posts.
   *
   * @param opts - Options for pagination, filtering, etc.
   * @returns A paginated list of posts.
   */
  async findAll(opts: PostFindAllDtoType) {
    const records = await this.prismaService.post.findMany({
      skip: (opts.page - 1) * opts.perPage,
      take: opts.perPage,
      include: {
        user: true,
        postComments: true,
        category: true,
      },
      where: {
        deletedAt: null,
        categoryId: opts.categoryId ? opts.categoryId : undefined,
        title: opts.search
          ? {
              contains: opts.search,
              mode: 'insensitive',
            }
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await this.prismaService.post.count({
      where: {
        deletedAt: null,
        categoryId: opts.categoryId,
      },
    });
    const lastPage = Math.ceil(total / opts.perPage);
    return {
      records,
      total,
      currentPage: opts.page,
      lastPage,
      perPage: opts.perPage,
    };
  }

  /**
   * Finds a post by ID.
   *
   * @param id - The ID of the post to find.
   * @returns The post with the given ID.
   */
  async findById(id: number): Promise<PostById> {
    await this.prismaService.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    const post = await this.prismaService.post.findFirstOrThrow({
      where: { id, deletedAt: null },
      include: {
        user: {
          include: {
            roles: true,
          },
        },
        category: true,
        postReactions: true,
        postComments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });

    return post;
  }

  /**
   * Removes one or more posts by ID.
   *
   * Accepts a single post ID or an array of post IDs.
   * Checks if the requesting user is allowed to delete the post.
   * Marks the posts as deleted by setting deletedAt.
   *
   * @param id - The ID or IDs of the posts to delete.
   * @param requestUser - The requesting user.
   * @returns The updated posts.
   */
  async delete(id: number | number[], requestUser: UserById) {
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

  /**
   * Creates a reaction on a post for the requesting user.
   *
   * Checks if the user already has a reaction of the given type on the post.
   * If so, deletes the existing reaction.
   * Otherwise, creates a new reaction of the given type.
   *
   * @param createPostReactionDto - The reaction type and post ID
   * @param requestUser - The requesting user
   * @returns The deleted or created reaction
   */
  async createReaction(
    createPostReactionDto: PostReactionCreateDtoType,
    requestUser: UserById,
  ) {
    const existingPost = await this.prismaService.postReaction.findFirst({
      where: {
        userId: requestUser.id,
        postId: createPostReactionDto.postId,
      },
    });
    if (
      existingPost?.type === PostReactionType.like &&
      existingPost.type === createPostReactionDto.type
    ) {
      return this.prismaService.postReaction.delete({
        where: {
          userId: requestUser.id,
          id: existingPost.id,
        },
      });
    } else {
      return this.prismaService.postReaction.create({
        data: {
          ...createPostReactionDto,
          userId: requestUser.id,
        },
      });
    }
  }

  /**
   * Creates a new comment on a post.
   *
   * Checks if the post exists based on the provided post ID.
   * Throws NotFoundException if post does not exist.
   *
   * Creates a new comment with the provided input data and requesting user's ID.
   * @param createPostCommentDto - The comment and post ID
   * @param requestUser - The requesting user
   * @returns The created comment
   */
  async createComment(
    postCommentCreateDto: PostCommentCreateDtoType,
    requestUser: UserById,
  ) {
    const existingPost = await this.prismaService.post.findFirst({
      where: {
        id: postCommentCreateDto.postId,
      },
    });
    if (!existingPost) {
      throw new NotFoundException();
    }
    return this.prismaService.postComment.create({
      data: {
        ...postCommentCreateDto,
        userId: requestUser.id,
      },
    });
  }

  /**
   * Removes a comment from a post.
   *
   * Checks if the post exists, and if not throws NotFoundException.
   * Deletes the post comment with the provided input post ID and comment ID.
   */
  async deleteComment(
    postCommentDeleteDto: PostCommentDeleteDtoType,
    requestUser: UserById,
  ) {
    const existingComment = await this.prismaService.postComment.findFirst({
      where: {
        userId: requestUser.id,
        id: postCommentDeleteDto.id,
      },
    });
    if (!existingComment) {
      throw new NotFoundException();
    }
    return this.prismaService.postComment.delete({
      where: {
        id: existingComment.id,
      },
    });
  }

  // /**
  //  * Gets all post categories and their post counts.
  //  *
  //  * Groups posts by category and returns the category name and count for each.
  //  */
  // async getCategories() {
  //   // First, get the count of posts per category
  //   const categories = await this.prismaService.post.groupBy({
  //     by: ['category'],
  //     _count: {
  //       category: true,
  //     },
  //     where: {
  //       category: {
  //         not: null, // Exclude posts without a category
  //       },
  //     },
  //     orderBy: {
  //       _count: {
  //         category: 'desc',
  //       },
  //     },
  //   });

  //   // Next, get the total count of all posts
  //   const totalPostsCount = await this.prismaService.post.count();

  //   // Now, add the "All" category with the totalPostsCount to the categories array
  //   const categoriesWithAll = [
  //     { category: 'All', _count: { category: totalPostsCount } },
  //     ...categories,
  //   ];

  //   return categoriesWithAll;
  // }
}
