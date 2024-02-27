import { Inject, Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { createContext } from './trpc.router';

@Injectable()
export class TrpcService {
  trpc;
  constructor(
    @Inject('package:superjson')
    private readonly superjson: typeof import('superjson').SuperJSON,
  ) {
    this.trpc = initTRPC.context<typeof createContext>().create({
      transformer: this.superjson,
    });
  }
}
