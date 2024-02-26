import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { TrpcExceptionFilter } from './trpc/trpc.exception-handler';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  // initialize Nest app
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // enable TRPC support
  const trpc = app.get(TrpcRouter);
  app.useGlobalFilters(new TrpcExceptionFilter());
  trpc.applyMiddleware(app);

  // start server
  await app.listen(process.env.PORT || 3000);

  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    console.log(
      `apps/server dev: server started: http://localhost:${process.env.PORT || 3000}`,
    );
  } else {
    console.log(`server started: ${await app.getUrl()}`);
  }
}
bootstrap();
