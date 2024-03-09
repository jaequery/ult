import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UserService } from '@server/user/user.service';
import { transformer } from '@shared/transformer';
import { TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import * as trpcExpress from '@trpc/server/adapters/express';

export interface TrpcContext extends CreateExpressContextOptions {
  user?: User;
}

export const createContext = async (
  opts: trpcExpress.CreateExpressContextOptions,
) => {
  return {
    req: opts.req,
    res: opts.res,
  };
};

@Injectable()
export class TrpcService {
  trpc;
  constructor(private readonly userService: UserService) {
    this.trpc = initTRPC.context<TrpcContext>().create({
      transformer,
    });
  }

  // provides access control via user roles
  // example 1; a route that is accessible to the public
  //   signup: this.trpcService
  //     .procedure()
  //     .input(UserSignupDto)
  //     .mutation(async ({ input }) => {
  //       return this.userService.signup(input);
  //     }),
  // example 2; a route that is only accessible by the Admin
  //   remove: this.trpcService
  //     .procedure([Roles.Admin])
  //     .input(UserRemoveDto)
  //     .mutation(async ({ input }) => {
  //       return this.userService.remove(input);
  //     }),
  // example 3; a route where its only accessible by the Admin role
  // as well as the user accessing their own profile through
  // the ownerIdentifier (the input field that is the request user's id)
  //   update: this.trpcService
  //     .procedure([Roles.Admin], 'id')
  //     .input(UserUpdateDto)
  //     .mutation(async ({ input }) => {
  //       return this.userService.update(input);
  //     }),

  protectedProcedure(allowedRoles?: string[], ownerIdentifier?: string) {
    const procedure = this.trpc.procedure.use(async (opts) => {
      const input = opts.rawInput as any;
      if (!allowedRoles || allowedRoles.length === 0) {
        return opts.next();
      }
      // get bearer from headers
      const jwtUser = await this.getJwtUserFromHeader(opts.ctx);

      // check if user has role privilege
      const hasRole = jwtUser.user.roles.some((r: Role) =>
        allowedRoles.includes(r.name),
      );

      // if ownerIdentifier is passed, allow the request user who matches that of the ownerIdentifier
      // this allows a procedure that expects eg; an Admin, but also the user who owns that record
      let isOwner = false;
      if (ownerIdentifier && input[ownerIdentifier]) {
        isOwner = input[ownerIdentifier] === jwtUser.user.id;
      }

      if (!hasRole && !isOwner) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // return
      return opts.next({
        ctx: {
          ...opts.ctx,
          user: jwtUser.user,
        },
      });
    });
    return procedure;
  }

  async getJwtUserFromHeader(ctx: TrpcContext) {
    // get bearer from headers
    const accessToken =
      ctx.req.headers.authorization?.replace('Bearer ', '') || '';
    if (!accessToken) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // check if user has role privilege
    return this.userService.verifyAccessToken(accessToken);
  }
}
