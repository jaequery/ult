import { Injectable, UseFilters } from '@nestjs/common';
import { PostService } from '@server/post/post.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import {
  PostCommentCreateDto,
  PostCommentRemoveDto as PostCommentDeleteDto,
  PostCreateDto,
  PostFindAllDto,
  PostFindByIdDto,
  PostReactionCreateDto,
  PostRemoveDto as PostDeleteDto,
  PostUpdateDto,
} from './post.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class PostRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly postService: PostService,
  ) {}
  apply() {
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

        // delete post
        delete: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(PostDeleteDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.delete(input.id, ctx.user);
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

        // delete post comment
        deleteComment: this.trpcService
          .protectedProcedure()
          .input(PostCommentDeleteDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.deleteComment(input, ctx.user);
            }
          }),
      }),
    };
  }
}
