import { Injectable, UseFilters } from '@nestjs/common';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import { z } from 'zod';
import { UserCreateDto, UserLoginDto, UserRemoveDto } from './dto/user.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply() {
    return {
      userRouter: this.trpcService.trpc.router({
        // login user
        login: this.trpcService.trpc.procedure
          .input(UserLoginDto)
          .mutation(async ({ input }) => {
            return this.userService.login(input);
          }),

        // create user
        create: this.trpcService.trpc.procedure
          .input(UserCreateDto)
          .mutation(async ({ input }) => {
            return this.userService.create(input);
          }),

        // remove user
        remove: this.trpcService.trpc.procedure
          .input(UserRemoveDto)
          .mutation(async ({ input }) => {
            return this.userService.remove(input.id);
          }),

        // get user by id
        findById: this.trpcService.trpc.procedure
          .input(
            z.object({
              id: z.number(),
            }),
          )
          .query(async ({ input }) => {
            return this.userService.findById(input.id);
          }),

        // get all users
        findAll: this.trpcService.trpc.procedure
          .input(
            z.object({
              id: z.number().optional(),
            }),
          )
          .query(async ({}) => {
            return this.userService.findAll();
          }),

        // get user by id
        findByAccessToken: this.trpcService.trpc.procedure
          .input(
            z.object({
              accessToken: z.string(),
            }),
          )
          .query(async ({ input }) => {
            return this.userService.findByAccessToken(input.accessToken);
          }),
      }),
    };
  }
}
