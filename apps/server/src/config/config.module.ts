import { Module } from '@nestjs/common';

export interface ConfigModuleOptions {
  environment: string;
}

@Module({})
export class ConfigModule {}
