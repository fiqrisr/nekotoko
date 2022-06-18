import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { ApiMicroservicesCategoryModule } from '@nekotoko/api/microservices/category';
import { ApiMicroservicesCompositionModule } from '@nekotoko/api/microservices/composition';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    ApiMicroservicesCategoryModule,
    ApiMicroservicesCompositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
