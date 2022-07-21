import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';

import { RabbitMQModule } from '@nekotoko/rabbitmq';
import { ApiMicroservicesOrderModule } from '@nekotoko/api/microservices/order';
import { JwtAuthGuardMicroservices } from '@nekotoko/api/auth-shared';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ORDER_QUEUE: Joi.string().required(),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'development'
          ? {
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  levelFirst: true,
                },
              },
            }
          : {},
    }),
    RabbitMQModule.register({ name: 'AUTH' }),
    ApiMicroservicesOrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuardMicroservices,
    },
  ],
})
export class AppModule {}
