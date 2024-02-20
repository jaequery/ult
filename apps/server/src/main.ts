import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  // enable @Transactional()
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
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
