import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from '@server/user/user.service';
import { UserById } from '@shared/interfaces';
import { transformer } from '@shared/transformer';
import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export interface TrpcContext extends CreateExpressContextOptions {
  user?: UserById;
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

  // these routes are publicly accessible to everyone
  publicProcedure() {
    return this.trpc.procedure;
  }

  // these routes requires authentication:
  // if allowedRoles is empty, it requires an authenticated user (access token in the header)
  // if allowedRoles is not empty, it requires an authenticated user with one of the allowed roles
  protectedProcedure(allowedRoles?: string[]) {
    const procedure = this.trpc.procedure.use(async (opts) => {
      // get bearer from headers
      const userJwt = await this.getJwtUserFromHeader(opts.ctx);
      // throw error if user is unauthorized
      if (
        !userJwt ||
        (allowedRoles?.length &&
          !userJwt.user.roles?.some((role) => allowedRoles.includes(role.name)))
      ) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      // user is authorized
      return opts.next({
        ctx: {
          ...opts.ctx,
          user: userJwt.user,
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
