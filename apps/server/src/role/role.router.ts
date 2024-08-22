import { Injectable, UseFilters } from '@nestjs/common';
import { RoleService } from '@server/role/role.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import {
  RoleCreateDto,
  RoleFindAllDto,
  RoleFindByIdDto,
  RoleRemoveDto,
  RoleUpdateDto,
} from './role.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class RoleRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly roleService: RoleService,
  ) {}
  apply() {
    return {
      roleRouter: this.trpcService.trpc.router({
        // creates a role from dashboard
        create: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(RoleCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.roleService.create(input);
            }
          }),

        // update role
        update: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(RoleUpdateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.roleService.update(input);
            }
          }),

        // remove role
        remove: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(RoleRemoveDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.roleService.remove(input.id);
            }
          }),

        // get role by id
        findById: this.trpcService
          .publicProcedure()
          .input(RoleFindByIdDto)
          .query(async ({ input }) => {
            return this.roleService.findById(input.id);
          }),

        // get all roles
        findAll: this.trpcService
          .publicProcedure()
          .input(RoleFindAllDto)
          .query(async ({ input }) => {
            return this.roleService.findAll(input);
          }),
      }),
    };
  }
}
