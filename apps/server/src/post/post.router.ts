import { Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { PostService } from '@server/post/post.service';
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
          .procedure([Roles.Admin])
          .input(PostCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.postService.create(input, ctx.user);
            }
          }),

        // update post
        update: this.trpcService
          .procedure()
          .input(PostUpdateDto)
          .mutation(async ({ input }) => {
            return this.postService.update(input);
          }),

        // remove post
        remove: this.trpcService
          .procedure([Roles.Admin], 'id')
          .input(PostRemoveDto)
          .mutation(async ({ input }) => {
            return this.postService.remove(input.id);
          }),

        // get post by id
        findById: this.trpcService
          .procedure([Roles.Admin], 'id')
          .input(PostFindByIdDto)
          .query(async ({ input }) => {
            return this.postService.findById(input.id);
          }),

        // get all posts
        findAll: this.trpcService
          .procedure([Roles.Admin])
          .input(PostFindAllDto)
          .query(async ({ input }) => {
            return this.postService.findAll(input);
          }),
      }),
    };
  }
}
