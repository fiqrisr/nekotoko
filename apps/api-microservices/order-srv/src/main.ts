import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { RabbitMQService } from '@nekotoko/rabbitmq';
import { RoleGuard } from '@nekotoko/api/roles';
import { TransformInterceptor, AllExceptionFilter } from '@nekotoko/api/utils';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const rmqService = app.get<RabbitMQService>(RabbitMQService);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  const httpAdapter = app.get(HttpAdapterHost);
  const reflector = app.get<Reflector>(Reflector);

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalGuards(new RoleGuard(reflector));
  app.connectMicroservice(rmqService.getOptions('ORDER'));

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));
}

bootstrap();
