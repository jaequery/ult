import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * TODO: Can't get this to work, see https://github.com/jaequery/Ultima/issues/1
 */
@Catch()
export class TrpcExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('hello error');
    super.catch(exception, host);
  }
}
