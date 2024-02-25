import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@server/user/user.service';
import { initTRPC } from '@trpc/server';
import { createContext } from './trpc.router';

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<typeof createContext>().create();
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
  publicProcedure = this.trpc.procedure;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getProtectedProcedure() {
    return this.trpc.procedure.use(async ({ ctx, next }) => {
      let user;
      const accessToken = ctx.req?.headers?.authorization?.split(' ')[1];
      if (accessToken) {
        const decoded = await this.jwtService.verify(accessToken); // Use JwtService to verify and decode the token
        const userId = decoded.sub; // Adjust based on your token payload structure
        user = await this.userService.findById(userId);
      }
      return next({
        ctx: {
          ...ctx,
          user, // Include the user in the context
        },
      });
    });
  }
}
