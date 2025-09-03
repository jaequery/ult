import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadRouter } from './upload.router';

@Module({
  providers: [UploadService, UploadRouter],
  exports: [UploadService, UploadRouter],
})
export class UploadModule {}