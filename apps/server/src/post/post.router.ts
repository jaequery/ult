import { Injectable, UseFilters } from '@nestjs/common';
import { PostService } from '@server/post/post.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import {
  PostCreateDto,
  PostFindAllDto,
  PostFindByIdDto,
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
  apply() {
    return {
      postRouter: this.trpcService.trpc.router({
        // creates a post from dashboard
        create: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(PostCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.create(input, ctx.user);
            }
          }),

        // update post
        update: this.trpcService
          .protectedProcedure([Roles.Admin], 'userId')
          .input(PostUpdateDto)
          .mutation(async ({ input, ctx }) => {
            console.log('ctx', ctx);
            if (ctx.user) {
              console.log('am i here');
              return this.postService.update(input, ctx.user);
            }
            console.log('or here');
          }),

        // remove post
        remove: this.trpcService
          .protectedProcedure([Roles.Admin], 'userId')
          .input(PostRemoveDto)
          .mutation(async ({ input }) => {
            return this.postService.remove(input.id);
          }),

        // get post by id
        findById: this.trpcService
          .protectedProcedure([Roles.Admin], 'id')
          .input(PostFindByIdDto)
          .query(async ({ input }) => {
            return this.postService.findById(input.id);
          }),

        // get all posts
        findAll: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(PostFindAllDto)
          .query(async ({ input }) => {
            return this.postService.findAll(input);
          }),
      }),
    };
  }
}
