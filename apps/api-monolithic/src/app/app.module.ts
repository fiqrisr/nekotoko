import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';

import { ApiAuthModule } from '@nekotoko/api/auth';
import { JwtAuthGuard } from '@nekotoko/api/auth-shared';
import { ApiMonolithicUsersModule } from '@nekotoko/api/monolithic/users';
import { ApiMonolithicCategoryModule } from '@nekotoko/api/monolithic/category';
import { ApiMonolithicCompositionModule } from '@nekotoko/api/monolithic/composition';
import { ApiMonolithicProductModule } from '@nekotoko/api/monolithic/product';
import { ApiMonolithicOrderModule } from '@nekotoko/api/monolithic/order';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        SUPABASE_URL: Joi.string().required(),
        SUPABASE_KEY: Joi.string().required(),
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
    ApiMonolithicUsersModule,
    ApiAuthModule,
    ApiMonolithicCategoryModule,
    ApiMonolithicCompositionModule,
    ApiMonolithicProductModule,
    ApiMonolithicOrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
