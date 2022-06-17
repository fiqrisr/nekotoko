import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { RoleGuard } from '@nekotoko/api/roles';
import { TransformInterceptor, AllExceptionFilter } from '@nekotoko/api/utils';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
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
  const port = process.env.APP_PORT || 9001;

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
