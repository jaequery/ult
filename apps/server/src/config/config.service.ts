import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceInternal } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: ConfigServiceInternal) {}

  get<T = string>(key: string) {
    return this.configService.get<T>(key);
  }
}
