import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from '@server/user/user.service';
import { z } from 'zod';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {}
  apply() {
    return {
      users: this.trpcService.router({
        findAll: this.trpcService.publicProcedure
          .input(z.object({}))
          .query(async ({}) => {
            return this.userService.findAll();
          }),
      }),
    };
  }
}
