import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import { z } from 'zod';
import { UserCreateDto, UserFindAllDto, UserRemoveDto } from './dto/user.dto';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply() {
    return {
      userRouter: this.trpcService.router({
        // create user
        create: this.trpcService.publicProcedure
          .input(UserCreateDto)
          .mutation(async ({ input }) => {
            return this.userService.create(input);
          }),

        // remove user
        remove: this.trpcService.publicProcedure
          .input(UserRemoveDto)
          .mutation(async ({ input }) => {
            return this.userService.remove(input.id);
          }),

        // get user by id
        findById: this.trpcService.publicProcedure
          .input(
            z.object({
              id: z.number(),
            }),
          )
          .query(async ({ input }) => {
            return this.userService.findById(input.id);
          }),

        // get all users
        findAll: this.trpcService.publicProcedure
          .input(UserFindAllDto)
          .query(async ({ input }) => {
            return this.userService.findAll(input);
          }),
      }),
    };
  }
}
