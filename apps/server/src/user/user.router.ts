import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import { z } from 'zod';
import { CreateUserDto, UserFindAllDto } from './dto/user.dto';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply() {
    return {
      userRouter: this.trpcService.router({
        create: this.trpcService.publicProcedure
          .input(CreateUserDto)
          .mutation(async ({ input }) => {
            console.log('input', input);
            return this.userService.create(input);
          }),
        findOne: this.trpcService.publicProcedure
          .input(
            z.object({
              id: z.number(),
            }),
          )
          .query(async ({ input }) => {
            console.log('input', input);
            return this.userService.findOne(input.id);
          }),
        findAll: this.trpcService.publicProcedure
          .input(UserFindAllDto)
          .query(async ({ input }) => {
            return this.userService.findAll(input);
          }),
      }),
    };
  }
}
