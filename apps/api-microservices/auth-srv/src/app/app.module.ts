import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { ApiAuthModule } from '@nekotoko/api/auth';
import { JwtAuthGuard } from '@nekotoko/api/auth-shared';
import { ApiMicroservicesUsersModule } from '@nekotoko/api/microservices/users';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'development'
          ? {
              prettyPrint: {
                colorize: true,
                levelFirst: true,
              },
            }
          : {},
    }),
    ApiMicroservicesUsersModule,
    ApiAuthModule,
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
