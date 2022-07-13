import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';

import { RabbitMQModule } from '@nekotoko/rabbitmq';
import { ApiMicroservicesCategoryModule } from '@nekotoko/api/microservices/category';
import { ApiMicroservicesCompositionModule } from '@nekotoko/api/microservices/composition';
import { ApiMicroservicesProductModule } from '@nekotoko/api/microservices/product';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        SUPABASE_URL: Joi.string().required(),
        SUPABASE_KEY: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PRODUCT_QUEUE: Joi.string().required(),
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
    RabbitMQModule,
    ApiMicroservicesCategoryModule,
    ApiMicroservicesCompositionModule,
    ApiMicroservicesProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
