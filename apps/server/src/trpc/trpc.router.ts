import { INestApplication, Injectable } from '@nestjs/common';
import { PostRouter } from '@server/post/post.router';
import { TrpcService, createContext } from '@server/trpc/trpc.service';
import { UserRouter } from '@server/user/user.router';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userRouter: UserRouter,
    private readonly postRouter: PostRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    ...this.userRouter.apply(),
    ...this.postRouter.apply(),
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
