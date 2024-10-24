import { Injectable, UseFilters } from '@nestjs/common';
import { MagazineService } from '@server/magazine/magazine.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import { z } from 'zod';
import {
  MagazineCreateDto,
  MagazineFindAllDto,
  MagazineFindByIdDto,
  MagazineRemoveDto,
  MagazineUpdateDto,
} from './magazine.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class MagazineRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly magazineService: MagazineService,
  ) {}
  apply() {
    return {
      magazineRouter: this.trpcService.trpc.router({
        // creates a magazine from dashboard
        create: this.trpcService
          .protectedProcedure()
          .input(MagazineCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.magazineService.create(input);
            }
          }),

        // update magazine
        update: this.trpcService
          .protectedProcedure()
          .input(MagazineUpdateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.magazineService.update(input);
            }
          }),

        // remove magazine
        remove: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(MagazineRemoveDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.magazineService.remove(input.id);
            }
          }),

        // get magazine by id
        findById: this.trpcService
          .publicProcedure()
          .input(MagazineFindByIdDto)
          .query(async ({ input }) => {
            return this.magazineService.findById(input.id);
          }),

        // get all magazines
        findAll: this.trpcService
          .publicProcedure()
          .input(MagazineFindAllDto)
          .query(async ({ input }) => {
            return this.magazineService.findAll(input);
          }),

        // source pdf
        sourcePdf: this.trpcService
          .protectedProcedure()
          .input(z.object({ magazineId: z.number() }))
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.magazineService.sourcePdf(input.magazineId);
            }
          }),
      }),
    };
  }
}
