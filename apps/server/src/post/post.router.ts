import { Injectable, UseFilters } from '@nestjs/common';
import { PostService } from '@server/post/post.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import { Router } from '@trpc/server';
import {
  PostCommentCreateDto,
  PostCommentRemoveDto,
  PostCreateDto,
  PostFindAllDto,
  PostFindByIdDto,
  PostReactionCreateDto,
  PostRemoveDto,
  PostUpdateDto,
} from './post.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class PostRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly postService: PostService,
  ) {}
  apply(): { postRouter: Router<any> } {
    return {
      postRouter: this.trpcService.trpc.router({
        // creates a post from dashboard
        create: this.trpcService
          .protectedProcedure()
          .input(PostCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.create(input, ctx.user);
            }
          }),

        // update post
        update: this.trpcService
          .protectedProcedure()
          .input(PostUpdateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.update(input, ctx.user);
            }
          }),

        // remove post
        remove: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(PostRemoveDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.remove(input.id, ctx.user);
            }
          }),

        // get post by id
        findById: this.trpcService
          .publicProcedure()
          .input(PostFindByIdDto)
          .query(async ({ input }) => {
            return this.postService.findById(input.id);
          }),

        // get all posts
        findAll: this.trpcService
          .publicProcedure()
          .input(PostFindAllDto)
          .query(async ({ input }) => {
            return this.postService.findAll(input);
          }),

        // add post reaction
        createReaction: this.trpcService
          .protectedProcedure()
          .input(PostReactionCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.createReaction(input, ctx.user);
            }
          }),

        // add post comment
        createComment: this.trpcService
          .protectedProcedure()
          .input(PostCommentCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.createComment(input, ctx.user);
            }
          }),

        // add post comment
        removeComment: this.trpcService
          .protectedProcedure()
          .input(PostCommentRemoveDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.removeComment(input, ctx.user);
            }
          }),

        // add post comment
        getCategories: this.trpcService.protectedProcedure().query(async () => {
          return this.postService.getCategories();
        }),
      }),
    };
  }
}
