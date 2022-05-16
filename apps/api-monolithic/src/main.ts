import 'reflect-metadata';
import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { RoleGuard } from '@nekotoko/api/roles';

import { AllExceptionFilter } from './app/filters/all-exception.filter';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './app/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const globalPrefix = 'api';
  const httpAdapter = app.get(HttpAdapterHost);
  const reflector = app.get<Reflector>(Reflector);
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalGuards(new RoleGuard(reflector));
  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
