import { Injectable } from '@nestjs/common';
import { UserService } from '@server/user/user.service';
import { transformer } from '@shared/transformer';
import { TRPCError, initTRPC } from '@trpc/server';
import { createContext } from './trpc.router';

@Injectable()
export class TrpcService {
  trpc;
  constructor(private readonly userService: UserService) {
    this.trpc = initTRPC.context<typeof createContext>().create({
      transformer,
    });
  }

  procedure(allowedRoles?: string[], ownerIdentifier?: string) {
    const userService = this.userService;
    const procedure = this.trpc.procedure.use(async function isProtected(opts) {
      if (!allowedRoles || allowedRoles.length === 0) {
        return opts.next();
      }
      // get bearer from headers
      const accessToken =
        opts.ctx.req.headers.authorization?.replace('Bearer ', '') || '';
      if (!accessToken) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // check if user has role privilege
      const jwtUser = await userService.verifyAccessToken(accessToken);
      const hasRole = jwtUser.user.roles.some((r) =>
        allowedRoles.includes(r.name),
      );
      let isOwner = false;

      // if ownerIdentifier is passed, allow the request user who matches that of the ownerIdentifier
      // this allows a procedure that expects eg; an Admin, but also the user who owns that record
      const input = opts.rawInput as any;
      if (ownerIdentifier && input[ownerIdentifier]) {
        isOwner = input[ownerIdentifier] === jwtUser.user.id;
      }

      if (!hasRole && ownerIdentifier && !isOwner) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // return
      return opts.next();
    });
    return procedure;
  }
}
