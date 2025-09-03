import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc/trpc.service';
import { UploadService } from './upload.service';
import { z } from 'zod';

@Injectable()
export class UploadRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly uploadService: UploadService,
  ) {}

  apply() {
    const uploadRouter = this.trpcService.trpc.router({
        getPresignedUrl: this.trpcService
          .protectedProcedure()
          .input(
            z.object({
              fileName: z.string(),
              fileType: z.string(),
            }),
          )
          .mutation(async ({ input }) => {
            return await this.uploadService.getPresignedUploadUrl(
              input.fileName,
              input.fileType,
            );
          }),
    });

    return {
      uploadRouter,
    } as const;
  }
}