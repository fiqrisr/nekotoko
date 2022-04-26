import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiAuthSharedModule } from '@nekotoko/api/auth-shared';
import { ApiUserModule } from '@nekotoko/api/user';
import { ApiPasswordModule } from '@nekotoko/api/password';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_SECRET_KEY, JWT_EXPIRATION } from '../constants';

@Module({
  imports: [
    ApiAuthSharedModule,
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
  providers: [TokenService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
