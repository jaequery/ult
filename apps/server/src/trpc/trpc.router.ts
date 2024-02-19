import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from '@server/user/user.service';
import { UserRouter } from '@server/user/user.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userRouter: UserRouter,
  ) {
    const ho = this.userRouter.apply();
    console.log('ho', ho);
  }

  appRouter = this.trpcService.router({
    ...this.userRouter.apply(),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
