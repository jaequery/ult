import { INestApplication, Injectable } from '@nestjs/common';
import { CategoryRouter } from '@server/category/category.router';
import { PostRouter } from '@server/post/post.router';
import { RoleRouter } from '@server/role/role.router';
import { TrpcService, createContext } from '@server/trpc/trpc.service';
import { UserRouter } from '@server/user/user.router';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userRouter: UserRouter,
    private readonly postRouter: PostRouter,
    private readonly roleRouter: RoleRouter,
    private readonly categoryRouter: CategoryRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    ...this.userRouter.apply(),
    ...this.postRouter.apply(),
    ...this.roleRouter.apply(),
    ...this.categoryRouter.apply(),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
