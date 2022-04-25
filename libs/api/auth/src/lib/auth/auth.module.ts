import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiUserModule } from '@nekotoko/api/user';
import { ApiPasswordModule } from '@nekotoko/api/password';

import { TokenService } from './token/token.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_SECRET_KEY, JWT_EXPIRATION } from '../constants';

@Module({
  imports: [
    ApiUserModule,
    ApiPasswordModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET_KEY),
        signOptions: {
          expiresIn: configService.get(JWT_EXPIRATION),
        },
      }),
    }),
  ],
  providers: [TokenService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
