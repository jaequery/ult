import { Injectable } from '@nestjs/common';
import { transformer } from '@shared/transformer';
import { initTRPC } from '@trpc/server';
import { createContext } from './trpc.router';

@Injectable()
export class TrpcService {
  trpc;
  constructor() {
    this.trpc = initTRPC.context<typeof createContext>().create({
      transformer,
    });
  }
}
