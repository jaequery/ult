import { Injectable, UseFilters } from '@nestjs/common';
import { CategoryService } from '@server/category/category.service';
import { TrpcExceptionFilter } from '@server/trpc/trpc.exception-handler';
import { TrpcService } from '@server/trpc/trpc.service';
import { Roles } from '@shared/interfaces';
import type { AnyRouter } from '@trpc/server';
import {
  CategoryCreateDto,
  CategoryFindAllDto,
  CategoryFindByIdDto,
  CategoryRemoveDto,
  CategoryUpdateDto,
} from './category.dto';

@Injectable()
@UseFilters(new TrpcExceptionFilter())
export class CategoryRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly categoryService: CategoryService,
  ) {}
  apply(): { categoryRouter: AnyRouter } {
    return {
      categoryRouter: this.trpcService.trpc.router({
        // creates a category from dashboard
        create: this.trpcService
          .protectedProcedure()
          .input(CategoryCreateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.categoryService.create(input);
            }
          }),

        // update category
        update: this.trpcService
          .protectedProcedure()
          .input(CategoryUpdateDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.categoryService.update(input);
            }
          }),

        // remove category
        remove: this.trpcService
          .protectedProcedure([Roles.Admin])
          .input(CategoryRemoveDto)
          .mutation(async ({ input, ctx }) => {
            if (ctx.user) {
              return this.categoryService.remove(input.id);
            }
          }),

        // get category by id
        findById: this.trpcService
          .publicProcedure()
          .input(CategoryFindByIdDto)
          .query(async ({ input }) => {
            return this.categoryService.findById(input.id);
          }),

        // get all categorys
        findAll: this.trpcService
          .publicProcedure()
          .input(CategoryFindAllDto)
          .query(async ({ input }) => {
            return this.categoryService.findAll(input);
          }),
      }),
    };
  }
}
